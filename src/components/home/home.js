import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import  NavbarComp from './partials/navbar';
import FlashMessages from '../../components/helpers/message';


class Home extends Component{
    state = {};



    render() {


        return (
            <div>
                <FlashMessages/>
                <NavbarComp/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);