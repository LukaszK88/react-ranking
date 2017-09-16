import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Select } from 'semantic-ui-react';
import { fetchEvents } from '../../../actions/events'
import {addAchievement} from '../../../actions/ranking';
import _ from 'lodash';


class AddAchievement extends Component{

    componentDidMount(){
        this.props.fetchEvents();
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
        console.log(values);


        this.props.addAchievement(values);

        // this.props.updateRanking(values,'bohurt');
        // this.setState({modalOpen:false});
    }

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

        const countryOptions = _.map(this.props.events,event => {
            return {key:event.location, value:event.id, flag:event.location, text: `${event.title} ${event.date.substring(0,4)}`};
        });
        return(
            <Modal size={'tiny'} trigger={<Button className="float-right">Add</Button>}>
                <Modal.Header>Add Achievement</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                            <Field
                                name="event_id"
                                placeholder="Select competition"
                                options={countryOptions}
                                component={this.renderSelect}
                            />
                            <br/>
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


function mapStateToProps(state) {
    return { events:state.events,
        currentUser: state.currentUser};
}


export default reduxForm({validate:validate, form: 'addAchievement'})(connect(mapStateToProps,{fetchEvents,addAchievement})(AddAchievement));