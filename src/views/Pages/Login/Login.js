import React, {Component} from "react";
import axios from 'axios';
import qs from 'qs';
// import { Provider, connect } from 'react-redux';
// import { createStore } from 'redux';

// import reducers from '../../../reducers';
// import { usernameChanged, passwordChanged } from '../../../actions';

import { Link } from 'react-router-dom';
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

let username;
let password;

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: ''
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  };

  componentDidUpdate() {
    username = this.state.username
    password = this.state.password
  };

  handleUserName(event) {
    this.setState({ username: event.target.value });
    // this.props.usernameChanged(text);
  };
  
  handlePassword(event){
    this.setState({ password: event.target.value });
    // this.props.passwordChanged(text);
  }

  loginFunc() {
    const url = 'http://localhost:2018/login';
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
      console.log(response);
    }).catch((e) => {
      alert(e);
    });
  };

  render() {
    return (
      // <Provider store={createStore(reducers)}>
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
                          {/* <Link to="/dashboard"> */}
                          <Button color="primary" className="px-4" onClick={this.loginFunc}>Login</Button>
                          {/* </Link> */}
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
      // </Provider>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     username: state.auth.username,
//     password: state.auth.password
//   }
// };

// export default connect(mapStateToProps, { usernameChanged, passwordChanged })(Login);
export default Login;
