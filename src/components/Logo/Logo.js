import React from 'react';
import classes from './Logo.css';
import logo from '../../assets/images/logo.png'

const Logo = (props) => {

    return (
        <div className={classes.Logo}>
            <img src={logo} alt="My Burger"/>
        </div>
    )
}

export default Logo
