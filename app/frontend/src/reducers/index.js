import { combineReducers } from "redux";
import Api_Reducer from './api_reducer';
import { error_reducer } from "./error_reducer";
import { message_reducer } from "./message_reducer";
import { auth_reducer } from "./auth_reducer";
import listing_reducer from "./listings_reducer"

const root_reducer = combineReducers(
    {
        Api: Api_Reducer,
        Error: error_reducer,
        Message: message_reducer,
        Auth: auth_reducer,
        Listing: listing_reducer
    }
)

export default root_reducer