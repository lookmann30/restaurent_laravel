import { put, call } from 'redux-saga/effects';
import cart from "../actions"

export function* sagaCart({payload}) {
    try {
        yield put(cart.addToCartFetching())
        yield put(cart.addToCartSuccess(payload))
    } catch (error) {
        const errMsg = error.response.data.message;
        yield put(cart.addToCartFailed(errMsg))
    }
}