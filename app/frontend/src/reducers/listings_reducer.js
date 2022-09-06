import { } from '../actions/posts'
import { GET_LISTINGS, POST_LISTINGS, DEL_LISTINGS } from '../actions/type'

const initial_state = {
    listings: []
}

const listing_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_LISTINGS:
            return {
                ...state,
                listings: action.payload,
            }
        case POST_LISTINGS:
            return {
                ...state,
                listings: [...state.listings, action.payload]
            }
        case DEL_LISTINGS:
            return {
                ...state,
                listings: state.listings.filter((listing) => listing.id !== action.payload)
            }
        default:
            return state
    }
}

export default listing_reducer