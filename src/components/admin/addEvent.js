import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {addEvent} from '../../actions/events';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../helpers/input';
import { config } from '../../config';

class AddEvent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tooltipOpen: false,
            value: 50
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onSubmit(values){
        values.user_id = this.props.currentUser.user.id;
        this.props.addEvent(values);
        this.handleClose();
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const eventTypes = _.map(this.props.eventTypes,(type) => {
            return {key:type.id,value:type.id,text:type.type}
        });

        const locations = _.map(config.select.locations,(location) => {
            return {key:location.name,value:location.countryCode,text:location.name,flag:location.countryCode}
        });

        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Button color={'black'}  onClick={this.handleOpen}>Add Event </Button>}>
                <Modal.Header>Add Event</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Event Title *"
                                name="title"
                                placeholder="Event Title"
                                type="text"
                                component={input.renderField}
                            />
                            <br/>
                            <Field
                                label="Event Type"
                                name="event_type_id"
                                placeholder="Select Event Type"
                                options={eventTypes}
                                component={input.renderSelect}
                            />
                            <br/>
                            <Field
                                label="Event Location"
                                name="location"
                                placeholder="Select Event Location"
                                options={locations}
                                component={input.renderSelect}
                            />
                            <br/>
                            <Field
                                label="Event Date"
                                name="date"
                                component={input.renderDatepicker}
                            />

                            <Button color={'black'} type="submit">Submit</Button>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "Event title is mandatory";
    }
    if(!values.location){
        errors.location = "Event location is mandatory";
    }
    if(!values.event_type_id){
        errors.event_type_id = "Type is mandatory";
    }
    if(!values.date){
        errors.date = "Event date is mandatory";
    }

    return errors;
}


function mapStateToProps(state, ownProps) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'addEventForm'
})(AddEvent);

InitializeFromStateForm = connect(
    mapStateToProps,{addEvent}
)(InitializeFromStateForm);

export default InitializeFromStateForm;