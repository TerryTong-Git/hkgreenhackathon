import { Nagivate, Navigate, Route } from 'react-router-dom'
import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { GetAPI } from '../../actions/posts'

const PrivateRoute_for_restaurant = ({ children, auth, GetAPI }) => {
    console.log('running1')
    const [vendors, setvendor] = useState({ vendor: null })
    useEffect(() => {
        try {
            setvendor({ vendor: auth.user.vendor });
        }
        catch (error) {
        }
        finally {
            setvendor({ vendor: false })
        }
    }, [auth])
    if (auth.isloading) {
        return <h2>loading swirl</h2>
    }
    else if (auth.isAuthenticated && !vendors.vendor) {
        return children
    }
    else {
        return <Navigate to='/login' />
    }


}

const mapStatetoProps = state => ({
    auth: state.Auth
})

export default connect(mapStatetoProps, { GetAPI })(PrivateRoute_for_restaurant)
//if I refresh posts with user loaded it still redirects away.

