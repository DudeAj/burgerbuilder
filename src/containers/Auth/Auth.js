import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

import Input from '../../components/UI/input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/spinner/spinner";

const Auth = props => {
    const [authForm, setAuthForm] =useState({
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation: {
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        });

        const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName] : {
                ...authForm[controlName],
                value:event.target.value,
            }
        };
        setAuthForm(updatedControls)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

        const formElementsArray = [];
        for(let key in authForm) {
            formElementsArray.push({
                id:key,
                config:authForm[key]
            });
        }
               
        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={event=>inputChangedHandler(event,formElement.id)} />
        ));

        if(props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        if(props.error) {
            errorMessage = <p>{props.error.message}</p>
        }
        let authRedirect = null;
        if(props.isAuthenticated) {
            
            authRedirect = <Redirect to={props.authRedirectPath}/>
        }
        return (
            <div className={classes.ContactData}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={onSubmitHandler}>
                    {form}
                    <button className={classes.LoginBtn}>{isSignup? 'Create Account':'Log In'}</button>
                </form>
                <p 
                onClick={switchAuthModeHandler}
                className={classes.Signintext}>{isSignup ? 'Log In':'Create Account'}</p>
            </div>
        );
    
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.BurgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);