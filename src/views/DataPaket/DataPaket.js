import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Row,
    Col,
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label } from 'reactstrap';
import { DataTbl } from '../../datatables';

let dataRup;
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
    componentDidUpdate(){
      console.log(dataRup);
    }
    getRUPdata() {
        const self = this;
        const url = `${process.env.API_HOST}/kabiro/paket/rup/2018`;
        const token = Cookies.get('token');
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
          dataRup = this.state.dataSet;
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
        url: `http://localhost:2018/kabiro/paket/rup/2018/start`,
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

    renderSwitchJS(on, off) {
      return `
        <div>
          <label class="switch switch-text switch-primary  form-control-label">
            <input type="checkbox" class="switch-input form-check-input" checked/>
            <span class="switch-label" data-on="${on}" data-off="${off}"></span>
            <span class="switch-handle"></span>
          </label>
        </div>`
    }
    convertCurrency(val, options = {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }) {
        const convertedNum = new Intl.NumberFormat(['id'], options).format(Number(val));
        return convertedNum;
    }
    render() {
        const self = this
        const urlKabiro = `http://localhost:2018/kabiro/paket/rup/2018`;
        const urlKabag = `http://localhost:2018/kabag/paket/spse/2018`;

        const columnKabiro = [
            { "data": "id" },
            { "data": "nama_paket" },
            { "data": "jenis_pekerjaan" },
            { "data": "lokasi_pekerjaan" },
            { "data": "pagu_paket",
              "render": function (data, type, full, meta){
                return self.convertCurrency(data)
              }
            },
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
            { "data": "nama_paket"},
            { "data": "nomor_kontrak"},
            { "data": "jenis_pekerjaan" },
            { "data": "lokasi_pekerjaan" },
            { "data": "pagu_paket",
              "render": function (data, type, full, meta){
                return self.convertCurrency(data)
              }
            },
            { "data": "tahun_anggaran" },
            { "data": "unit_eselon1" },
            { // toggle
              'targets': 0,
              'searchable': false,
              'orderable': false,
              'className': 'dt-body-center',
              'render': function (data, type, full, meta){
                  return self.renderSwitchJS('M', 'E');
              }
          },
         ];
        const dt = {
            ajax: {
               'url': this.isKabiro() ? urlKabiro : urlKabag,   
               'type': 'GET',
               'beforeSend': function (request) {
                   request.setRequestHeader("Authorization", Cookies.get('token'))
               },
           },
            columns: this.isKabiro() ? columnKabiro : columnKabag,
            scrollX: true
         }
         const kabiroHeader = ["No.", "Nama Paket", "Jenis Pekerjaan", "Lokasi Pekerjaan", "Pagu Paket", "Tahun Anggaran", "Unit Eselon I"]
         const kabagHeader = ["test", "No.", "ID Paket", "Nama Paket", "Nomor Kontrak", "Jenis Pekerjaan", "Lokasi Pekerjaan", "Pagu Paket", "Tahun Anggaran", "Unit Eselon I", "Jenis Paket"]
        return (
            <div className="animated fadeIn">
                <h1>{this.isKabiro() ? 'Data Paket RUP Tahun 2018' : 'Data Paket SPSE Tahun 2018'}</h1>
                { this.isKabag() &&
                <Row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="worktype">Filtered by Jenis Pekerjaan</Label>
                        <Input type="select" name="worktype" id="worktype">
                          <option value="1">1</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <Row>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="ccnumber">Filter by Nilai Pagu</Label>
                            <Input type="text" id="min" placeholder="min nilai"/>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="ccnumber">&nbsp;</Label>
                            <Input type="text" id="max" placeholder="max nilai"/>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                          <Button style={{marginTop: '19%', width:'50%'}} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                          <Button style={{marginTop: '19%', width:'50%'}} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                        </Col>
                      </Row>
                    </Col>
                </Row>
                }
                <DataTbl data={dt} dataHeader={this.isKabiro() ? kabiroHeader : kabagHeader}>
                </DataTbl>
                { this.isKabag() &&
                <div>
                    test
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