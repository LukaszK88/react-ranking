import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import InputRange from 'react-input-range';
import { Select } from 'semantic-ui-react'
import _ from 'lodash';

class UpdateBohurt extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
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

    renderSelect(field){
        return(
            <div>
                <Select { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} value={field.input.value} options={field.countryOptions}/>
            </div>
        )
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

    onSubmit(values){
        values.user_id = this.props.fighter.id;
        console.log(values);
        //this.props.history.push('/');
    }

    render(){
        const handleSubmit = this.props.handleSubmit;
        const countryOptions = _.map(this.props.events,event => {
            return {key:event.location};
        });

        //     [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'},
        //     { key: 'ag', value: 'ag', flag: 'ag', text: 'Argentina'}
        // ];

        console.log(countryOptions);
        return(
            <Modal size={'tiny'} trigger={<i className="fa fa-pencil-square-o"></i>}>
                <Modal.Header>Update {this.props.fighter.name}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Win"
                                name="won"
                                value={this.state.value}
                                max={20}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Last Man Standing"
                                name="last"
                                value={this.state.value}
                                max={10}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Down"
                                name="down"
                                value={this.state.value}
                                max={15}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Suicides"
                                name="suicide"
                                value={this.state.value}
                                max={10}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                name="event_id"
                                countryOptions={countryOptions}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default withRouter(reduxForm({validate:validate, form: 'updateBohurt'})(connect(null,mapDispatchToProps())(UpdateBohurt)));