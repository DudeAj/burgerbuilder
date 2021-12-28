import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactData = props =>  {
    const [orderForm,setOrderForm] = useState({
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation: {
                    required:true,
                },
                valid:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation: {
                    required:true,
                },
                valid:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation: {
                    required:true,
                },
                valid:false,
                minLength:5,
                maxLength:5
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Select Country'
                },
                value:'',
                validation: {
                    required:true,
                },
                valid:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation: {
                    required:true,
                },
                valid:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'},
                    ],
                },
                value:'',
            },
        });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdent in orderForm) {
            formData[formElementIdent] = orderForm[formElementIdent].value;
        }
        const order = {
            ingredients:props.ings,
            price:props.price,
            orderData:formData,
            userId:props.userId 
        }

        props.onOrderBurger(order,props.token);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier)=>{
        
        const updatedOrderForm = {
            ...orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        //updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        setOrderForm(updatedOrderForm);
    }


        const formElementsArray = [];
        for(let key in orderForm) {
            formElementsArray.push({
                id:key,
                config:orderForm[key]
            })
        }

        let form = (
            <form onSubmit={orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={event=>inputChangedHandler(event,formElement.id)} />
                    ))}
                    <button className={classes.Success} onClick={orderHandler}>Order</button>
                </form>
        );
        if(props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );

}
const mapStateToProps = state => {
    return {
        ings:state.BurgerBuilder.ingredients,
        price:state.BurgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token, 
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));