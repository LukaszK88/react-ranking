import React,{Component} from 'react';
import { connect } from 'react-redux'
import { userHelper } from '../../helpers/user';
import { Header, Image, Table} from 'semantic-ui-react'
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Pagination from './pagination';

class Total extends Component{

    renderRows(){
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
                    <Pagination fighters={this.props.fighters}/>
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