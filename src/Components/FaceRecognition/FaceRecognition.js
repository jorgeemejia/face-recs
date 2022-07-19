import classes from "./FaceRecognition.module.css";


export default function FaceRecognition({imageUrl, box}){
    return(
        <div>
            <img id='inputimage' className={classes.image} src={imageUrl} />
            <div className={classes.bounding_box} style={{top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        </div>
    );
}