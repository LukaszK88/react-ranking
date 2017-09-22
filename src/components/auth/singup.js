import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import {withRouter} from 'react-router-dom';
import {addFlashMessage} from '../../actions/flashMessages';
import { input } from '../../helpers/input';


class Signup extends Component{
    constructor(){
        super();

        this.state = ({
            modalOpen:false
        });
    }

    onSubmit(values){
        this.props.registerUser(values);
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });


    render(){
        const handleSubmit = this.props.handleSubmit;

        return(
            <Modal size={'tiny'} open={this.state.modalOpen}  onClose={this.handleClose} trigger={<a className="nav-link" onClick={this.handleOpen} >Register</a>}>
                <Modal.Header>Register</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email"
                                name="email"
                                type="text"
                                component={input.renderField}
                            />
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                component={input.renderField}
                            />
                            <Button color={'black'} type="submit">Register</Button>
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

    if(!values.email){
        errors.email = "Username cannot be empty";
    }
    if(values.email && values.email.length < 4){
        errors.email = "Username should be min 4 chars";
    }
    if(values.email && !regExp.test(values.email)){
        errors.email = "Username should be a valid email";
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