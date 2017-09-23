import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { userHelper } from '../../helpers/user';
import { Header, Image, Table } from 'semantic-ui-react'
import UpdateBohurt from './updates/bohurt';
import _ from 'lodash';
import {Link} from 'react-router-dom';



class Bohurt extends Component{
    constructor(props){
        super(props);

    }

    renderRows(){
        const { admin, clubAdmin } = this.props.currentUser;
        return _.map(this.props.fighters,(fighter) => {
            return(
                <Table.Row key={fighter.id}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={userHelper.getImage(fighter)} shape='rounded' size='mini' />
                            <Header.Content>
                                <Link to={`/profile/${fighter.id}`}> {fighter.name}</Link>
                                <Header.Subheader>{fighter.club.name}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.bohurtTable.won}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.bohurtTable.down}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.bohurtTable.lastMan}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        { userHelper.ratioBohurt(fighter) }%
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.bohurtTable.suicide}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.bohurtTable.points}
                    </Table.Cell>
                    { (clubAdmin === fighter.club.id || admin) &&
                    <Table.Cell width="1" >
                        <UpdateBohurt events={this.props.events} fighter={fighter}/>
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
                        <span className="text-green">2pts</span> - Won and standing |
                        <span className="text-green">1pt</span> - Last man standing |
                        <span className="text-red">-3pts</span> - Suicide
                    </p>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Fighter</Table.HeaderCell>
                            <Table.HeaderCell width="1">Win</Table.HeaderCell>
                            <Table.HeaderCell width="1">Down</Table.HeaderCell>
                            <Table.HeaderCell width="1">Standing</Table.HeaderCell>
                            <Table.HeaderCell width="1">Ratio</Table.HeaderCell>
                            <Table.HeaderCell width="1">Suicide</Table.HeaderCell>
                            <Table.HeaderCell width="1">Points</Table.HeaderCell>
                            { (clubAdmin || admin) &&
                            <Table.HeaderCell width="1">Update</Table.HeaderCell>
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

export default connect(mapStateToProps,mapDispatchToProps)(Bohurt);