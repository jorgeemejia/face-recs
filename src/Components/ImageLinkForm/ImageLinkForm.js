import classes from "./ImageLinkForm.module.css";

export default function ImageLinkForm({onInputChange, onButtonSubmit, onClearClick}){

    return(
        <div className={classes.container}>
            <p className={classes.text}>
                {'Drop a url to an image and face-recs will detect faces within the image'}
            </p>
            <div className={classes.formcontainer}>
                <input id="input-field" className={classes.input} type = "text" onChange={onInputChange} />
                <button className={classes.btn} onClick={onButtonSubmit}>Detect</button>
                <button className={classes.btn} onClick={onClearClick}>Clear</button>
            </div>
        </div>
    );
}