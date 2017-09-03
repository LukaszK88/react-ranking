import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import Login from '../../auth/login';
import {logout} from '../../../actions';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import DropdownMenu from 'react-dd-menu';



class NavbarComp extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isMenuOpen: false
        };
        this.click = this.click.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.close = this.close.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close() {
        this.setState({ isMenuOpen: false });
    }

    click() {
        console.log('You clicked an item');
    }

    logout() {
        console.log('logout');
        this.props.logout();
    }

    renderLoggedIn(){
        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <Button type="button" onClick={this.toggleDropdown}>{this.props.currentUser.user.username} <i className="fa fa-chevron-down"></i></Button>,
            align: 'right'
        };

        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/ranking">Ranking</Link>
                </li>
                <DropdownMenu {...menuOptions}>
                    <li><a href="#">Profile</a></li>
                    <li><button type="button" onClick={this.click}>Personal Info</button></li>
                </DropdownMenu>

                <li className="nav-item">
                    <Button onClick={this.logout.bind(this)}>Logout</Button>
                </li>
            </ul>
        )
    }

    renderLoggedOut(){
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/ranking">Ranking</Link>
                </li>
                <li className="nav-item">
                    <Login/>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Sign Up</a>
                </li>
            </ul>
        )
    }

    render(){

        return(
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button onClick={this.toggle} className="navbar-toggler navbar-toggler-right" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Navbar</a>

                <div className={(!this.state.isOpen ? 'collapse' : '') + ' navbar-collapse'}>
                    { this.props.currentUser.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, );
}

export default connect(mapStateToProps,{logout})(NavbarComp);
