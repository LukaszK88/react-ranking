import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Container, Row, Col } from 'reactstrap';
import  NavbarComp from '../home/partials/navbar';
import Total from './total';
import Bohurt from './bohurt';
import SwordShield from './swordShield';
import Profight from    './profight';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Button } from 'semantic-ui-react'


class TabsComp extends Component{
    constructor(props) {
        super(props);
        this.state = {open: false};

        this.state.category = 'total';
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    setCategory = (category) => {
        console.log(category);
        this.state.category = category;
    };

    render(){

        return(
            <div>
                <NavbarComp/>
                <Container className="top-section" >
                    <div>
                        <Button className="float-right" secondary onClick={this.handleToggle}>Category</Button>
                        {this.state.category == 'total' &&
                            <Total/>
                        }
                        {this.state.category == 'bohurt' &&
                            <Bohurt/>
                        }
                        {this.state.category == 'profight' &&
                            <Profight/>
                        }
                        {this.state.category == 'swordShield' &&
                            <SwordShield/>
                        }


                        <Drawer
                            containerStyle={{backgroundColor:'black'}}
                            docked={false}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}
                        >
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('total')}}  >Total</MenuItem>
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('leaderboard')}} >LeaderBoard</MenuItem>
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('bohurt')}}  >Bohurt</MenuItem>
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('profight')}} >Profight</MenuItem>
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('swordShield')}} >Sword & Shield</MenuItem>
                            <MenuItem onClick={() => {this.handleClose(); this.setCategory('longsword')}} >Longsword</MenuItem>
                        </Drawer>
                    </div>
                </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(TabsComp);