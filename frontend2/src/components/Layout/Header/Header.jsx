import React, {useState} from 'react';
import User from '../../User/User'
import LogoIcon from '../../../assets/images/header/logo.png'
import "./Header.scss"
import {Link} from "react-router-dom";
import BasketIcon from "../../BasketBtn/BasketIcon";

const Header = () => {

    return (
        <header className="header">
            <div className="header__container">
                <Link className="header__container_link" to="/">
                    <img className="header__container_link_logo" src={LogoIcon} alt="logo"/>
                </Link>
                <div className="header__container_icons">
                    <BasketIcon/>
                    <User/>
                </div>
            </div>
        </header>
    );
};

export default Header;
