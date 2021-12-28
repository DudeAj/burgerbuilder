import React, {Component} from "react";
import classes from './Model.css';
import Aux from "../../../hoc/Auxilary";
import Backdrop from "../Backdrop/Backdrop";

const Model =(props) => {
    /* shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== props.show || nextProps.children !== props.children
    } */
    
    
        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modelClosed}/>
                <div className={classes.Model} style={{transform:props.show ? 'translateY(0)':'translateY(-100vh)',
                opacity:props.show ? '1' : '0'
                }}>
                    {props.children}
                </div>
            </Aux>
        );
    
};

export default React.memo(
    Model,
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children);