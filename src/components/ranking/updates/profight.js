import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router-dom';
import InputRange from 'react-input-range';
import { Select } from 'semantic-ui-react';
import { updateRanking} from '../../../actions/ranking';
import _ from 'lodash';

class UpdateProfight extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    renderSelect(field){
        return(
            <div>
                <Select { ...field.input } selection onChange={(param,data) => field.input.onChange(data.value)} value={field.input.value} options={field.countryOptions}/>
                <div className="text-help">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
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
        this.props.updateRanking(values,'profight');
        this.setState({modalOpen:false});
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render(){
        const handleSubmit = this.props.handleSubmit;

        const countryOptions = _.map(this.props.events,event => {
            return {key:event.location, value:event.id, flag:event.location, text: `${event.title} ${event.date.substring(0,4)}`};
        });


        return(
                <Modal size={'tiny'}  open={this.state.modalOpen}  onClose={this.handleClose}  trigger={<i onClick={this.handleOpen} className="fa fa-pencil-square-o"></i>}>
                <Modal.Header>Update {this.props.fighter.name}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Win"
                                name="won"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="KO"
                                name="ko"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="Loss"
                                name="loss"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class I"
                                name="fc_1"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class II"
                                name="fc_2"
                                value={this.state.value}
                                max={1}
                                min={0}
                                onChange={value => this.setState({ value })}
                                component={this.renderSlider}
                            />
                            <br/>
                            <Field
                                label="First Class III"
                                name="fc_3"
                                value={this.state.value}
                                max={1}
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

    if(!values.event_id){
        errors.event_id = "You must select an event";
    }

    return errors;
}

export default withRouter(reduxForm({validate:validate, form: 'updateProfight'})(connect(null,{updateRanking})(UpdateProfight)));