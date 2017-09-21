import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {updateUser} from '../../../actions';
import { input } from '../../../helpers/input';
import { config } from '../../../config';

class UpdateUser extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            value: 50
        };
    }

    onSubmit(values){
       this.props.updateUser(values);
       this.handleClose();
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const handleSubmit = this.props.handleSubmit;

        const options = config.clubs.select;

        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<button type="button" onClick={this.handleOpen}>Personal Info </button>}>
                <Modal.Header>Info</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Your Name *"
                                name="name"
                                placeholder="Your name"
                                type="text"
                                component={input.renderField}
                            />
                            <br/>
                            <Field
                                label="Your Club *"
                                name="club"
                                placeholder="Your Club"
                                options={options}
                                component={input.renderSelect}
                            />
                            <br/>
                            <Field
                                label="Weight *"
                                name="weight"
                                min={50}
                                max={140}
                                placeholder="Your weight"
                                component={input.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Favourite Quote"
                                name="quote"
                                placeholder="Your favourite quote..."
                                type="text"
                                component={input.renderField}
                            />
                            <br/>
                            <Field
                                label="About"
                                name="about"
                                component={input.renderTextField}
                            />
                            <br/>
                            <Field
                                label="Age *"
                                name="age"
                                component={input.renderDatepicker}
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

    if(!values.name){
        errors.name = "Enter your name";
    }
    if(!values.club){
        errors.club = "Select your Club";
    }
    if(!values.weight){
        errors.weight = "Weight is mandatory";
    }
    if(!values.age){
        errors.age = "Age is mandatory";
    }

    return errors;
}


function mapStateToProps(state, ownProps) {
    return {currentUser: state.currentUser,
        initialValues: state.currentUser.user
    };
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'updateUser',
    enableReinitialize : true
})(UpdateUser);

InitializeFromStateForm = connect(
    mapStateToProps,{updateUser}
)(InitializeFromStateForm);

export default InitializeFromStateForm;