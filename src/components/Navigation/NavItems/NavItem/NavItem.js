import React from 'react'
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <div className={classes.NavItem}>
            <li>
                <NavLink to={props.link}
                exact={props.exact}
                activeClassName={classes.active}>{props.children}</NavLink>
            </li>
        </div>
    )
}


export default NavItem;