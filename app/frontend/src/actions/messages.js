import { CREATE_MESSAGE, ERR_API, GET_MESSAGE } from "./type"

export const create_message = (message) => {
    return {
        type: CREATE_MESSAGE,
        payload: message
    }

}

export const get_message = (message) => {
    return {
        type: GET_MESSAGE,
        payload: message
    }
}

export const return_errors = (message, status) => {
    const errors = {
        message: message,
        status: status,
    }
    return {
        type: ERR_API,
        payload: errors
    }
}
