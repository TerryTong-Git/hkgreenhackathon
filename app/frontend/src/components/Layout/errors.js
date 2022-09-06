import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';




class Error extends Component {
    static propTypes = {
        errors: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }


    componentDidUpdate(prevProps) {
        const { errors, alert, message } = this.props
        if (errors !== prevProps.errors) {
            if (errors.message.username) {
                alert.error(`Username: ${errors.message.username}`)
            }
            if (errors.message.password) {
                alert.error(`Password: ${errors.message.password}`)
            }
            if (errors.message.email) {
                alert.error(`Email: ${errors.message.email}`)
            }
            if (errors.message.detail) {
                alert.error(`${errors.message.detail}`)
            }
            if (errors.status !== 200) {
                alert.error(`Status: ${errors.status}`)
            }
            if (errors.message.non_field_errors) {
                alert.error(errors.message.non_field_errors)
            }
        }
        if (message !== prevProps.message) {
            if (message.Created) {
                alert.success(`${message.Created}`)
            }
            if (message.Logged) {
                alert.success(`${message.Logged}`)
            }
            if (message.Login) {
                alert.success(`${message.Login}`)
            }
            if (message.Deleted) {
                alert.success(`${message.Deleted}`)
            }
        }


    }
    render() {
        return <>

        </>
    }
}

const mapStateToProps = state => ({
    errors: state.Error,
    message: state.Message
})



export default connect(mapStateToProps)(withAlert()(Error))