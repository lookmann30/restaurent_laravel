import * as actionTypes from "../saga/actionTypes"

export const editCart = (payload) => ({
    type: actionTypes.EDIT_CART_REQUEST,
    payload
})

export const editCartFetching = () => ({
    type: actionTypes.EDIT_CART_FETCHING
})

export const editCartSuccess = (payload) => ({
    type: actionTypes.EDIT_CART_SUCCESS,
    payload
})

export const editCartFailed = (payload) => ({
    type: actionTypes.EDIT_CART_FAILED,
    payload
})

export default {
    editCart,
    editCartFetching,
    editCartSuccess,
    editCartFailed,
};