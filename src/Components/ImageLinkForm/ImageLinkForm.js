import classes from "./ImageLinkForm.module.css";

export default function ImageLinkForm({onInputChange, onButtonSubmit}){
    return(
        <div className={classes.container}>
            <p className={classes.text}>
                {'Drop a url to an image and FaceRec will detect faces'}
            </p>
            <div className={classes.formcontainer}>
                <input className={classes.input} type = "text" onChange={onInputChange} />
                <button className={classes.btn} onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}