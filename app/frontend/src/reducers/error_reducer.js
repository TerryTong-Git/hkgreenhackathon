import { ERR_API } from '../actions/type';

const initial_state = {
    message: {},
    status: null, //or [] ?
}

export const error_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case ERR_API:
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status
            };
        default:
            return state

    }
}

