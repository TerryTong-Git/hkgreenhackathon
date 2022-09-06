import { GET_API, POST_API, DEL_API } from './type';
import axios from 'axios';
import { get_message, create_message, return_errors } from './messages'
import { tokenConfig } from './auth'
export const GetAPI = () => (dispatch, getState) => {
    axios.get('/post/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_API,
                payload: res.data
            })
            dispatch(
                get_message({ Retrieved: "Got Posts " })
            )
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        }
        )
}

export const PostAPI = (send) => (dispatch, getState) => {
    axios.post('/post/', send, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
            dispatch({
                type: POST_API,
                payload: res.data
            })
            dispatch(
                create_message({ Created: "Created Post" })
            )
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        }
        )
}

export const DelAPI = (id) => (dispatch, getState) => {
    axios.delete(`/post/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DEL_API,
                payload: id
            })
            dispatch(create_message({ Deleted: "Deleted Post" }))
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        })

}

//Make the error thing more concise



