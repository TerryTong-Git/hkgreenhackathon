import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, Navigate } from 'react-router-dom'
import { LoginAPI } from '../../actions/auth'
import { connect } from 'react-redux'


class Login extends Component {
    state = {
        'username': '',
        'password': ''
    }

    OnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    OnSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        this.props.LoginAPI(username, password)
        this.setState({
            'username': '',
            'password': ''
        })
    }

    render() {
        let vendor = null;
        try {
            vendor = this.props.auth.user.vendor;
        } catch (error) {
        } finally {
            vendor = false
        }
        const { username, password } = this.state
        if (this.props.isAuthenticated && vendor) {
            return <Navigate to='/posts' />
        }
        else if (this.props.isAuthenticated && vendor === false) {
            return <Navigate to='/listing_dashboard' />
        }
        else {
            return <>
                <div className="container-fluid">
                    <form onSubmit={this.OnSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={username} name="username" onChange={this.OnChange} />
                            <small className='form-text text-muted'> e.g. JohnCena123  </small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password} name="password" onChange={this.OnChange} />
                            <small className='form-text text-muted'> e.g. Enter a password  </small>
                        </div>
                        <button type="submit" > Submit</button>
                    </form>
                    <div>Don't have an account? <Link to="/register">Register</Link></div>
                </div>
            </>
        }
    }
}

const mapStatetoProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    auth: state.Auth
})

export default connect(mapStatetoProps, { LoginAPI })(Login)

//why need parenthesis?