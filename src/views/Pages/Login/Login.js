import React, {Component} from "react";
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
// import { createStore } from 'redux';

// import reducers from '../../../reducers';
import { usernameChanged, passwordChanged, setToken } from '../../../actions';

import { Redirect } from 'react-router-dom';
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

let username;
let password;
let saveToken;

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    
    this.state = {
      username: '',
      password: ''
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  };

  componentDidMount() {
    saveToken = this.props.setToken
  }

  componentDidUpdate() {
    username = this.state.username
    password = this.state.password
    console.log(username, password)
  };

  handleUserName(event) {
    this.setState({ username: event.target.value });
  };
  
  handlePassword(event){
    this.setState({ password: event.target.value });
  }

  loginFunc() {
    const url = 'https://f49c66f7-f1a9-49d2-8969-9e51d8d22382.mock.pstmn.io/login';
    const data = {
      username: username,
      password: password
    };
    axios({
      url,  
      method: 'POST',
      header: {
       'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data)
    }).then((response) => {
      console.log('response', response);
      saveToken(response.data.token);
    }).catch((e) => {
      alert(e);
    });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sistem Monev Kemenkeu</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUserName} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.loginFunc}>Login</Button>
                        { this.props.currentToken !== '' && <Redirect from="/" to="/dashboard" /> }
                        {/* </Redirect> */}
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { username, password, currentToken } = state.auth;

  return { username, password, currentToken };
};

export default connect(mapStateToProps, { usernameChanged, passwordChanged, setToken })(LoginComponent);
