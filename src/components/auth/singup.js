import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import {withRouter} from 'react-router-dom';
import {addFlashMessage} from '../../actions/flashMessages';


class Signup extends Component{
    renderField(field){

        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type="text"
                    { ...field.input }
                />
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    }

    onSubmit(values){
       this.props.registerUser(values);
       this.props.history.push('/');
    }

    render(){
        const handleSubmit = this.props.handleSubmit;

        return(
            <Modal size={'tiny'} trigger={<Button>Register</Button>}>
                <Modal.Header>Register</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email"
                                name="email"
                                component={this.renderField}
                            />
                            <Field
                                label="Password"
                                name="password"
                                component={this.renderField}
                            />
                            <Button type="submit">Submit</Button>
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

export default withRouter(reduxForm({validate:validate, form: 'signupForm'})(connect(mapStateToProps,{registerUser,addFlashMessage})(Signup)));