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

class PPKList extends Component {
  constructor(props) {
    super(props);
    const sessionCookie = JSON.parse(Cookies.get('userSession'))
    const userData = sessionCookie.data ? sessionCookie.data : {}
    const convertCurrency = function (val, options = {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }) {
      const convertedNum = new Intl.NumberFormat(['id'], options).format(Number(val));
      return convertedNum;
    }
    const renderSwitchJS = function (on, off, id, dv) {
      var checked = "checked"
      if (dv === 'evaluasi') {
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
    let url = `${process.env.API_HOST}/ppk/evaluasi/spse/2018`;
    const column = [
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
      { "sTitle": "Petugas KPA", "mDataProp": "kpa_nama", "sWidth": "20px" },
      { "sTitle": "Pejabat Fungsional", "mDataProp": "pejabatf_nama", "sWidth": "20px" },
      {
        "sTitle": "Jenis Paket", "mDataProp": "paket_id", "sWidth": "5px", "render": function (data, type, full, meta) {
          return renderSwitchJS('M', 'E', data, full.tipe_pekerjaan.tipe_pekerjaan)
        }, "bSortable": false, "sClass": "dt-body-center select-checkbox"
      },
      { "sTitle": "Detail", "mDataProp": "paket_id", "sWidth": "5px", "render": function(data, type, full, meta) {
        return `<a href="/#/detail-paket-${data}" target="_blank" style="cursor: pointer"><i class="detail-clicked fa fa-eye fa-lg"></i></a>`
      }, "bSortable": false, "sClass": "dt-body-center" },
    ]
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
        tipe_pekerjaan: 'any'
      },
      column
    }
    this.getListTipePekerjaan = this.getListTipePekerjaan.bind(this);
    this.getFilterValue = this.getFilterValue.bind(this);
    this.getMinNilaiPagu = this.getMinNilaiPagu.bind(this);
    this.getMaxNilaiPagu = this.getMaxNilaiPagu.bind(this);
    this.applyMinMaxFilter = this.applyMinMaxFilter.bind(this);
    this.resetMinMaxFilter = this.resetMinMaxFilter.bind(this);
    this.getSPSEdata = this.getSPSEdata.bind(this);
    this.showSendToKpaModal = this.showSendToKpaModal.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.filterMonEv = this.filterMonEv.bind(this);
  }
  componentDidMount() {
    this.getListTipePekerjaan();
    this.getSPSEdata();
  }
  getSPSEdata(params) {
    const self = this;
    const url = `${process.env.API_HOST}/ppk/evaluasi/spse/2018`;
    const token = Cookies.get('token');
    axios({
      url,
      params,
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    }).then((response) => {
      console.log("count", response.data.data.length)
      if (response.data.data.length > 0) {
        self.setState({
          dataSet: response.data.data
        })
        self.setState({
          dt: {
            ajax: {
              'url': `${this.state.url}?jenis_pekerjaan=${params.jenis_pekerjaan}&min_nilai_kontrak=${params.min_nilai_kontrak}&max_nilai_kontrak=${params.max_nilai_kontrak}&tipe_pekerjaan=${params.tipe_pekerjaan}`,
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
      // alert(response.data.status)
    }).catch((e) => {
      alert.log(e)
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
  getFilterValue(event) {
    const fv = this.state.filterValue
    fv.jenis_pekerjaan = event.target.value
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
  showSendToKpaModal() {
    this.setState({
      confirmModalSendToKpa: !this.state.confirmModalSendToKpa,
    });
  }
  toggleSuccess() {
    this.setState({
      confirmModalSendToKpa: false
    });
    window.location.reload();
  }

  filterMonEv(event) {
    const fv = this.state.filterValue
    fv.tipe_pekerjaan = event.target.value
    this.setState({ filterValue: fv })
    this.getSPSEdata(this.state.filterValue)
  }
  render() {
    return (
      <div className="animated fadeIn">
        <h1>Data Paket SPSE Tahun 2018</h1>
        <Row>
          <Col xs="6">
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
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="tipePekerjaan">Filter by Tipe Pekerjaan</Label>
                  <Input type="select" name="tipePekerjaan" id="tipePekerjaan" onChange={this.filterMonEv}>
                    <option value="any">Please select</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="evaluasi">Evaluasi</option>
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
        {typeof this.state.dt !== 'undefined' &&
          <DataTbl data={this.state.dt}>
          </DataTbl>
        }
      </div>
    );
  }
}

export default PPKList;
