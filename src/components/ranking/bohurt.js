import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import { Header, Image, Container } from 'semantic-ui-react'
import { Table } from 'reactstrap';


class Total extends Component{
    render(){
        return(
                <Table responsive inverse>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Fighter</th>
                        <th>Fights</th>
                        <th>Won</th>
                        <th>Down</th>
                        <th>Last Man</th>
                        <th>Ratio</th>
                        <th>Suicide</th>
                        <th>Points</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            <Header as='h4' image>
                            <Image src='/assets/images/avatar/small/lena.png' shape='rounded' size='mini' />
                            <Header.Content>
                                Lena
                                <Header.Subheader>Human Resources</Header.Subheader>
                            </Header.Content>
                            </Header>
                        </td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>

                    </tr>

                    </tbody>
                </Table>




        )
    }
}

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,mapDispatchToProps)(Total);