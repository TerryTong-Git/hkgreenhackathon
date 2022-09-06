
import { GET_LISTINGS, POST_LISTINGS, DEL_LISTINGS } from './type';
import axios from 'axios';
import { get_message, create_message, return_errors } from './messages'

import { tokenConfig } from './auth'
export const GetListings = () => (dispatch, getState) => {
    axios.get('/mylistings/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LISTINGS,
                payload: res.data
            })
            dispatch(
                get_message({ Retrieved: "Got Listings " })
            )
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        }
        )
}

export const PostListings = (send) => (dispatch, getState) => {
    axios.post('/mylistings/', send, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
            dispatch({
                type: POST_LISTINGS,
                payload: res.data
            })
            dispatch(
                create_message({ Created: "Created Listings" })
            )
        })
        .catch(err => {
            dispatch(return_errors(err.response.data, err.response.status))
        }
        )
}

export const DelListings = (id) => (dispatch, getState) => {
    axios.delete(`/mylistings/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DEL_LISTINGS,
                payload: id
            })
            dispatch(create_message({ Deleted: "Deleted Lisitngs" }))
        })
        .catch(err => {
            console.log(err)
            dispatch(return_errors(err.response.data, err.response.status))
        })

}
