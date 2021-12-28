import {delay} from 'redux-saga/effects';
import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/index';


export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
} 

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());

    
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email:action.email,
        password:action.password,
        returnSecureToken:true
    }
    let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqObOIZ4sL-AcQir-O7a4fdI5CDgcD1zM';
    if(!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqObOIZ4sL-AcQir-O7a4fdI5CDgcD1zM';
    }
    try {
        const response = yield axios.post(url,authData)
        const expireDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expireDate', expireDate)
        yield localStorage.setItem('userId',response.data.localId);
        yield put(actions.authSuccess(response.data.idToken,response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(err){
         yield put(actions.authFail(err.response.data.error))   
            
    }
}


export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if(!token) {
            yield put(actions.logout());
        } else {
            const expireDate = yield new Date(localStorage.getItem("expireDate"));
            if(expireDate <= new Date()) {
                yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token,userId));
                yield put(
                    actions.checkAuthTimeout(
                        (expireDate.getTime() - new Date().getTime())/1000
                    )
                );
            }
        }
}