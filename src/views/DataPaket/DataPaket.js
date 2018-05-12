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
  Label
} from 'reactstrap';
import { DataTbl } from '../../datatables';

class DataPaket extends Component {
  constructor(props) {
    super(props);
    const sessionCookie = JSON.parse(Cookies.get('userSession'))
    const userData = sessionCookie.data ? sessionCookie.data : {}
    const convertCurrency = function(val, options = {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }) {
      const convertedNum = new Intl.NumberFormat(['id'], options).format(Number(val));
      return convertedNum;
    }
    const renderSwitchJS = function(on, off, id, dv) {
      var checked = "checked"
      if(dv === 'evaluasi'){
        checked = ""
      }
      return `
          <div>
            <label class="switch switch-text switch-primary  form-control-label">
              <input type="checkbox" id="set-tipe-${id}" class="switch-input form-check-input set-tipe-checkbox" ${checked}/>
              <span class="switch-label" data-on="${on}" data-off="${off}"></span>
              <span class="switch-handle"></span>
            </label>
          </div>`
    }
    const listPejabatF =[
      {
          "nip": "011235813",
          "name": "Pejabat Fungsional 3",
          "jabatan": "pejabatf"
      },
      {
          "nip": "123456789",
          "name": "Pejabat Fungsional 1",
          "jabatan": "pejabatf"
      },
      {
          "nip": "987654321",
          "name": "Pejabat Fungsional 2",
          "jabatan": "pejabatf"
      }
    ];
    const renderSelectPejabatF = function(id, pjNip, pjName) {
     return `
      <select name="pejabatF" id="pejabatFn-${id}" class="form-control select-pejabat-fn">
       <option value="${pjNip}">${pjName}</option>
       <option value="011235813">Pejabat Fungsional 3</option>
       <option value="123456789">Pejabat Fungsional 1</option>
       <option value="987654321">Pejabat Fungsional 2</option>
     </select>`
    }
    let url
    let column
    if (userData.jabatan === 'kabiro') {
      url = `${process.env.API_HOST}/kabiro/paket/rup/2018`;
      column = [
        { "sTitle": "ID Paket", "mDataProp": "id", "sWidth": "10px" },
        { "sTitle": "Nama Paket", "mDataProp": "nama_paket", "sWidth": "10px" },
        { "sTitle": "Jenis Pekerjaan", "mDataProp": "jenis_pekerjaan", "sWidth": "20px" },
        { "sTitle": "Lokasi Pekerjaan", "mDataProp": "lokasi_pekerjaan", "sWidth": "20px" },
        { "sTitle": "Pagu Paket", "mDataProp": "pagu_paket", "sWidth": "20px" },
        { "sTitle": "Tahun Anggaran", "mDataProp": "tahun_anggaran", "sWidth": "20px" },
        { "sTitle": "Unit Eselon I", "mDataProp": "unit_eselon1", "sWidth": "20px" },
      ]
    } else if (userData.jabatan === 'kabag') {
      url = `${process.env.API_HOST}/kabag/paket/spse/2018`;
      column = [
        { "sTitle": "ID Paket", "mDataProp": "paket_id", "sWidth": "10px" },
        { "sTitle": "Nama Paket", "mDataProp": "nama_paket", "sWidth": "10px" },
        { "sTitle": "Nomor Kontrak", "mDataProp": "nomor_kontrak", "sWidth": "20px" },
        { "sTitle": "Jenis Pekerjaan", "mDataProp": "jenis_pekerjaan", "sWidth": "20px" },
        { "sTitle": "Lokasi Pekerjaan", "mDataProp": "lokasi_pekerjaan", "sWidth": "20px" },
        {
          "sTitle": "Nilai Kontrak", "mDataProp": "nilai_kontrak", "render": function (data, type, full, meta) {
            return convertCurrency(data)
          }, "sWidth": "20px"
        },
        { "sTitle": "Tahun Anggaran", "mDataProp": "tahun_anggaran", "sWidth": "20px" },
        { "sTitle": "Unit Eselon I", "mDataProp": "unit_eselon1", "sWidth": "20px" },
        { "sTitle": "Konfirmasi KPA", "mDataProp": "paket_id", "sWidth": "5px", "render": function(data, type, full, meta) {
          var checked = ""
          if(full.assignment.status) {
            checked = "checked"
          }
        return `<input id='assign-${data}' class='dt-body-center select-checkbox' type='checkbox' ${checked}></input>`
        }, "bSortable": false, "sClass": "dt-body-center assign-checkbox" },
        { "sTitle": "Jenis Paket", "mDataProp": "paket_id", "sWidth": "5px", "render": function(data, type, full, meta) { 
          return renderSwitchJS('M', 'E', data, full.tipe_pekerjaan.tipe_pekerjaan)
        }, "bSortable": false, "sClass": "dt-body-center select-checkbox" },
        { "sTitle": "Assign Pejabat Fungsional", "mDataProp": "paket_id", "sWidth": "5px", "render": function(data, type, full, meta) {
          return renderSelectPejabatF(data, full.pejabatf_nip, full.pejabatf_nama)
        }, "bSortable": false, "sClass": "dt-body-center" },
        { "sTitle": "Detail", "mDataProp": "paket_id", "sWidth": "5px", "render": function(data, type, full, meta) {
          return `<a href="/#/detail-paket-${data}" target="_blank" style="cursor: pointer"><i class="detail-clicked fa fa-eye fa-lg"></i></a>`
        }, "bSortable": false, "sClass": "dt-body-center" },]
    }
    this.state = {
      dataSet: [],
      userData,
      url,
      dt: {
        ajax: {
          'url': url,
          'type': 'GET',
          'beforeSend': function (request) {
            request.setRequestHeader("Authorization", Cookies.get('token'))
          },
        },
        scrollX: true,
        aoColumns: column
      },
      tipePekerjaan: [],
      confirmModal: false,
      successModal: false,
      confirmModalSendToKpa: false,
      rupStatus: false,
      filterValue: {
        jenis_pekerjaan: 'any',
        min_nilai_kontrak: 'any',
        max_nilai_kontrak: 'any',
        assignment: 'any',
        tipe_pekerjaan: 'any'
      },
      column,
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
    this.getAssignmentStatus = this.getAssignmentStatus.bind(this);
    this.lockTipePekerjaan = this.lockTipePekerjaan.bind(this);
    this.lockPejabatFungsional = this.lockPejabatFungsional.bind(this);
    this.filterMonEv = this.filterMonEv.bind(this);
  }
  componentDidMount() {
    if (this.state.userData.jabatan === "kabiro") {
      this.getRUPdata();
      this.getRUPstatus();
    }
    else if (this.state.userData.jabatan === "kabag") {
      this.getListTipePekerjaan();
      this.getSPSEdata(this.state.filterValue);
    }
  }
  componentWillMount() {
  }
  renderSelectPejabatF() {
    return `
      <select name="pejabatF" id="pejabatFn" class="form-control">
       <option value="any">Please select</option>
       ${this.state.listPejabatF}.map(data => {
         return <option>data.name</option>
       })
     </select>`
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
      }
    }).then((response) => {     
      if (response.data.data.length > 0) {
      self.setState({
        dataSet: response.data.data
      })
      self.setState({
        dt: {
          ajax: {
            'url': `${this.state.url}`,
            'type': 'GET',
            'beforeSend': function (request) {
              request.setRequestHeader("Authorization", Cookies.get('token'))
            },
          },
          scrollX: true,
          aoColumns: this.state.column
        }
      })
    }
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
      }
    }).then((response) => {
      self.setState({
        rupStatus: response.data.data
      })
      self.setState({
        dt: {
          ajax: {
            'url': `${this.state.url}`,
            'type': 'GET',
            'beforeSend': function (request) {
              request.setRequestHeader("Authorization", Cookies.get('token'))
            },
          },
          scrollX: true,
          aoColumns: this.state.column
        }
      })
    }).catch((e) => {
      alert(e);
    });
  }

  getSPSEdata(params) {
    const self = this;
    const url = `${process.env.API_HOST}/kabag/paket/spse/2018`
    const token = Cookies.get('token');
    axios({
      url,
      params,
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    }).then((response) => {
      if (response.data.data.length > 0) {
      self.setState({
        dataSet: response.data.data
      })
      self.setState({
        dt: {
          ajax: {
            'url': `${this.state.url}?jenis_pekerjaan=${params.jenis_pekerjaan}&min_nilai_kontrak=${params.min_nilai_kontrak}&max_nilai_kontrak=${params.max_nilai_kontrak}&assignment=${params.assignment}&tipe_pekerjaan=${params.tipe_pekerjaan}`,
            'type': 'GET',
            'beforeSend': function (request) {
              request.setRequestHeader("Authorization", Cookies.get('token'))
            },
          },
          scrollX: true,
          aoColumns: this.state.column
        }
      })
    }
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
    if (this.state.userData && this.state.userData) {
      return this.state.userData.jabatan === 'kabag'
    }
  }
  isKabiro() {
    if (this.state.userData && this.state.userData) {
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

  getFilterValue(event) {
    const fv = this.state.filterValue
    fv.jenis_pekerjaan = event.target.value
    this.setState({ filterValue: fv })
    this.getSPSEdata(this.state.filterValue)
  }
  getAssignmentStatus(event) {
    const fv = this.state.filterValue
    fv.assignment = event.target.value
    this.setState({ filterValue: fv })
    this.getSPSEdata(this.state.filterValue)
  }
  filterMonEv(event) {
    const fv = this.state.filterValue
    fv.tipe_pekerjaan = event.target.value
    this.setState({ filterValue: fv })
    this.getSPSEdata(this.state.filterValue)
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
  lockTipePekerjaan() {
    const self = this;
    axios({
      url: `${process.env.API_HOST}/kabag/paket/spse/2018/lock`,
      method: 'post',
      headers: {
        'Authorization': Cookies.get('token')
      }
    }).then((res) => {
      self.setState({
        confirmModalSendToKpa: false,
        successModal: true
      })
      window.location.reload();
    }).catch((e) => {
      alert(e);
    })
  }
  dataLocked () {
    return this.state.dataSet.find(data => data.status === 1);
  }
  pejabatLocked () {
    return this.state.dataSet.find(data => data.status === 2);
  }
  lockPejabatFungsional(val){
    const self = this;
      self.setState({
        confirmModalSendToKpa: false,
        successModal: true
      })
      window.location.reload();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <h1>{this.isKabiro() ? 'Data Paket RUP Tahun 2018' : 'Data Paket SPSE Tahun 2018'}</h1>
        {this.isKabag() &&
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label htmlFor="worktype">Filtered by Jenis Pekerjaan</Label>
                <Input type="select" name="worktype" id="worktype" onChange={this.getFilterValue}>
                  <option value="any">Please select</option>
                  {this.state.tipePekerjaan && this.state.tipePekerjaan.map(data => {
                    return <option value={`${data.id}`}>{data.description}</option>
                  })
                  }
                </Input>
              </FormGroup>
              <Row>
                <Col xs="6">
                <FormGroup>
                  <Label htmlFor="worktype">Filter by Tipe Pekerjaan</Label>
                  <Input type="select" name="worktype" id="worktype" onChange={this.filterMonEv}>
                    <option value="any">Please select</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="evaluasi">Evaluasi</option>
                  </Input>
                </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup>
                  <Label htmlFor="worktype">Filter by Konfirmasi KPA</Label>
                  <Input type="select" name="worktype" id="worktype" onChange={this.getAssignmentStatus}>
                    <option value="any">Please select</option>
                    <option value="true">Lihat paket yang telah di assign ke KPA</option>
                    <option value="false">Lihat paket yang tidak di assign ke KPA</option>
                  </Input>
                </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col xs="6">
              <Row>
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="ccnumber">Filter by Nilai Kontrak</Label>
                    <Input type="text" id="min" placeholder="min nilai" onChange={this.getMinNilaiPagu} />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="ccnumber">&nbsp;</Label>
                    <Input type="text" id="max" placeholder="max nilai" onChange={this.getMaxNilaiPagu} />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <Button style={{ marginTop: '15%', width: '50%' }} type="submit" size="sm" color="primary" onClick={this.applyMinMaxFilter}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  <Button style={{ marginTop: '15%', width: '50%' }} type="reset" size="sm" color="danger" onClick={this.resetMinMaxFilter}><i className="fa fa-ban"></i> Reset</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        {typeof this.state.dt !== 'undefined' &&
          <DataTbl data={this.state.dt} visibility={this.isKabag() && !this.dataLocked()}>
          </DataTbl>
        }
        {this.isKabag() && !this.pejabatLocked() &&
          <Row style={{ marginTop: '5%', marginBottom: '5%', textAlign: 'right' }}>
            <Col xs="12">
              <Button type="submit" size="lg" color="primary" onClick={this.showSendToKpaModal}><i className="fa fa-dot-circle-o"></i>
                { 
                  this.dataLocked() ? 'Simpan Pejabat Fungsional' : 'Kunci dan Setujui Tipe Pekerjaan'
                }
              </Button>
              <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </Col>
            <Modal isOpen={this.state.confirmModalSendToKpa} toggle={this.showSendToKpaModal}>
              <ModalHeader toggle={this.showSendToKpaModal}>Konfirmasi Paket</ModalHeader>
              <ModalBody>
                Anda yakin ingin mengunci tipe pekerjaan? Hal ini tidak dapat diubah kembali setelah anda menyetujui.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.dataLocked() ? this.lockPejabatFungsional : this.lockTipePekerjaan}>Tentu</Button>{' '}
                <Button color="secondary" onClick={this.showSendToKpaModal}>Tidak</Button>
              </ModalFooter>
            </Modal>
        </Row> }
        {this.isKabiro() &&
          <div>
            {this.state.rupStatus && this.state.dataSet && this.state.dataSet.length > 0 ? <Button size="lg" color="warning" disabled style={{ float: 'right', marginTop: '3%', fontWeight: 'bold' }}>Monev 2018 Telah Dimulai!</Button> : <Button size="lg" color="primary" onClick={this.toggleAccept} style={{ float: 'right', marginTop: '3%', fontWeight: 'bold' }}>Mulai Monev 2018!</Button>}
            <Modal isOpen={this.state.confirmModal} toggle={this.toggleAccept}>
              <ModalHeader toggle={this.toggleAccept}>Konfirmasi Kegiatan</ModalHeader>
              <ModalBody>
                Anda yakin ingin memulai kegiatan monitoring dan evaluasi tahun 2018?<br />
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