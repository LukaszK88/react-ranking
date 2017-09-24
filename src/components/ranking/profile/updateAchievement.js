import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button,List, Modal } from 'semantic-ui-react';
import { Field, reduxForm,change } from 'redux-form';
import {updateAchievement} from '../../../actions/ranking';
import { config } from '../../../config';
import { input } from '../../../helpers/input';

class UpdateAchievement extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    onSubmit(values){
        values.user_id = this.props.currentUser.user.id;
        this.props.updateAchievement(values,this.props.achievement.id);
        this.setState({modalOpen:false});
    }

    handleOpen = () => {
        this.props.dispatch(change('updateAchievement','category',this.props.achievement.category));
        this.props.dispatch(change('updateAchievement','place',this.props.achievement.place));
        this.setState({ modalOpen: true });
    };

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const handleSubmit = this.props.handleSubmit;

        const categories = config.select.categories;

        const places = config.select.places;

        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<List.Icon onClick={this.handleOpen} size="large" name="edit"/>}>
                <Modal.Header>Update Achievement</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

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
                            <Button color={'black'}  type="submit">Update</Button>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.category){
        errors.category = "You must select an category";
    }
    if(!values.place){
        errors.place = "You must select an place";
    }

    return errors;
}


function mapStateToProps(state, ownProps) {
    return {currentUser: state.currentUser
    };
}

let InitializeFromStateForm = reduxForm({
    validate:validate,
    form: 'updateAchievement'
})(UpdateAchievement);

InitializeFromStateForm = connect(
    mapStateToProps,
    { updateAchievement}
)(InitializeFromStateForm);

export default InitializeFromStateForm;