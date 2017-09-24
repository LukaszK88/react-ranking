import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal, List } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import {updateEvent} from '../../actions/events';
import _ from 'lodash';
import { Tooltip } from 'reactstrap';
import { input } from '../../helpers/input';
import { config } from '../../config';

class EditEvent extends Component{
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
        values.id = this.props.event.id;
        this.props.updateEvent(values);
        this.handleClose();
    }

    handleOpen = () => {
        this.props.dispatch(change('editEventForm','title',this.props.event.title));
        this.props.dispatch(change('editEventForm','location',this.props.event.location));
        this.props.dispatch(change('editEventForm','date',new Date(this.props.event.date)));
        this.setState({ modalOpen: true });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    render(){

        const locations = _.map(config.select.locations,(location) => {
            return {key:location.name,value:location.countryCode,text:location.name,flag:location.countryCode}
        });

        const handleSubmit = this.props.handleSubmit;

        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<List.Icon onClick={this.handleOpen} size="large" name="edit"/>}>
                <Modal.Header>Edit Event</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Event Title *"
                                name="title"
                                placeholder="Event Title"
                                type="text"
                                value="kkk"
                                component={input.renderField}
                            />
                            <br/>
                            <p>{this.props.event.event_type.type}</p>
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
    if(!values.date){
        errors.date = "Event date is mandatory";
    }

    return errors;
}


function mapStateToProps(state) {
    return { currentUser:state.currentUser};
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'editEventForm'
})(EditEvent);

InitializeFromStateForm = connect(
    mapStateToProps,{updateEvent}
)(InitializeFromStateForm);

export default InitializeFromStateForm;