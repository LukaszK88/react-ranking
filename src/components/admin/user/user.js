import React,{Component} from 'react';
import { connect } from 'react-redux'
import FlashMessages from './../../helpers/message';
import {fetchUsersAdmin} from '../../../actions/admin';
import NavbarComp from '../../home/partials/navbar';
import { List,Image, Card, Radio, Button } from 'semantic-ui-react'
import _ from 'lodash';
import {userHelper} from '../../../helpers/user';


class AdminUsers extends Component{
    constructor(){
        super();

        this.state = {
            toggleUsers:false
        }
    }
    componentDidMount(){
        this.props.fetchUsersAdmin();
    }

    renderUnauthorisedUsers(){
        return _.map(this.props.users.unauthorised, (unauthorised) => {
            return(
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Image floated='right' size='mini' src={userHelper.getImage(unauthorised)} />
                        <Card.Meta>
                            {unauthorised.username}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>Approve</Button>
                            <Button basic color='red'>Decline</Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
            )
        })
    }

    renderBlockedUsers(){
        return _.map(this.props.users.blocked, (blocked) => {
            return(
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src={userHelper.getImage(blocked)} />
                            <Card.Meta>
                                {blocked.username}
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>Approve</Button>
                                <Button basic color='red'>Decline</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group>
            )
        })
    }

    render(){
        return(
            <div>
                <FlashMessages/>
                <NavbarComp/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Card fluid>
                                <Card.Content>
                                    <div className="row">
                                        <div className="col-md-12 align-content-center">
                                             <div className="toggle-help" ><Radio onClick={} toggle /> Show blocked</div>
                                        </div>
                                    </div>
                                    {this.renderUnauthorisedUsers()}
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { users:state.admin };
}

export default connect(mapStateToProps,{fetchUsersAdmin})(AdminUsers);