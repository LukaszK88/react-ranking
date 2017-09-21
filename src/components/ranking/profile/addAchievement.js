import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { fetchEvents } from '../../../actions/events'
import {addAchievement} from '../../../actions/ranking';
import _ from 'lodash';
import { config } from '../../../config';
import { input } from '../../../helpers/input';


class AddAchievement extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }
    componentDidMount(){
        this.props.fetchEvents();
    }

    onSubmit(values){
        values.user_id = this.props.currentUser.user.id;
        this.props.addAchievement(values);
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){
        const handleSubmit = this.props.handleSubmit;

        const categories = config.select.categories;

        const places = config.select.places;

        const countryOptions = _.map(this.props.events,event => {
            return {key:event.location, value:event.id, flag:event.location, text: `${event.title} ${event.date.substring(0,4)}`};
        });
        return(
            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<Button onClick={this.handleOpen} className="float-right">Add</Button>}>
                <Modal.Header>Add Achievement</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                            <Field
                                name="event_id"
                                placeholder="Select competition"
                                options={countryOptions}
                                component={input.renderSelect}
                            />
                            <br/>
                            <Field
                                name="category"
                                placeholder="Category"
                                options={categories}
                                component={input.renderSelect}
                            />
                            <br/>
                            <Field
                                name="place"
                                placeholder="Place"
                                options={places}
                                component={input.renderSelect}
                            />
                            <br/>
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

    if(!values.event_id){
        errors.event_id = "You must select an event";
    }
    if(!values.category){
        errors.category = "You must select an category";
    }
    if(!values.place){
        errors.place = "You must select an place";
    }

    return errors;
}


function mapStateToProps(state) {
    return { events:state.events,
        currentUser: state.currentUser};
}


export default reduxForm({validate:validate, form: 'addAchievement'})(connect(mapStateToProps,{fetchEvents,addAchievement})(AddAchievement));