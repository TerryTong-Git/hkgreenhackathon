import { GET_MESSAGE, CREATE_MESSAGE } from "../actions/type"

const INIT = {
    message: {}
}

export const message_reducer = (state = INIT, action) => {
    switch (action.type) {
        case GET_MESSAGE:
            return (state = action.payload)
        case CREATE_MESSAGE:
            return (state = action.payload)
        default:
            return state

    }

}