import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image, Table } from 'semantic-ui-react'
import { userHelper } from '../../helpers/user';
import UpdateProfight from './updates/profight';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Pagination from './pagination';


class Profight extends Component{
    renderRows(){
        const { admin, clubAdmin } = this.props.currentUser;

        return _.map(this.props.fighters.data,(fighter) => {
            return(
                <Table.Row key={fighter.id}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={userHelper.getImage(fighter)} shape='rounded' size='mini' />
                            <Header.Content>
                                <Link to={`/profile/${fighter.id}`}>  {fighter.name} </Link>
                                <Header.Subheader>{fighter.club.name}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.win}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.ko}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.loss}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.fc1}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.fc2}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.fc3}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.profightTable.points}
                    </Table.Cell>
                    { (clubAdmin === fighter.club.id || admin) &&
                    <Table.Cell width="1" >
                        <UpdateProfight events={this.props.events} fighter={fighter}/>
                    </Table.Cell>
                    }
                </Table.Row>
            )
        });
    }

    render(){
        const { admin, clubAdmin } = this.props.currentUser;

        return(
            <div>
                <Table className="table-responsive-custom" celled inverted selectable unstackable>
                    <p className="category-points">
                        <span className="text-green">4pts</span> - KO |
                        <span className="text-green">3pts</span> - Win |
                        <span className="text-green">1pt</span> - Lost |
                        <span className="text-green">10pts</span> - FC I Win |
                        <span className="text-green">6pts</span> - FC II Win |
                        <span className="text-green">3pts</span> - FC III Win
                    </p>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Fighter</Table.HeaderCell>
                            <Table.HeaderCell width="1">Win</Table.HeaderCell>
                            <Table.HeaderCell width="1">KO</Table.HeaderCell>
                            <Table.HeaderCell width="1">Lost</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC I</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC II</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC III</Table.HeaderCell>
                            <Table.HeaderCell width="1">Total Points</Table.HeaderCell>
                            { (clubAdmin || admin) &&
                                <Table.HeaderCell width="1">Update</Table.HeaderCell>
                            }
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                    <Pagination fighters={this.props.fighters}/>

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

export default connect(mapStateToProps,mapDispatchToProps)(Profight);