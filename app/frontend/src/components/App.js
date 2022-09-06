import React, { Component } from 'react';
import reactDOM from 'react-dom';
import Navbar from './Layout/navbar';
import store from '../store';
import { Provider } from 'react-redux';
import Register from './Accounts/register';
import Error from './Layout/errors'
import { Provider as AlerProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Login from './Accounts/login'
import PrivateRoute from './Layout/privroute_for_vendor';
import Posts from './Posts/posts';
import Listing from './Listings/create_listings'
import Listing_home from './Listings/listing_home';

import { AuthAPI } from '../actions/auth';
import Privroute_for_vendor from './Layout/privroute_for_vendor';
import Privroute_for_restaurant from './Layout/privroute_for_restaurant';

const OPTIONS = {

    timeout: 10000,
    transition: 'fade',
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(AuthAPI())
    }
    render() {
        return <Provider store={store}>
            <AlerProvider template={AlertTemplate}{...OPTIONS}>
                <Router>
                    <Navbar />
                    <Error />
                    <div className="container">

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/posts" element={<Privroute_for_vendor><Posts /></Privroute_for_vendor>} />
                            <Route path="/listings" element={<Listing></Listing>} />
                            <Route path="/listing_dashboard" element={<Privroute_for_restaurant><Listing_home></Listing_home></Privroute_for_restaurant>} />
                        </Routes>
                    </div>
                </Router>
            </AlerProvider>
        </Provider >
    }
}

let domContainer = document.getElementById('app');
let root = reactDOM.createRoot(domContainer);
root.render(<App />)