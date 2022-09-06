import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home/home';
import PropTypes from 'prop-types'
import { GetListings, DelListings } from '../../actions/listings';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { LogoutAPI } from '../../actions/auth'





class Listing_home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.props.GetListings()
    }
    del = (id) => {
        this.props.DelListings(id)
    }
    render() {
        return <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ingredient</th>
                        <th>Deadline</th>
                        <th>Bulk Price</th>
                        <th>Seller</th>
                        <th>Amount Bought</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.listings.map((listing, index) => {
                        return <tr key={index}>
                            <td>{listing.id}</td>
                            <td>{listing.ingredient}</td>
                            <td>{listing.deadline}</td>
                            <td>{listing.bulk_price}</td>
                            <td>{listing.seller}</td>
                            <td>{listing.amount_bought}</td>
                            <td>
                                Edit
                            </td>
                            <td>
                                <button onClick={this.del.bind(this, listing.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                    <tr></tr>
                </tbody>
            </table>
            <ul>
                <li className="nav-item container hover-shadow" > <Link to="/listings">Listings</Link> </li>
            </ul>
        </>

    }
}


const mapStatetoProps = state => ({
    listings: state.Listing.listings,
})


export default connect(mapStatetoProps, { GetListings, DelListings })(Listing_home)