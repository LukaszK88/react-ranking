import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image, Table } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import UpdatePolearm from './updates/polearm';
import _ from 'lodash';

class Polearm extends Component{
    renderRows(){
        const { admin } = this.props.currentUser;

        return _.map(this.props.fighters,(fighter) => {
            return(
                <Table.Row key={fighter.id}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={userHelper.getImage(fighter)} shape='rounded' size='mini' />
                            <Header.Content>
                                {fighter.name}
                                <Header.Subheader>White Company</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.polearmTable.win}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.polearmTable.loss}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.polearmTable.points}
                    </Table.Cell>
                    { admin &&
                    <Table.Cell width="1" >
                        <UpdatePolearm events={this.props.events} fighter={fighter}/>
                    </Table.Cell>
                    }
                </Table.Row>
            )
        });
    }

    render(){
        const { admin } = this.props.currentUser;
        return(
            <div>
                <Table celled inverted selectable unstackable>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Fighter</Table.HeaderCell>
                            <Table.HeaderCell width="1">Win</Table.HeaderCell>
                            <Table.HeaderCell width="1">Lost</Table.HeaderCell>
                            <Table.HeaderCell width="1">Points</Table.HeaderCell>
                            { admin &&
                            <Table.HeaderCell width="1"></Table.HeaderCell>
                            }
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { currentUser:state.currentUser };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(Polearm);