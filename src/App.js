
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import React, { Component, useImperativeHandle } from 'react';
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import MultiFaceRecognition from './Components/MultiFaceRecognition/MultiFaceRecognition';
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";


// okay so i'm returning an array of objects, i should just set boxes to that array



const initialState = 
  {
    input: '',
    imageUrl: '',
    box: {},
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''     
    }
  }



class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }
  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }})
    }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //https://media-cldnry.s-nbcnews.com/image/upload/t_focal-760x428,f_auto,q_auto:best/MSNBC/Components/Video/201811/fasting.jpg
    const clarifaiFaces = [];
    console.log("data.output:", data.outputs)
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    for (const item of data.outputs[0].data.regions) {
      clarifaiFaces.push({leftCol: item.region_info.bounding_box.left_col * width,
                         topRow: item.region_info.bounding_box.top_row * height,
                         rightCol: width - (item.region_info.bounding_box.right_col * width),
                         bottomRow: height - (item.region_info.bounding_box.bottom_row * height)
                         })
    }
    console.log("clarafaiFaces in calculatefacelocation", clarifaiFaces)
    console.log("clarafaices[0].topRow", clarifaiFaces[0].topRow)
    return {
      // leftCol: clarifaiFace.left_col * width,
      // topRow: clarifaiFace.top_row * height,
      // rightCol: width - (clarifaiFace.right_col * width),
      // bottomRow: height - (clarifaiFace.bottom_row * height)
      clarifaiFaces
    }
  }

  //current thoughts, either try just returning clarafai faces and treat that 
  //as the actual output so boxes: boxes
  //or try some more small debugging



  displayFaceBox = (box) => {

    console.log("box", box)
    console.log("box.clarafaiFaces", box.clarifaiFaces)
    console.log("box.clarafai[0]", box.clarifaiFaces[0])
    console.log("toprow", box.clarifaiFaces[0].topRow)
    this.setState({box:box.clarifaiFaces[1]});
    this.setState({boxes:box.clarifaiFaces})

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://thawing-chamber-69828.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://thawing-chamber-69828.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
        //im thinking you maybe add a for loop or something to display each face
        //this 
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, boxes} = this.state;
    return (
      <div className="App">
        <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === "home"
          ? <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
            {/* This puts the actual box around where box is */}
            {/* Something like, for each box, display a box */}
            {/* {boxes.map((boxy, index) => (
        <FaceRecognition key={index} imageUrl={imageUrl} box={boxy} />
      ))} */}
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            <MultiFaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;