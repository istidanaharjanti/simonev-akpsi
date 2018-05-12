import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import DataPaket from '../../views/DataPaket/';
import KPAList from '../../views/KPA/';
import Cookies from 'js-cookie';
import PJFungsionalList from '../../views/PejabatFungsional/';
import PPKList from '../../views/PPK/';
import DetailPaket from '../../views/DetailPaket/';

class Full extends Component {
  render() {
    var cookies = Cookies.get('userSession');
    if (typeof cookies !== 'undefined') {
      cookies = JSON.parse(cookies)
    } 
    return (
      <div className="app">
        <Header {...this.props}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                {typeof cookies.data.jabatan !== 'undefined' && (cookies.data.jabatan === 'kabag' || cookies.data.jabatan === 'kabiro') &&
                <Route path="/data-paket" name="Data Paket" component={DataPaket}/>
                }
                {typeof cookies.data.jabatan !== 'undefined' && cookies.data.jabatan === 'kpa' &&
                <Route path="/data-paket" name="Data Paket" component={KPAList}/>
                }
                {typeof cookies.data.jabatan !== 'undefined' && cookies.data.jabatan === 'pejabatf' &&
                  <Route path="/data-paket" name="Data Paket" component={PJFungsionalList}/>
                }
                {typeof cookies.data.jabatan !== 'undefined' && cookies.data.jabatan === 'ppk' &&
                  <Route path="/data-paket" name="Data Paket" component={PPKList}/>
                }
                {typeof cookies.data.jabatan !== 'undefined' && cookies.data.jabatan !== 'kabiro' &&
                  <Route path="/detail-paket-:id" name="Detail Paket" component={DetailPaket}/>
                }
                {/* <Route path="/data-paket" name="Data Paket" component={DataPaket}/> */}
                {/* <Route path="/data-paket-kpa" name="Data Paket" component={KPAList}/> */}
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
