import * as actionTypes from "../saga/actionTypes"

export const addToCart = (payload) => ({
    type: actionTypes.ADD_TO_CART_REQUEST,
    payload
})

export const addToCartFetching = () => ({
    type: actionTypes.ADD_TO_CART_FETCHING
})

export const addToCartSuccess = (payload) => ({
    type: actionTypes.ADD_TO_CART_SUCCESS,
    payload
})

export const addToCartFailed = (payload) => ({
    type: actionTypes.ADD_TO_CART_FAILED,
    payload
})

export default {
    addToCart,
    addToCartFetching,
    addToCartSuccess,
    addToCartFailed,
};