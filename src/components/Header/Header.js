import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  DropdownToggle
} from 'reactstrap';

import { setToken } from '../../actions';

let resetToken;
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleNotif = this.toggleNotif.bind(this);
    this.state = {
      dropdownOpen: false,
      notifOpen: false
    };
  }
  
  componentDidMount() {
    console.log('did', this.props);
    resetToken = this.props.setToken
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleNotif() {
    this.setState({
      notifOpen: !this.state.notifOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  logout() {
    console.log('props', this.props);
    console.log('rest', resetToken);
    // console.log(this.props.currentToken, this.props.userData);
    // this.props.setToken('');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <Dropdown isOpen={this.state.notifOpen} toggle={this.toggleNotif}>
              <DropdownToggle style={{backgroundColor: 'transparent', borderColor: 'transparent'}}>
                <i className="icon-bell"></i><Badge pill color="danger">5</Badge>
              </DropdownToggle>
              <DropdownMenu right className={this.state.notifOpen ? 'show' : ''} style={{width: 300}}>
                <DropdownItem header tag="div" className="text-center"><strong>Tanggal/Waktu hari ini</strong></DropdownItem>
                <DropdownItem>lalala</DropdownItem>
                <DropdownItem>Yeyeye</DropdownItem>
                <DropdownItem>Isti komen neh</DropdownItem>
                <DropdownItem header tag="div" className="text-center"><strong>2 Hari lalu</strong></DropdownItem>
                <DropdownItem>fafafa</DropdownItem>
                <DropdownItem>hahaha</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle" style={{paddingRight: 10}}>
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">admin</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
                <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>
                <Button color="link" onClick={this.logout}><i className="fa fa-lock"></i>Logout</Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentToken, userData } = state.auth;

  return { currentToken, userData };
};

export default connect(mapStateToProps, { setToken })(Header);
