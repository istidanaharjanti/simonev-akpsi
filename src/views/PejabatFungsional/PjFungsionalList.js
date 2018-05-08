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

class PJFungsionalList extends Component {
  // constructor(props) {
  //   super(props);
  //   const sessionCookie = JSON.parse(Cookies.get('userSession'))
  //   const userData = sessionCookie.data ? sessionCookie.data : {}
  //   const convertCurrency = function (val, options = {
  //     style: 'currency',
  //     currency: 'IDR',
  //     currencyDisplay: 'symbol',
  //     maximumFractionDigits: 2,
  //     minimumFractionDigits: 0,
  //   }) {
  //     const convertedNum = new Intl.NumberFormat(['id'], options).format(Number(val));
  //     return convertedNum;
  //   }
  //   const renderSwitchJS = function (on, off, id, dv) {
  //     var checked = "checked"
  //     if (dv === 'evaluasi') {
  //       checked = ""
  //     }
  //     return `
  //         <div>
  //           <label class="switch switch-text switch-primary  form-control-label">
  //             <input type="checkbox" id="set-tipe-${id}" class="switch-input form-check-input set-tipe-checkbox" ${checked}/>
  //             <span class="switch-label" data-on="${on}" data-off="${off}"></span>
  //             <span class="switch-handle"></span>
  //           </label>
  //         </div>`
  //   }
  //   let url = `${process.env.API_HOST}/kpa/paket/spse/2018`;
  //   const column = [
  //     { "sTitle": "ID Paket", "mDataProp": "paket_id", "sWidth": "10px" },
  //     { "sTitle": "Nama Paket", "mDataProp": "nama_paket", "sWidth": "10px" },
  //     { "sTitle": "Nomor Kontrak", "mDataProp": "nomor_kontrak", "sWidth": "20px" },
  //     { "sTitle": "Jenis Pekerjaan", "mDataProp": "jenis_pekerjaan", "sWidth": "20px" },
  //     { "sTitle": "Lokasi Pekerjaan", "mDataProp": "lokasi_pekerjaan", "sWidth": "20px" },
  //     {
  //       "sTitle": "Nilai Kontrak", "mDataProp": "nilai_kontrak", "render": function (data, type, full, meta) {
  //         return convertCurrency(data)
  //       }, "sWidth": "20px"
  //     },
  //     { "sTitle": "Tahun Anggaran", "mDataProp": "tahun_anggaran", "sWidth": "20px" },
  //     { "sTitle": "Unit Eselon I", "mDataProp": "unit_eselon1", "sWidth": "20px" },
  //     {
  //       "sTitle": "Jenis Paket", "mDataProp": "paket_id", "sWidth": "5px", "render": function (data, type, full, meta) {
  //         return renderSwitchJS('M', 'E', data, full.tipe_pekerjaan.tipe_pekerjaan)
  //       }, "bSortable": false, "sClass": "dt-body-center select-checkbox"
  //     }
  //   ]
  //   this.state = {
  //     dataSet: [],
  //     userData,
  //     url,
  //     dt: {
  //       ajax: {
  //         'url': url,
  //         'type': 'GET',
  //         'beforeSend': function (request) {
  //           request.setRequestHeader("Authorization", Cookies.get('token'))
  //         },
  //       },
  //       scrollX: true,
  //       aoColumns: column
  //     },
  //     tipePekerjaan: [],
  //     confirmModal: false,
  //     successModal: false,
  //     confirmModalSendToKpa: false,
  //     rupStatus: false,
  //     filterValue: {
  //       jenis_pekerjaan: 'any',
  //       min_nilai_kontrak: 'any',
  //       max_nilai_kontrak: 'any'
  //     },
  //     column
  //   }
  //   this.getListTipePekerjaan = this.getListTipePekerjaan.bind(this);
  //   this.getFilterValue = this.getFilterValue.bind(this);
  //   this.getMinNilaiPagu = this.getMinNilaiPagu.bind(this);
  //   this.getMaxNilaiPagu = this.getMaxNilaiPagu.bind(this);
  //   this.applyMinMaxFilter = this.applyMinMaxFilter.bind(this);
  //   this.resetMinMaxFilter = this.resetMinMaxFilter.bind(this);
  //   this.getSPSEdata = this.getSPSEdata.bind(this);
  //   this.showSendToKpaModal = this.showSendToKpaModal.bind(this);
  //   this.toggleSuccess = this.toggleSuccess.bind(this);
  // }
  // componentDidMount() {
  //   this.getListTipePekerjaan();
  // }
  // getSPSEdata(params) {
  //   const self = this;
  //   const url = `${process.env.API_HOST}/kpa/paket/spse/2018`;
  //   const token = Cookies.get('token');
  //   axios({
  //     url,
  //     params,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': token,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).then((response) => {
  //     self.setState({
  //       dataSet: response.data.data
  //     })
  //     self.setState({
  //       dt: {
  //         ajax: {
  //           'url': `${this.state.url}?jenis_pekerjaan=${params.jenis_pekerjaan}&min_nilai_kontrak=${params.min_nilai_kontrak}&max_nilai_kontrak=${params.max_nilai_kontrak}`,
  //           'type': 'GET',
  //           'beforeSend': function (request) {
  //             request.setRequestHeader("Authorization", Cookies.get('token'))
  //           },
  //         },
  //         scrollX: true,
  //         aoColumns: this.state.column
  //       }
  //     })
  //   }).catch((e) => {
  //     alert(e);
  //   });
  // }
  // getListTipePekerjaan() {
  //   const self = this;
  //   const url = `${process.env.API_HOST}/master/list/jenis-pekerjaan`;
  //   const token = Cookies.get('token');
  //   axios({
  //     url,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': token,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).then((response) => {
  //     self.setState({
  //       tipePekerjaan: response.data.data
  //     })
  //   }).catch((e) => {
  //     alert(e);
  //   });
  // }
  // getFilterValue(event) {
  //   const fv = this.state.filterValue
  //   fv.jenis_pekerjaan = event.target.value
  //   this.setState({ filterValue: fv })
  //   this.getSPSEdata(this.state.filterValue)
  // }

  // getMinNilaiPagu(event) {
  //   this.setState({
  //     filterValue: {
  //       ...this.state.filterValue,
  //       min_nilai_kontrak: event.target.value
  //     }
  //   })
  // }
  // getMaxNilaiPagu(event) {
  //   this.setState({
  //     filterValue: {
  //       ...this.state.filterValue,
  //       max_nilai_kontrak: event.target.value
  //     }
  //   })
  // }
  // applyMinMaxFilter() {
  //   this.getSPSEdata(this.state.filterValue);
  // }
  // resetMinMaxFilter() {
  //   this.setState({
  //     filterValue: {
  //       jenis_pekerjaan: '',
  //       min_nilai_kontrak: '',
  //       max_nilai_kontrak: ''
  //     }
  //   })
  // }
  // showSendToKpaModal() {
  //   this.setState({
  //     confirmModalSendToKpa: !this.state.confirmModalSendToKpa,
  //   });
  // }
  // toggleSuccess() {
  //   this.setState({
  //     confirmModalSendToKpa: false
  //   });
  //   window.location.reload();
  // }
  render() {
    return (
      <div className="animated fadeIn">
        <h1>Data Paket SPSE Tahun 2018</h1>
        test
      </div>
    );
  }
}

export default PJFungsionalList;
