import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Header, Image, Table } from 'semantic-ui-react'

class Profight extends Component{
    render(){
        return(
            <div>
                <Table celled inverted selectable unstackable>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width="1">Fighter</Table.HeaderCell>
                            <Table.HeaderCell width="1">Win</Table.HeaderCell>
                            <Table.HeaderCell width="1">KO</Table.HeaderCell>
                            <Table.HeaderCell width="1">Lost</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC I</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC II</Table.HeaderCell>
                            <Table.HeaderCell width="1">FC III</Table.HeaderCell>
                            <Table.HeaderCell width="1">Points</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src='/assets/images/avatar/small/lena.png' shape='rounded' size='mini' />
                                    <Header.Content>
                                        Lena
                                        <Header.Subheader>Human Resources</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell width="1" >
                                22
                            </Table.Cell>
                            <Table.Cell width="1" >
                                22
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src='/assets/images/avatar/small/matthew.png' shape='rounded' size='mini' />
                                    <Header.Content>
                                        Matthew
                                        <Header.Subheader>Fabric Design</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                15
                            </Table.Cell>
                            <Table.Cell width="1" >
                                22
                            </Table.Cell>
                        </Table.Row>
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

export default connect(mapStateToProps,mapDispatchToProps)(Profight);