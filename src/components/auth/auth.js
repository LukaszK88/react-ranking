import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

class Auth extends Component{


    render(){
        console.log('auth');
        return(
            <div>
                Auth
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

export default connect(mapStateToProps,mapDispatchToProps)(Auth);