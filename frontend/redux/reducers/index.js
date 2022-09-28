import { combineReducers } from "redux";

//cart
import cartReducer from "./cart.reducer";
import editCartReducer from "./editCart.reducer";

export default combineReducers({
    //cart
    cartReducer,
    editCartReducer
})