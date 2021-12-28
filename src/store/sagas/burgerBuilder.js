import axios from "../../axios-orders";
import {put} from 'redux-saga/effects';
import * as actions from '../actions';

export function* initIngredientsSaga () {
    const response = yield axios.get('https://react-my-burger-517fb-default-rtdb.firebaseio.com/ingredients.json')
        try {
            yield put(actions.setIngredients(response.data))
        } catch(error) {
            yield put(actions.fetchIngredientsFailed());
        }
}