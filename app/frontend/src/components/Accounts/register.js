import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { RegisterAPI } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom'

class Register extends Component {

    state = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        password2: '',
        email: '',
        vendor: false,
    }

    static propTypes = {
        RegisterAPI: PropTypes.func.isRequired
    }

    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    Submit = e => {
        e.preventDefault();
        const { username, password, email, first_name, last_name, password2, vendor } = this.state;
        this.props.RegisterAPI(username, password, email, first_name, last_name, password2, vendor)
        this.setState(
            {
                first_name: '',
                last_name: '',
                password2: '',
                username: '',
                password: '',
                email: '',
                vendor: false,
            }
        )
    }

    vendorChange = () => {
        this.setState(prevState => ({
            vendor: !prevState.vendor
        }))

    }

    render() {
        const { username, password, email, first_name, last_name, password2, vendor } = this.state;
        if (this.props.isAuthenticated) {
            return <Navigate to='/posts' />
        }
        else {
            return <>
                <div className="container-fluid">
                    <form onSubmit={this.Submit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className='form-control' value={first_name} name="first_name" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. John  </small>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className='form-control' value={last_name} name="last_name" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. Cena  </small>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className='form-control' value={email} name="email" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. JC@gmail.com  </small>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={username} name="username" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. JohnCena123  </small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password} name="password" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. Enter a password  </small>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" value={password2} name="password2" onChange={this.onchange} />
                            <small className='form-text text-muted'> e.g. Enter the same password again  </small>
                        </div>
                        <div className="form-group">
                            <label> Are you a vendor?</label>
                            <button onClick={this.vendorChange} type="button" name="vendor" >{vendor ? "I am a vendor" : "I am not a vendor"}</button>
                        </div>
                        <button type="submit"> Submit</button>
                    </form>
                    <div> Have an account? <Link to="/login">Login</Link></div>

                </div>

            </>
        }
    }
};

const mapStatetoProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStatetoProps, { RegisterAPI })(Register)