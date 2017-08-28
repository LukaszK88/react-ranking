import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Header, Image, Table } from 'semantic-ui-react'
import { user } from '../../helpers/user';
import { fetchLeaderboard } from '../../actions';

import _ from 'lodash';

class Leaderboard extends Component{

    componentDidMount() {
        this.props.fetchLeaderboard();
    }


    renderRows(){
        return _.map(this.props.leaderboard, row => {
            return(
                <Table.Row key={row.category}>
                    <Table.Cell>
                        <Header as='h4' image>
                            {/*<Image src={user.getImage(fighter)} shape='rounded' size='mini' />*/}
                            <Header.Content>
                                {row.name}
                                <Header.Subheader>White Company</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell width="2" >
                        {row.category}
                    </Table.Cell>
                    <Table.Cell width="1" >
                        {row.max_points}
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
                            <Table.HeaderCell width="2">Category</Table.HeaderCell>
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
    return {leaderboard: state.leaderboard };
}

export default connect(mapStateToProps,{fetchLeaderboard})(Leaderboard);