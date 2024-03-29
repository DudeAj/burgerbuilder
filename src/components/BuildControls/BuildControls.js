import React from "react";
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildController'
import { PROPERTY_TYPES } from "@babel/types";

const controls = [
    {label:"Salad", type:'salad'},
    {label:"Bacon", type:'bacon'},
    {label:"Cheese", type:'cheese'},
    {label:"Meat", type:'meat'},
];
const buildControls = (props) => {
    
return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)} 
            disabled={props.disabled[ctrl.type]}/>
        ))}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.Ordered}>{props.isAuth ? 'Order Now' : 'Sign Up To Order'}</button>
    </div>
)
}

export default buildControls