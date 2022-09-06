import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home/home';
import PropTypes from 'prop-types'
import { GetAPI } from '../../actions/posts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { LogoutAPI } from '../../actions/auth'





class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const authlinks = (<>
            <li className="nav-item container hover-shadow" > <Link className='nav-link-text' to="/posts">Posts</Link> </li>
            <li className="nav-item container hover-shadow" > <Link className='nav-link-text' to="/listing_dashboard">Listings</Link> </li>
            <button onClick={this.props.LogoutAPI.bind(this)}>Logout</button>
        </>)

        const guestlinks = (<>
            <li className="nav-item container hover-shadow " > <Link className='nav-link-text' to="/login">Login</Link>
            </li>
            <li className="nav-item container hover-shadow " > <Link className='nav-link-text' to="/register">Register</Link> </li>
        </>);

        return <div className="navbar navbar-expand-sm">
            <div>
                <img src="../../static/frontend/svgs/nav/logo.svg" id="brand-img" /></div>
            <ul className="navbar-nav">
                {this.props.isAuthenticated ? authlinks : guestlinks}
            </ul>

        </div>
    }
}

const mapStatetoProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})


export default connect(mapStatetoProps, { LogoutAPI })(Navbar)