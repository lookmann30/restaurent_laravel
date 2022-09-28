import { takeEvery, all } from 'redux-saga/effects'

//Cart
import { sagaCart} from './cart.saga';
import { sagaEditCart} from './editCart.saga';

import * as actionTypes from "./actionTypes"

/************************************************************************************************************/

//Cart
function* watchCartRequest() {
    yield takeEvery(actionTypes.ADD_TO_CART_REQUEST, sagaCart)
}

//EditCart
function* watchEditCartRequest() {
    yield takeEvery(actionTypes.EDIT_CART_REQUEST, sagaEditCart)
}

 function* rootSaga() {
    yield all([   
        //cart
        watchCartRequest(),  
        watchEditCartRequest(),
    
    ])
}

export default rootSaga