import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header,List, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Select } from 'semantic-ui-react';
import {updateAchievement} from '../../../actions/ranking';
import _ from 'lodash';


class UpdateAchievement extends Component{
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }
    renderSelect(field){
        return(
            <div>
                <Select { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} value={field.input.value} placeholder={field.placeholder} options={field.options}/>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    }

    onSubmit(values){
        values.user_id = this.props.currentUser.user.id;
        this.props.updateAchievement(values,this.props.achievement.id);
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const handleSubmit = this.props.handleSubmit;

        const categories = [
            { key:'Bohurt', value:'Bohurt',text:'Bohurt'},
            { key:'10v10', value:'10v10',text:'10v10'},
            { key:'16v16', value:'16v16',text:'16v16'},
            { key:'21v21', value:'21v21',text:'21v21'},
            { key:'Sword&Shield', value:'Sword&Shield',text:'Sword&Shield'},
            { key:'Sword&Buckler', value:'Sword&Buckler',text:'Sword&Buckler'},
            { key:'Polearm', value:'Polearm',text:'Polearm'},
            { key:'Longsword', value:'Longsword',text:'Longsword'},
            { key:'Triathlon', value:'Triathlon',text:'Triathlon'},
            { key:'Profight', value:'Profight',text:'Profight'}

        ];

        const places = [
            { key:'1st', value:'1st',text:'1st'},
            { key:'2nd', value:'2nd',text:'2nd'},
            { key:'3rd', value:'3rd',text:'3rd'}
        ];

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
                                component={this.renderSelect}
                            />
                            <br/>
                            <Field
                                name="place"
                                placeholder="Place"
                                options={places}
                                component={this.renderSelect}
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



    return errors;
}


function mapStateToProps(state, ownProps) {
    return {currentUser: state.currentUser,
        initialValues: {
            category:ownProps.achievement.category,
            place:ownProps.achievement.place
        }
    };
}

let InitializeFromStateForm = reduxForm({
    form: 'updateAchievement',
    enableReinitialize : true
})(UpdateAchievement);

InitializeFromStateForm = connect(
    mapStateToProps,
    { updateAchievement}
)(InitializeFromStateForm);

export default InitializeFromStateForm;