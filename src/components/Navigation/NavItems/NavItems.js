import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = (props) => {
    
    return (
        <ul className={classes.NavItems}>
            <NavItem link='/' exact>Burger Builder</NavItem>
            {props.isAuthenticated ? <NavItem link='/orders'>Orders</NavItem> : null}
            {props.isAuthenticated 
            ? 
            <NavItem link='/logout'>Logout</NavItem>
            : 
            <NavItem link='/auth'>Login</NavItem>}
        </ul>
    )
}

export default NavItems;