import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import  NavbarComp from '../home/partials/navbar';
import Total from './total';
import Leaderboard from './leaderboard';
import Bohurt from './bohurt';
import SwordShield from './swordShield';
import Profight from    './profight';
import SwordBuckler from    './swordBuckler';
import Longsword from    './longsword';
import Polearm from    './polearm';
import Triathlon from    './triathlon';
import { Button } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import { fetchFighters } from '../../actions/ranking';
import { fetchEvents } from '../../actions/events';


class TabsComp extends Component{
    constructor(props) {
        super(props);

        this.state = {tabs:[]};
    }
    componentDidMount(){
        this.props.fetchFighters();
        this.props.fetchEvents();
        this.state = {tabs:[
            { menuItem: 'Total', render: () => <Tab.Pane attached={false}><Total fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Leaderboard', render: () => <Tab.Pane attached={false}><Leaderboard/></Tab.Pane> },
            { menuItem: 'Bohurt', render: () => <Tab.Pane attached={false}><Bohurt events={this.props.events} fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Profight', render: () => <Tab.Pane attached={false}><Profight fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Sword & Shield', render: () => <Tab.Pane attached={false}><SwordShield fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Sword & Buckler', render: () => <Tab.Pane attached={false}><SwordBuckler fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Longsword', render: () => <Tab.Pane attached={false}><Longsword fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Polearm', render: () => <Tab.Pane attached={false}><Polearm fighters={this.props.fighters}/></Tab.Pane> },
            { menuItem: 'Triathlon', render: () => <Tab.Pane attached={false}><Triathlon fighters={this.props.fighters}/></Tab.Pane> },
        ]}
    }

    render(){
        if(!this.props.fighters){
            return <div>Loading...</div>;
        }
        return(
            <div>
                <NavbarComp/>
                <Container className="top-section" >
                    <Tab className="table-responsive-custom" menu={{ secondary: true, pointing: true }} panes={this.state.tabs} />
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighters: state.fighters,
        events: state.events
    };
}

export default connect(mapStateToProps,{fetchFighters,fetchEvents})(TabsComp);