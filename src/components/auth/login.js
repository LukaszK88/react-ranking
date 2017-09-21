import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { loginUser, loginWithFacebook } from '../../actions';
import {withRouter} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { input } from '../../helpers/input';
import ForgotPassword from './forgotPassword';


class Login extends Component{

    onSubmit(values){

       this.props.loginUser(values);
       this.props.history.push('/');
    }

    render(){
        const handleSubmit = this.props.handleSubmit;

        return(
            <Modal size={'tiny'} trigger={<Button>Login</Button>}>
                <Modal.Header>Login</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                component={input.renderField}
                            />
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                component={input.renderField}
                            />
                            <Button type="submit">Submit</Button>
                            <FacebookLogin
                                appId="1884018281856728"
                                fields="name,email,picture"
                                cssClass="ui button"
                                icon="fa-facebook"
                                textButton=" FB Login"
                                callback={this.props.loginWithFacebook}
                            />
                            <ForgotPassword/>
                        </form>

                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )

    }
}

function validate(values) {
    const errors = {};

    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.username){
        errors.username = "Username cannot be empty";
    }
    if(values.username && values.username.length < 4){
        errors.username = "Username should be min 4 chars";
    }
    if(values.username && !regExp.test(values.username)){
        errors.username = "Username should be a valid email";
    }
    if(!values.password){
        errors.password = "Password should not be empty";
    }

    return errors;
}

function mapStateToProps(state) {
    return { };
}

export default withRouter(reduxForm({validate:validate, form: 'addPostForm'})(connect(mapStateToProps,{loginUser,loginWithFacebook})(Login)));