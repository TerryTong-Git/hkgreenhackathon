import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetAPI } from '../../actions/posts';



class Home extends Component {
    constructor(props) {
        super(props);
    }

    thing = () => {
        const user = this.props.user
        if (user) {
            return <div>
                Hello {user.username}!
            </div>
        }
        else {
            return <div>Welcome!</div>
        }
    }

    render() {
        return <>
            <div className="container home-1st-container">
                {/* {this.thing()} */}

                <iframe src='https://webchat.botframework.com/embed/bots123lol?s=Tg6qZ62JBPo.3eAQEEMt9N03v-fF0_Zezotv4XPRaSB39Tjc5HYub-8'></iframe>

                <div className="container home-2nd-container">
                    <h1 className="home-bold-header">Problem: Bulk Overbuying</h1>
                    <div className="row">
                        <div className="col">
                            <img src="../../../static/frontend/home/MoneyClickClipartsvg.svg"
                                width="125px" height="125px" className='home-facts-img'></img>
                            <h2 className="home-bold-facts">$60 million<sup>1</sup></h2>
                            <p className='facts-para'>worth of food is wasted in HK restaurants due to overbuying and spoilage</p>
                        </div>
                        <div className="col">
                            <img src="../../../static/frontend/home/TrashCanClipartsvg.svg"
                                width="125px" height="125px" className='home-facts-img'></img>
                            <h2 className="home-bold-facts">3600 tons<sup>2</sup></h2>
                            <p className='facts-para'>of food are dumped in landfills DAILY</p>
                        </div>
                        <div className="col">
                            <img src="../../../static/frontend/home/ForkandKnifesvg.svg"
                                width="125px" height="125px" className='home-facts-img'></img>
                            <h2 className="home-bold-facts">Small Firms<sup>3</sup></h2>
                            <p className='facts-para'>are particularly prone to overbuying</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

};

const mapStatetoProps = (state) => ({
    user: state.Auth.user
})



export default connect(mapStatetoProps)(Home)