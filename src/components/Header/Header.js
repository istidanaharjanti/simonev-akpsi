import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
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
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleNotif = this.toggleNotif.bind(this);
    this.state = {
      dropdownOpen: false,
      notifOpen: false,
      userData: {}
    };
  }
  
  componentDidMount() {
    const sessionCookie = Cookies.get('userSession');
    if(sessionCookie) {
      this.setState({
        userData: JSON.parse(sessionCookie)
      });
    }
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
    Cookies.remove('token');
    Cookies.remove('userSession');
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
                <i className="fa fa-user"></i>
                <span className="d-md-down-none">
                  {this.state.userData && this.state.userData.data && this.state.userData.data.nama}
                </span>
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
                   { !Cookies.get('token') && <Redirect to="/" /> }
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    )
  }
}

export default Header;
