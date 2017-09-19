import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Header,List, Image, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Select } from 'semantic-ui-react';
import _ from 'lodash';
import InputRange from 'react-input-range';
import DatePicker from 'material-ui/DatePicker';
import {updateUser} from '../../../actions';



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

    renderSlider(field){
        return(
            <div>
                <label>{ field.label }</label>
                <InputRange
                    maxValue={field.max}
                    minValue={field.min}
                    { ...field.input }
                />
            </div>
        );
    }

    renderTextField(field){
        const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{ field.label }</label>
                <textarea
                    className="form-control"
                    { ...field.input }
                ></textarea>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    }

    renderDatepicker(field){
        console.log(field);
        return(
            <DatePicker onChange={(event, date) => field.input.onChange(date)} name={field.input.name} value={field.input.value} hintText={field.label} autoOk={true} openToYearSelection={true} />
        )
    }

    renderSelect(field){
        return(
            <div>
                <Select { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} placeholder={field.placeholder} value={field.input.value} options={field.options}/>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        )
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){

        const handleSubmit = this.props.handleSubmit;

        const options = [
            {key:'white-company' , value:'White Company', flag:'gb', text:'White Company'},
            {key:'uk-federation' , value:'UK Federation', flag:'gb', text:'UK Federation'}
        ];

        return(

            <Modal size="mini" open={this.state.modalOpen}  onClose={this.handleClose} trigger={<button type="button" onClick={this.handleOpen}>Personal Info </button>}>
                <Modal.Header>Info</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Your Name"
                                name="name"
                                placeholder="Your name"
                                component={this.renderField}
                            />
                            <br/>
                            <Field
                                label="Your Club"
                                name="club"
                                placeholder="Your Club"
                                options={options}
                                component={this.renderSelect}
                            />
                            <br/>
                            <Field
                                label="Weight"
                                name="weight"
                                min={50}
                                max={140}
                                placeholder="Your weight"
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Favourite Quote"
                                name="quote"
                                placeholder="Your favourite quote..."
                                component={this.renderField}
                            />
                            <br/>
                            <Field
                                label="About"
                                name="about"
                                component={this.renderTextField}
                            />
                            <br/>
                            <Field
                                label="age"
                                name="age"
                                component={this.renderDatepicker}
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



    return errors;
}


function mapStateToProps(state, ownProps) {
    return {currentUser: state.currentUser,
        initialValues: state.currentUser.user
    };
}

let InitializeFromStateForm = reduxForm({
    form: 'updateUser',
    enableReinitialize : true
})(UpdateUser);

InitializeFromStateForm = connect(
    mapStateToProps,{updateUser}
)(InitializeFromStateForm);

export default InitializeFromStateForm;