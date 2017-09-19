
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Message } from 'semantic-ui-react'
import _ from 'lodash';
import { removeFlashMessage } from '../../actions/flashMessages';


class FlashMessages extends Component{

    componentWillUpdate(){
        window.setTimeout(() => {
            this.props.removeFlashMessage()
        }, 2500);
    }

    render(){

        if(!this.props.message){
            return null;
        }
        return(
            <div style={
                {'zIndex': '10000','position':'absolute','right':'0'}
            }>

                <Message
                    color={this.props.message.type === 'success' ? 'green' : 'red'}
                    header={this.props.message.text}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { message:state.flashMessage };
}

export default connect(mapStateToProps,{removeFlashMessage})(FlashMessages);