import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image, Table } from 'semantic-ui-react'
import { user } from '../../helpers/user';


class Triathlon extends Component{
    renderRows(){
        return this.props.fighters.map((fighter) => {
            return(
                <Table.Row key={fighter.id}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={user.getImage(fighter)} shape='rounded' size='mini' />
                            <Header.Content>
                                {fighter.name}
                                <Header.Subheader>White Company</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.triathlonTable.win}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.triathlonTable.loss}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {fighter.triathlonTable.points}
                    </Table.Cell>
                </Table.Row>
            )
        });
    }

    render(){
        return(
            <div>
                <Table celled inverted selectable unstackable>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Fighter</Table.HeaderCell>
                            <Table.HeaderCell width="1">Win</Table.HeaderCell>
                            <Table.HeaderCell width="1">Lost</Table.HeaderCell>
                            <Table.HeaderCell width="1">Points</Table.HeaderCell>
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
    return { };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(Triathlon);