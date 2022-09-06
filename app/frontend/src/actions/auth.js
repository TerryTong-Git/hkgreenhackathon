import axios from 'axios'
import { create_message, return_errors } from './messages';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    ERR_API,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,

    LOGOUT_SUCCESS
}
    from './type'

export const AuthAPI = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })
    axios.get('/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const LoginAPI = (username, password) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "Application/JSON",

        }
    }
    const body = JSON.stringify({ username, password })
    axios.post('/auth/login', body, config)
        .then(res => {
            dispatch(create_message({ Login: 'Success' }))
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAILED
            })
        })
}

export const RegisterAPI = (username, password, email, first_name, last_name, password2) => dispatch => {
    const config = {
        headers: { "Content-Type": "Application/JSON" }
    }

    const body = JSON.stringify({ username, password, email, first_name, last_name, password2 })
    axios.post('/auth/register', body, config)
        .then(res => {
            dispatch(create_message({ Created: "User Created" }))
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAILED
            })
        })
}

//Logout

export const LogoutAPI = () => (dispatch, getState) => {

    axios.post('/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,

            })
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        })

}

export const tokenConfig = getState => {
    const token = getState().Auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config

}