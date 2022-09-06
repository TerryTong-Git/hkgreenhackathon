import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home/home';
import PropTypes from 'prop-types'
import { GetAPI, DelAPI, PostAPI } from '../../actions/posts';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'



class Posts extends Component {
    state = {
        ingredient: '',
        price_with_bulk: '',
        price_without_bulk: '',
        bulk_minimum: '',
        description: ''
    }
    componentDidMount() {
        this.props.GetAPI()

    }

    onSubmit = (e) => {
        e.preventDefault()
        const { ingredient, price_with_bulk, price_without_bulk, description, bulk_minimum } = this.state
        const send = { ingredient, price_with_bulk, price_without_bulk, description, bulk_minimum }
        this.props.PostAPI(send)
        this.setState({
            ingredient: '',
            price_with_bulk: '',
            price_without_bulk: '',
            bulk_minimum: '',
            description: ''
        })
    }
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    del = (id) => {
        this.props.DelAPI(id)
    }
    render() {
        const { ingredient, price_with_bulk, price_without_bulk, description, bulk_minimum } = this.state


        return <>

            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Ingredient</label>
                    <input type="text" className='form-control' value={ingredient} name="ingredient" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className='form-control' value={price_without_bulk} name="price_without_bulk" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Bulk Threshold</label>
                    <input type="number" className='form-control' value={bulk_minimum} name="bulk_minimum" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Bulk Price</label>
                    <input type="number" className="form-control" value={price_with_bulk} name="price_with_bulk" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="textarea" className="form-control" value={description} name="description" onChange={this.onchange} />
                </div>
                <button type="submit" > Submit</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ingredient</th>
                        <th>Price</th>
                        <th>Bulk Minimum</th>
                        <th>Bulk Price</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.posts.map((post, index) => {
                        return <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.ingredient}</td>
                            <td>{post.price_without_bulk}</td>
                            <td>{post.bulk_minimum}</td>
                            <td>{post.price_with_bulk}</td>
                            <td>{post.description}</td>
                            <td>
                                <button onClick={this.del.bind(this, post.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                    <tr></tr>
                </tbody>
            </table>
        </>
    }
}   // does the delapi forget 'this'?


const mapStateToProps = state => ({
    posts: state.Api.posts,
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, { GetAPI, DelAPI, PostAPI })(Posts) 