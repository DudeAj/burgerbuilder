import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxilary';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const Layout = (props) => {
    const [showsidebar,setshowsidebar] = useState(false);

    const SideBarClosedHandler = () => {
        setshowsidebar(false)
    }    

    const ToggleClickedHandler = () => {
        setshowsidebar(!showsidebar)  
    }
     
  
        return (
            <Aux>
                <Toolbar 
                isAuth={props.isAuthenticated}
                ToggleClicked={ToggleClickedHandler}/>
                <Sidebar
                isAuth={props.isAuthenticated}
                open={showsidebar} closed={SideBarClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);