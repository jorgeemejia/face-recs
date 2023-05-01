
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import React, { Component } from 'react';
import MultiFaceRecognition from './Components/MultiFaceRecognition/MultiFaceRecognition';
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";


//////////////////////////////////////////////////////////////////////////
// Creating the initial state of the application
// Most values are empty as the user and their info is not initially known 
// The first page upon arrival is the signin page
//////////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////
// Creating the initial state of the application
// Most values are empty as the user and their info is not initially known 
// The first page upon arrival is the signin page
//////////////////////////////////////////////////////////////////////////
class App extends Component {


  //////////////////////////////////////////////////////////////////////////
  // Assigns the inital state to the state of the component
  //////////////////////////////////////////////////////////////////////////
  constructor(){
    super();
    this.state = initialState;
  }
  
  //////////////////////////////////////////////////////////////////////////
  // This function helps assign the user's details to the state variables of
  // the component
  //////////////////////////////////////////////////////////////////////////
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }})
    }

  //////////////////////////////////////////////////////////////////////////
  // This function helps calculate the exact location of faces in the 
  // submitted image
  //////////////////////////////////////////////////////////////////////////
  calculateFaceLocation = (data) => {
    const clarifaiFaces = [];
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    for (const item of data.outputs[0].data.regions) {
      clarifaiFaces.push({leftCol: item.region_info.bounding_box.left_col * width,
                         topRow: item.region_info.bounding_box.top_row * height,
                         rightCol: width - (item.region_info.bounding_box.right_col * width),
                         bottomRow: height - (item.region_info.bounding_box.bottom_row * height)
                         })
    }
    return {
      clarifaiFaces
    }
  }

  //////////////////////////////////////////////////////////////////////////
  // This function helps display the borders around each face
  // More specifically, the coordinates of each face are saved to a state
  //////////////////////////////////////////////////////////////////////////
  displayFaceBox = (box) => {

    this.setState({box:box.clarifaiFaces[1]});
    this.setState({boxes:box.clarifaiFaces})

  }

  //////////////////////////////////////////////////////////////////////////
  // This function helps display the changes within the sections of the forms
  //////////////////////////////////////////////////////////////////////////
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  //////////////////////////////////////////////////////////////////////////
  // This function (1) sends the user submitted image to the face-recs api
  // (2) With the help of Clarafai's api, the face-recs api responds with 
  // the coordinates of the faces found within the user submitted image
  //////////////////////////////////////////////////////////////////////////
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
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  //////////////////////////////////////////////////////////////////////////
  // This function helps controlling the routes of the application
  // It is important to note that there aren't actually different routes
  // This is essentially a single page app with different components rendered
  // at different times
  //////////////////////////////////////////////////////////////////////////
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onClearClick = (event) => {
    this.setState({input: "", imageUrl: ""});
    document.getElementById("input-field").value = "";
    // console.log('clear was clicked')

  };

  //////////////////////////////////////////////////////////////////////////
  // Renders the actual site
  //////////////////////////////////////////////////////////////////////////
  render() {
    const { isSignedIn, imageUrl, route, boxes} = this.state;
    return (
      <div className="App">
        <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === "home"
          ? (
            <div> 
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} 
                             onButtonSubmit={this.onButtonSubmit}
                             onClearClick={this.onClearClick}/>
              <MultiFaceRecognition boxes={boxes} imageUrl={imageUrl}/>
            </div>
            )
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