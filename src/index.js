import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Cookies from 'js-cookie';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
  // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'

// Containers
import Full from './containers/Full/'
import Login from './views/Pages/Login/Login'

const history = createBrowserHistory();

function requireAuth(nextState, replace) {
  if (!Cookies.get('token')) {
    replace({
      pathname: '/'
    })
  }
}

ReactDOM.render((
  <HashRouter history={history}>
    <Switch>
      <Route exact path="/" name="Login Page" component={Login} />
      <Route path="/dashboard" onEnter={requireAuth} name="Home" component={Full} />
      <Route path="/data-paket" onEnter={requireAuth} name="Data Paket" component={Full} />
      <Route path="/detail-paket-:id" onEnter={requireAuth} name="Detail Paket" component={Full} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));
