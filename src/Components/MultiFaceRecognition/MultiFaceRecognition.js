import classes from "./MultiFaceRecognition.module.css";


export default function MultiFaceRecognition({imageUrl, boxes}){
    return(
        <div className={classes.container}>
            <div className={classes.inner_container}>
                <img id='inputimage' className={classes.image} src={imageUrl} />
                {boxes.map((box,index)=> (
                    <div key={index}
                        className={classes.bounding_box}
                        style={{top: box.topRow, 
                                right:box.rightCol, 
                                bottom: box.bottomRow,
                                left: box.leftCol}}>
                    </div>
                ))}
            </div>
        </div>
    );
}