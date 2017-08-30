import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

class UpdateBohurt extends Component{
    render(){
        return(
            <div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateBohurt);
