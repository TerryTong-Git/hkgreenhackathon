import { Nagivate, Navigate, Route } from 'react-router-dom'
import React, { Component, useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import { connect, useSelector } from 'react-redux'
import { GetAPI } from '../../actions/posts'
import store from '../../store'

const PrivateRoute_for_vendor = ({ children, auth, GetAPI }) => {
    let vendor = null;
    try {
        vendor = auth.user.vendor;
    }
    catch (error) {
        console.log(error)
    }
    finally {
        vendor = false
    }

    if (auth.isloading) {
        return <h2>loading swirl</h2>
    }
    //putting the user object into the auth statement makes it re-render?
    else if (vendor && auth.isAuthenticated) {
        return children
    }

    else {
        // should probably return the error to the user via the react alerts
        return <Navigate to='/login' />
    }
}

const mapStatetoProps = state => ({
    auth: state.Auth,
})

export default connect(mapStatetoProps, { GetAPI })(PrivateRoute_for_vendor)

// class PrivateRoute_for_vendor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             vendor: false
//         }
//     }

//     render() {
//         if (this.props.auth.isloading) {
//             return <h2>loading swirl</h2>
//         }

//         else if (this.state.vendor && this.props.auth.isAuthenticated) {
//             return props.children
//         }
//         else {
//             // should probably return the error to the user via the react alerts
//             return <Navigate to='/login' />
//         }
//     }
// }

// const mapStatetoProps = state => ({
//     auth: state.Auth
// })

// export default connect(mapStatetoProps, { GetAPI })(PrivateRoute_for_vendor)

