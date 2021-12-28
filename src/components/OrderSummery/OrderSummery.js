import React from "react";
import Aux from "../../hoc/Auxilary";
const OrderSummery = (props) => {
    
    
        const ingredientSummery = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize', border:'none'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })

    const continueBtn = {
        backgroundColor:'transparent',
        color:'blue',
        border:'none',
        font:'inherit',
        borderRadius:'5px',
        fontWeight:'bold',
        margin:'10px'
    }

    const cancleBtn = {
        backgroundColor:'transparent',
        color:'red',
        font:'inherit',
        border:'none',
        borderRadius:'5px',
        fontWeight:'bold',
        margin:'10px'
    }
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burder with the following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total Price: {props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <button style={cancleBtn} onClick={props.purchaseCancel}>Cancel</button>
                <button style={continueBtn} onClick={props.purchaseContinue}>Continue</button>
            </Aux>
        );
    
};

export default OrderSummery;