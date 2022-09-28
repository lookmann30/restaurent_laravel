import { put, call } from 'redux-saga/effects';
import editCart from "../actions"

export function* sagaEditCart({payload}) {
    try {
        yield put(editCart.editCartFetching())
        yield put(editCart.editCartSuccess(payload))
    } catch (error) {
        const errMsg = error.response.data.message;
        yield put(editCart.editCartFailed(errMsg))
    }
}