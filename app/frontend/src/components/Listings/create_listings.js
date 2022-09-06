import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home/home';
import PropTypes from 'prop-types'
import { GetListings, DelListings, PostListings } from '../../actions/listings';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class Listing extends Component {
    state = {
        deadline: '',
        amount_bought: '',
        seller: '',
        bulk_price: '',
        ingredient: ''

    }
    componentDidMount() {
        this.props.GetListings()
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { deadline,
            amount_bought,
            seller, bulk_price, ingredient } = this.state
        const send = {
            deadline,
            amount_bought,
            seller, bulk_price, ingredient
        }
        this.props.PostListings(send)
        this.setState({
            deadline: '',
            amount_bought: '',
            seller: '',
            bulk_price: '',
            ingredient: ''
        })
    }
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { deadline,
            amount_bought,
            seller, bulk_price, ingredient } = this.state

        return <>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Ingredient</label>
                    <input type="text" className='form-control' value={ingredient} name="ingredient" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input type="text" className='form-control' value={deadline} name="deadline" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className='form-control' value={amount_bought} name="amount_bought" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Seller</label>
                    <input type="number" className='form-control' value={seller} name="seller" onChange={this.onchange} />
                </div>
                <div className="form-group">
                    <label>Bulk_price</label>
                    <input type="number" className='form-control' value={bulk_price} name="bulk_price" onChange={this.onchange} />
                </div>
                <button type="submit" > Submit</button>
            </form>

        </>
    }   // does the delapi forget 'this'?
}

const mapStatetoProps = state => ({
    user: state.Auth.user
})



export default connect(mapStatetoProps, { GetListings, PostListings })(Listing) 