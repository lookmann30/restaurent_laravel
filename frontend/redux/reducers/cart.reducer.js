import * as actions from '../saga/actionTypes'

const initailState = {
    result: null,
    isFailed: false,
    isFetching: false
}

export default (state = initailState, { type , payload}) => {
    switch (type) {
        case actions.ADD_TO_CART_FETCHING:
            return { ...state, result: null, isFetching: true, isFailed: false }
        case actions.ADD_TO_CART_FAILED:
            return { ...state, result: payload, isFetching: false, isFailed: true }
        case actions.ADD_TO_CART_SUCCESS:
            return { ...state, result: payload, isFetching: false, isFailed: false }
        default:
            return state
    }
    
};
