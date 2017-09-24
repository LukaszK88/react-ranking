import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../helpers/message';
import NavbarComp from '../home/partials/navbar';
import { List, Card, Flag, Button } from 'semantic-ui-react'
import AddEvent from './addEvent';
import {getEventTypes,fetchEvents, deleteEvent} from '../../actions/events';
import _ from 'lodash';
import { stringHelper } from '../../helpers/string';
import EditEvent from './editEvent';

class Events extends Component{
    componentDidMount(){
        this.props.getEventTypes();
        this.props.fetchEvents();

    }

    deleteEvent(event){
        this.props.deleteEvent(event);
    }

    renderEventList(){

        return _.map(this.props.events.events,(event) => {
            return(
                <List.Item>
                    <List.Content floated='right'>
                        <EditEvent event={event}/>
                        <List.Icon onClick={() => this.deleteEvent(event)} size="large" name="delete"/>
                    </List.Content>
                    <List.Icon><Flag name={event.location} /></List.Icon>
                    <List.Content>
                        <List.Header as='a'>{event.title} {stringHelper.limitTo(event.date,10)}</List.Header>
                        <List.Description>Added by: <a><b>{event.user.username}</b></a> on: {stringHelper.limitTo(event.created_at,10)}</List.Description>
                    </List.Content>
                </List.Item>
            )
        });
    }

    render(){

        const {events, eventTypes} = this.props.events;

        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="float-right">
                                <AddEvent eventTypes={eventTypes}/>
                            </span>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                    <Card fluid >
                        <Card.Content>
                            <List divided verticalAlign="middle">
                                {this.renderEventList()}
                            </List>
                        </Card.Content>
                    </Card>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {events: state.events };
}



export default connect(mapStateToProps,{getEventTypes,fetchEvents,deleteEvent})(Events);