import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Model from '../../components/UI/Model/Model';
import OrderSummery from "../../components/OrderSummery/OrderSummery";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredients();
        
    }, [])

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
            
        }

        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

        const disabledInfo = {
            ...props.ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;

        }
        let orderSummery = null;

        let burger = props.error ?  <p>Ingredients can't be loaded!</p>: <Spinner/>

        if(props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={props.ings} />
                    <BuildControls 
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        price={props.price}
                        Ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}
                         />
                </Aux>);

                orderSummery = <OrderSummery 
                ingredients={props.ings}
                price={props.price}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
                />;
        }

        return (
            <Aux>
                <Model show={purchasing} modelClosed={purchaseCancelHandler}>
                    {orderSummery}
                </Model>
                {burger}
            </Aux>
        );
    
}

const mapStateToProps = state => {
    return {
        ings:state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice,
        error: state.BurgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchanseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));