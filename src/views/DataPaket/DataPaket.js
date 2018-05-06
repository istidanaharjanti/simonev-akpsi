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

class DataPaket extends Component {
    constructor(props) {
        super(props);
        const sessionCookie = JSON.parse(Cookies.get('userSession'))
        const userData = sessionCookie.data ? sessionCookie.data : {}
        this.state = {
            dataSet: [],
            userData,
            tipePekerjaan: [],
            confirmModal: false,
            successModal: false,
            confirmModalSendToKpa: false,
            rupStatus: false,
            filterValue: {
              jenis_pekerjaan: 'any',
              min_nilai_kontrak: 'any',
              max_nilai_kontrak: 'any'
            }
        }
    this.toggleAccept = this.toggleAccept.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.startRUP = this.startRUP.bind(this);
    this.getRUPdata = this.getRUPdata.bind(this);
    this.getSPSEdata = this.getSPSEdata.bind(this);
    this.showSendToKpaModal = this.showSendToKpaModal.bind(this);
    this.getRUPstatus = this.getRUPstatus.bind(this);
    this.getListTipePekerjaan = this.getListTipePekerjaan.bind(this);
    this.getFilterValue = this.getFilterValue.bind(this);
    this.getMinNilaiPagu = this.getMinNilaiPagu.bind(this);
    this.getMaxNilaiPagu = this.getMaxNilaiPagu.bind(this);
    this.applyMinMaxFilter = this.applyMinMaxFilter.bind(this);
    this.resetMinMaxFilter = this.resetMinMaxFilter.bind(this);
    }
    componentDidMount(){
      if(this.state.userData.jabatan === "kabiro"){
          this.getRUPdata();
          this.getRUPstatus();
      }
      else if(this.state.userData.jabatan === "kabag"){
          this.getSPSEdata(this.state.filterValue);
          this.getListTipePekerjaan();
        }
  }
    componentWillMount(){

    }

    // componentWillUpdate(nextProps, nextState) {
    //   if (this.state.filterValue.jenis_pekerjaan !== nextState.filterValue.jenis_pekerjaan) {
    //     this.getSPSEdata(nextState.filterValue);
    //   }
    // }

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
            dataSet: response.data.data
          })
          }).catch((e) => {
            alert(e);
        });
    }

    getRUPstatus() {
      const self = this;
      const url = `${process.env.API_HOST}/kabiro/paket/rup/2018/status`;
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
          rupStatus: response.data.data
        })
        }).catch((e) => {
          alert(e);
      });
  }

    getSPSEdata(params) {
      const self = this;
      const url = `${process.env.API_HOST}/kabag/paket/spse/2018`;
      const token = Cookies.get('token');
      axios({
        url,
        params,
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        }).then((response) => {
        self.setState({
          dataSet: response.data.data
        })
        }).catch((e) => {
          alert(e);
      });
    }
    getListTipePekerjaan() {
        const self = this;
        const url = `${process.env.API_HOST}/master/list/jenis-pekerjaan`;
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
              tipePekerjaan: response.data.data
            })
          }).catch((e) => {
            alert(e);
        });
    }
    isKabag() {
      if (this.state.userData && this.state.userData){
        return this.state.userData.jabatan === 'kabag'
      }
    }
    isKabiro() {
      if (this.state.userData && this.state.userData){
        return this.state.userData.jabatan === 'kabiro'
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
    showSendToKpaModal() {
      this.setState({
        confirmModalSendToKpa: !this.state.confirmModalSendToKpa,
      });
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
    getFilterValue(event) {
      this.setState({
        filterValue: {
          ...this.state.filterValue,
          jenis_pekerjaan: event.target.value
        }
      })
    }
    getMinNilaiPagu(event) {
      this.setState({
        filterValue: {
          ...this.state.filterValue,
          min_nilai_kontrak: event.target.value
        }
      })
    }
    getMaxNilaiPagu(event) {
      this.setState({
        filterValue: {
          ...this.state.filterValue,
          max_nilai_kontrak: event.target.value
        }
      })
    }
    applyMinMaxFilter() {
      this.getSPSEdata(this.state.filterValue);
    }
    resetMinMaxFilter() {
      this.setState({
        filterValue: {
          jenis_pekerjaan: '',
          min_nilai_kontrak: '',
          max_nilai_kontrak: ''
        }
      })
    }
    render() {
        const self = this
        const urlKabiro = `${process.env.API_HOST}/kabiro/paket/rup/2018`;
        const urlKabag = `${process.env.API_HOST}/kabag/paket/spse/2018`;
        const dataSet = this.state

        const columnKabiro = [
          {   "sTitle": "ID Paket","mDataProp": "id", "sWidth": "10px"},
          {   "sTitle": "Nama Paket","mDataProp": "nama_paket", "sWidth": "10px"},
          {   "sTitle": "Jenis Pekerjaan","mDataProp": "jenis_pekerjaan", "sWidth": "20px"},
          {   "sTitle": "Lokasi Pekerjaan","mDataProp": "lokasi_pekerjaan", "sWidth": "20px"},
          {   "sTitle": "Pagu Paket","mDataProp": "pagu_paket", "render": function (data, type, full, meta){
              return self.convertCurrency(data)
          },  "sWidth": "20px"},
          {   "sTitle": "Tahun Anggaran","mDataProp": "tahun_anggaran", "sWidth": "20px"},
          {   "sTitle": "Unit Eselon I","mDataProp": "unit_eselon1", "sWidth": "20px"},
         ];

         const columnKabag = [
          {   "sTitle": "<input type='checkbox'></input>","mDataProp": null, "sWidth": "5px", "sDefaultContent": "<input class='dt-body-center select-checkbox' type='checkbox' ></input>", "bSortable": false, "sClass": "dt-body-center select-checkbox"},
          {   "sTitle": "ID Paket","mDataProp": "id", "sWidth": "10px"},
          {   "sTitle": "Nama Paket","mDataProp": "nama_paket", "sWidth": "10px"},
          {   "sTitle": "Nomor Kontrak","mDataProp": "nomor_kontrak", "sWidth": "20px"},
          {   "sTitle": "Jenis Pekerjaan","mDataProp": "jenis_pekerjaan", "sWidth": "20px"},
          {   "sTitle": "Lokasi Pekerjaan","mDataProp": "lokasi_pekerjaan", "sWidth": "20px"},
          {   "sTitle": "Pagu Paket","mDataProp": "pagu_paket", "render": function (data, type, full, meta){
              return self.convertCurrency(data)
          },  "sWidth": "20px"},
          {   "sTitle": "Tahun Anggaran","mDataProp": "tahun_anggaran", "sWidth": "20px"},
          {   "sTitle": "Unit Eselon I","mDataProp": "unit_eselon1", "sWidth": "20px"},
          {   "sTitle": "Jenis Paket","mDataProp": null, "sWidth": "5px", "sDefaultContent": self.renderSwitchJS('M', 'E'), "bSortable": false, "sClass": "dt-body-center select-checkbox"}
];
         const dt = {
          ajax: {
             'url': this.isKabiro() ? urlKabiro : urlKabag,   
             'type': 'GET',
             'beforeSend': function (request) {
                 request.setRequestHeader("Authorization", Cookies.get('token'))
             },
          },
          scrollX: true,
          aoColumns: this.isKabiro() ? columnKabiro : columnKabag
       }
        return (
            <div className="animated fadeIn">
                <h1>{this.isKabiro() ? 'Data Paket RUP Tahun 2018' : 'Data Paket SPSE Tahun 2018'}</h1>
                { this.isKabag() &&
                <Row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="worktype">Filtered by Jenis Pekerjaan</Label>
                        <Input type="select" name="worktype" id="worktype" onChange={this.getFilterValue}>
                          <option value="any">Please select</option>
                          { this.state.tipePekerjaan && this.state.tipePekerjaan.map(data => {
                              return <option value={`${data.id}`}>{data.description}</option>
                            })
                          }
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <Row>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="ccnumber">Filter by Nilai Pagu</Label>
                            <Input type="text" id="min" placeholder="min nilai" onChange={this.getMinNilaiPagu}/>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="ccnumber">&nbsp;</Label>
                            <Input type="text" id="max" placeholder="max nilai" onChange={this.getMaxNilaiPagu}/>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                          <Button style={{marginTop: '15%', width:'50%'}} type="submit" size="sm" color="primary" onClick={this.applyMinMaxFilter}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                          <Button style={{marginTop: '15%', width:'50%'}} type="reset" size="sm" color="danger" onClick={this.resetMinMaxFilter}><i className="fa fa-ban"></i> Reset</Button>
                        </Col>
                      </Row>
                    </Col>
                </Row>
                }
                <DataTbl data={dt}>
                </DataTbl>
                { this.isKabag() &&
                <Row style={{marginTop: '5%', marginBottom: '5%', textAlign: 'right'}}>
                  <Col xs="12">
                    <Button type="submit" size="lg" color="primary" onClick={this.showSendToKpaModal}><i className="fa fa-dot-circle-o"></i> Send to KPA</Button>
                    <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </Col>
                  <Modal isOpen={this.state.confirmModalSendToKpa} toggle={this.showSendToKpaModal}>
                    <ModalHeader toggle={this.showSendToKpaModal}>Konfirmasi Paket</ModalHeader>
                    <ModalBody>
                       Anda yakin ingin meneruskan paket ini ke KPA?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.showSendToKpaModal}>Tentu</Button>{' '}
                      <Button color="secondary" onClick={this.showSendToKpaModal}>Tidak</Button>
                    </ModalFooter>
                  </Modal>
                </Row>
                }
                { this.isKabiro() && 
                <div>
                {this.state.rupStatus && this.state.dataSet && this.state.dataSet.length > 0 ? <Button size="lg" color="warning" disabled style={{float:'right', marginTop: '3%', fontWeight: 'bold'}}>Monev 2018 Telah Dimulai!</Button> : <Button size="lg" color="primary" onClick={this.toggleAccept} style={{float:'right', marginTop: '3%', fontWeight: 'bold'}}>Mulai Monev 2018!</Button> }
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