import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DataTbl } from '../../datatables';

class DataPaket extends Component {
    constructor() {
        super();
        this.state = {
            dataSet: {},
            userData: {},
            confirmModal: false,
            successModal: false
        }
    this.toggleAccept = this.toggleAccept.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.startRUP = this.startRUP.bind(this);
    this.getRUPdata = this.getRUPdata.bind(this);
    }
    componentWillMount(){
        const sessionCookie = Cookies.get('userSession');
        if(sessionCookie) {
          this.setState({
            userData: JSON.parse(sessionCookie)
          });
        }
    }
    componentDidMount() {
        const isKabiro = this.isKabiro();
        if(isKabiro) {
            this.getRUPdata();
        }
    }
    getRUPdata() {
        const self = this;
        const url = 'http://localhost:2018/kabiro/paket/rup/2018';
        const token = Cookies.get('token');
        console.log(token)
        axios({
          url,
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          }).then((response) => {
          self.setState({
            dataSet: response.data
          })
          }).catch((e) => {
            alert(e);
        });
      }
    isKabag() {
      if (this.state.userData && this.state.userData.data){
        if(this.state.userData.data.jabatan === 'kabag'){
         return true;
        } else {
          return false;
        }
      }
    }
    isKabiro() {
      if (this.state.userData && this.state.userData.data){
        if(this.state.userData.data.jabatan === 'kabiro'){
        return true;
        } else {
        return false;
        }
      }
    }
    toggleAccept() {
      this.setState({
        confirmModal: !this.state.confirmModal
      });
    }
    toggleSuccess() {
      this.setState({
        successModal: false,
      });
      window.location.reload();
    }
    startRUP() {
      const self = this;
      axios({
        url: 'http://localhost:2018/kabiro/paket/rup/2018/start',
        method: 'post',
        headers: {
          'Authorization': Cookies.get('token')
        }
      }).then((res) => {
        self.setState({
          successModal: true
        })
      }).catch((e) => {
        alert(e);
      })
    }
    render() {
        const urlKabiro = "http://localhost:2018/kabiro/paket/rup/2018";
        const urlKabag = "http://localhost:2018/kabag/paket/spse/2018";
        const dt = {
            "ajax": {
               'url': this.isKabag() ? urlKabag : urlKabiro,   
               'type': 'GET',
               'beforeSend': function (request) {
                   request.setRequestHeader("Authorization", Cookies.get('token'))
               },
           },
            "columns": [
               { "data": "id" },
               { "data": "nama_paket" },
               { "data": "jenis_pekerjaan" },
               { "data": "lokasi_pekerjaan" },
               { "data": "pagu_paket" },
               { "data": "tahun_anggaran" },
               { "data": "unit_eselon1" }
            ]
         }
         const dtHeader = ["ID", "Nama Paket", "Jenis Pekerjaan", "Lokasi Pekerjaan", "Pagu Paket", "Tahun Anggaran", "Unit Eselon I"]
        return (
            <div className="animated fadeIn">
                <h1>Data Paket RUP Tahun 2018</h1>
                <DataTbl data={dt} dataHeader={dtHeader}>
                </DataTbl>
                { this.isKabiro() && 
                <div>
                <Button size="lg" color="primary" onClick={this.toggleAccept} style={{float:'right', marginTop: '3%', fontWeight: 'bold'}}>Mulai Monev 2018!</Button>
                <Modal isOpen={this.state.confirmModal} toggle={this.toggleAccept}>
                    <ModalHeader toggle={this.toggleAccept}>Konfirmasi Kegiatan</ModalHeader>
                    <ModalBody>
                       Anda yakin ingin memulai kegiatan monitoring dan evaluasi tahun 2018?<br/>
                       Anda tidak dapat membatalkan jika sudah memilih ya.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.startRUP}>Tentu</Button>{' '}
                      <Button color="secondary" onClick={this.toggleAccept}>Tidak</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.successModal} toggle={this.toggleSuccess}>
                    <ModalHeader toggle={this.toggleSuccess}>Kegiatan Dimulai</ModalHeader>
                    <ModalBody>
                       Kegiatan Monitoring dan Evaluasi Tahun 2018 berhasil dimulai!
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.toggleSuccess}>OK</Button>
                    </ModalFooter>
                </Modal>
                </div>
                }
            </div>
        );
    };
}

export default DataPaket;