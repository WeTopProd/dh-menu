import React from 'react';
import './RegisterActive.scss'
import Vector from '../../assets/images/Login/Vector.png'
import {Link} from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
const RegisterActive = ({desc}) => {
    return (
        <div  className="loginActiveBanner">
            <ScrollToTop />
            <Link className="loginActive" to={"/"}>
                <img src={Vector} alt="icon"/>
                <p>{desc}</p>
            </Link>
        </div>

    );
};

export default RegisterActive;
