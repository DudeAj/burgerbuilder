import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummery.css';


const checkoutSummery = (props) => {


    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope it tastes Well!</h1>
            <div style={{width:'100%',height:'auto',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <button className={classes.Success} onClick={props.checkoutCancelled}>Cancel</button>
            <button className={classes.Cancel} onClick={props.checkoutContinued}>Continue</button>
        </div>
    )
}

export default checkoutSummery