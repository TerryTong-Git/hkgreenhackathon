import { DEL_API, GET_API, POST_API } from '../actions/type'

const initial_state = {
    posts: []
}

const Api_Reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_API:
            return {
                ...state,
                posts: action.payload,
            }
        case POST_API:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case DEL_API:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload)
            }
        default:
            return state
    }
}

export default Api_Reducer