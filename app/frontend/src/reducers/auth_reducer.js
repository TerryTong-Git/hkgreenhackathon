import LOGIN, { LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS } from '../actions/type'
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from '../actions/type'
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/type'
const initial_state = {
    token: localStorage.getItem('token'),
    isloading: false,
    isAuthenticated: null,
    user: null

}

export const auth_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isloading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isloading: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isloading: false,

            }
        case AUTH_ERROR:
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isloading: false,
                isAuthenticated: null,
                user: null
            }

        default:
            return state



    }
}