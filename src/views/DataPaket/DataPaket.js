import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
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
        const url = `${process.env.API_HOST}/kabiro/paket/rup/2018`;
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
        url: `${process.env.API_HOST}/kabiro/paket/rup/2018/start`,
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
    renderSwitch() {
        return (
          <div>
            <Label className="switch switch-text switch-primary">
              <Input type="checkbox" className="switch-input" defaultChecked/>
              <span className="switch-label" data-on="On" data-off="Off"></span>
              <span className="switch-handle"></span>
            </Label>
          </div>
        );
    }

    renderSwitchJS(on, off) {
      return `
        <div>
          <label class="switch switch-text switch-primary  form-control-label">
            <input type="checkbox" class="switch-input form-check-input" checked/>
            <span class="switch-label" data-on="${on}" data-off="${off}"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      `
  }
    render() {
        const self = this
        const urlKabiro = `${process.env.API_HOST}/kabiro/paket/rup/2018`;
        const urlKabag = `${process.env.API_HOST}/kabag/paket/spse/2018`;

        const columnKabiro = [
            { "data": "id" },
            { "data": "nama_paket" },
            { "data": "jenis_pekerjaan" },
            { "data": "lokasi_pekerjaan" },
            { "data": "pagu_paket" },
            { "data": "tahun_anggaran" },
            { "data": "unit_eselon1" }
         ];
         const columnKabag = [
            { // check
                'targets': 0,
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center select-checkbox',
                'render': function (data, type, full, meta){
                    return '<input type="checkbox">';
                }
            },
            { "data": "id" },
            { "data": "paket_id" },
            { "data": "nama_paket" },
            { "data": "nomor_kontrak" },
            { "data": "jenis_pekerjaan" },
            { "data": "lokasi_pekerjaan" },
            { "data": "pagu_paket" },
            { "data": "tahun_anggaran" },
            { "data": "unit_eselon1" },
            { // toggle
              'targets': 0,
              'searchable': false,
              'orderable': false,
              'className': 'dt-body-center',
              'render': function (data, type, full, meta){
                  return self.renderSwitchJS('On', 'Off');
              }
          },
         ];
        const dt = {
            "ajax": {
               'url': this.isKabiro() ? urlKabiro : urlKabag,   
               'type': 'GET',
               'beforeSend': function (request) {
                   request.setRequestHeader("Authorization", Cookies.get('token'))
               },
           },
           "columnDefs": [ {
                "orderable": false,
                "className": "select-checkbox",
                "targets":   0
            } ],
            "select": {
                "style":    "os",
                "selector": "td:first-child"
            },
            "columns": this.isKabiro() ? columnKabiro : columnKabag,
         }
         const kabiroHeader = ["ID", "Nama Paket", "Jenis Pekerjaan", "Lokasi Pekerjaan", "Pagu Paket", "Tahun Anggaran", "Unit Eselon I"]
         const kabagHeader = ["check", "ID", "ID Paket", "Nama Paket", "Nomor Kontrak", "Jenis Pekerjaan", "Lokasi Pekerjaan", "Pagu Paket", "Tahun Anggaran", "Unit Eselon I", "Jenis Paket"]
        return (
            <div className="animated fadeIn">
                <h1>{this.isKabiro() ? 'Data Paket RUP Tahun 2018' : 'Data Paket SPSE Tahun 2018'}</h1>
                <DataTbl data={dt} dataHeader={this.isKabiro() ? kabiroHeader : kabagHeader}>
                </DataTbl>
                { this.isKabag() &&
                <div>
                    test render button {this.renderSwitch()}
                </div>}
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