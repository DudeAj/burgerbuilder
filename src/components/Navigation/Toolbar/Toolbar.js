import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './Toolbar.css';
import Toggle from '../Sidebar/Toggle/Toggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Toggle clicked={props.ToggleClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}

export default Toolbar