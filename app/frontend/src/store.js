import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import root_reducer from './reducers/';


const init_state = {};

const middleware = [thunk];

const store = createStore(
    root_reducer,
    init_state,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store