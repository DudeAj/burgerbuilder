import React from 'react';
import classes from './Sidebar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';
const Sidebar = (props) => {
    let attachedClasses = [classes.Sidebar,classes.Close]

    if(props.open) {
        attachedClasses = [classes.Sidebar,classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
            <nav>
                    <NavItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};


export default Sidebar;