import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { userHelper } from '../../helpers/user';
import { Header, Image, Table, Container } from 'semantic-ui-react'
import _ from 'lodash';
import {Link} from 'react-router-dom';

class Total extends Component{

    renderRows(){
        return _.map(this.props.fighters,(fighter) => {
           return(
               <Table.Row key={fighter.id}>
                   <Table.Cell>
                       <Header as='h4' image>
                           <Image src={userHelper.getImage(fighter)} shape='rounded' size='mini' />
                           <Header.Content>
                               <Link to={`/profile/${fighter.id}`}>  {fighter.name} </Link>
                               <Header.Subheader>White Company</Header.Subheader>
                           </Header.Content>
                       </Header>
                   </Table.Cell>
                   <Table.Cell width="1" >
                       {fighter.total_points}
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
                            <Table.HeaderCell>Fighters</Table.HeaderCell>
                            <Table.HeaderCell width="1">Total Points</Table.HeaderCell>
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
    return {};
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators();
// }

export default connect(mapStateToProps)(Total);