import classes from "./Logo.module.css";
import Tilt from 'react-parallax-tilt';
import face from "../../images/happy.png";

export default function Logo(){
    return(
        <div className={classes.logoArea}>
        <Tilt className={classes.tilt}>
            <div className ={classes.innerTilt}>
                <img className={classes.face}src={face} alt = ""/>
            </div>
        </Tilt>
        </div>
    )
}