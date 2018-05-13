import React, { Component } from "react";
import {
    Row,
    Col,
    Card, CardHeader, CardBlock,
    Collapse,
    FormGroup,
    Button,
    Badge,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Progress
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';

import DetailPaket from '../DetailPaket';

class DetailPaketMonitoring extends Component {
    constructor() {
        super();
        const sessionCookie = JSON.parse(Cookies.get('userSession'));
        this.isPPK = this.isPPK.bind(this);
        this.reupload = this.reupload.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.getDetailPaket = this.getDetailPaket.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.convertCurrency = this.convertCurrency.bind(this);
        this.toggleAccept = this.toggleAccept.bind(this);
        
        this.state = {
            collapse: 0,
            userData: sessionCookie.data ? sessionCookie.data : {},
            detailPaket: {},
            fileUploaded: false,
            successUploadModal: false
        }
    }
    
    componentWillMount() {
        const idPaket = window.location.hash.replace('#/detail-paket-', '');
        if(this.state.userData.jabatan === 'pejabatf'){
          this.getDetailPaket('pejabatf', idPaket);
        } else if(this.state.userData.jabatan === 'ppk'){
          this.getDetailPaket('ppk', idPaket)
        }
    }

    getDetailPaket(jabatan, id) {
      const self = this;
      const token = Cookies.get('token');
      const url = `${process.env.API_HOST}/${jabatan}/evaluasi/tahapan/${id}/detail`;
      axios({
        url,
        method: 'GET',
        headers: {
          'Authorization': token,
        }
      }).then((response) => {
          console.log('response', response);
          self.setState({
            detailPaket: response.data.data
          })
          console.log('detailPaket', self.state.detailPaket);
      }).catch((e) => {
        alert(e);
      });
    }

    isPPK() {
        return this.state.userData.jabatan === 'ppk'
    }
    reupload() {
      this.setState({
        fileUploaded: true
      })
    }
    uploadFile() {
      this.setState({
        fileUploaded: true,
        successUploadModal: true
      })
    }
    toggleAccept() {
      this.setState({
        successUploadModal: false
      })
    }
    isEvaluasi(){
      return this.state.detailPaket.tipe_pekerjaan_id === 'evaluasi'
    }
    formatDate(date, format = this.dateFormat) {
      return moment(date).isValid() ? moment(date).locale('id').format(format) : '-';
    }
    convertCurrency(val) {
      const options = {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
      const convertedNum = new Intl.NumberFormat(['id'], options).format(Number(val));
      return convertedNum;
    }

    renderSuccessModal() {
      return(
        <Modal isOpen={this.state.successUploadModal} toggle={this.toggleAccept} className='modal-success'>
            <ModalHeader toggle={this.toggleAccept}>Upload Berhasil!</ModalHeader>
            <ModalBody>
              Laporan Berhasil Diupload
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleAccept}>Yes!</Button>{' '}
            </ModalFooter>
        </Modal>
      )
    }

    render() {
        const { detailPaket } = this.state;
        return (
            <div className="animated fadeIn">
              {this.renderSuccessModal()}
              {!this.isEvaluasi() && 
              <div>
                <Row>
                    <Col xs="12" md="12" style={{ marginBottom: 24 }}><h3>{detailPaket.nama_paket}</h3></Col>
                    <Col xs="12" md="6">
                        <table style={{ fontWeight: 'bold' }}>
                            <tbody>
                                <tr>
                                    <td>Nilai Kontrak</td>
                                    <td>:</td>
                                    <td>{this.convertCurrency(detailPaket.nilai_kontrak)}</td>
                                </tr>
                                <tr>
                                    <td>Durasi Pekerjaan</td>
                                    <td>:</td>
                                    <td>{detailPaket.durasi_pekerjaan} hari</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Mulai Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.formatDate(detailPaket.tgl_mulai_pekerjaan, 'D MMMM YYYY')}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Selesai Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.formatDate(detailPaket.tgl_selesai_pekerjaan, 'D MMMM YYYY')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col xs="12" md="6">
                        <table style={{ fontWeight: 'bold' }}>
                            <tbody>
                                <tr>
                                    <td>Petugas KPA</td>
                                    <td>:</td>
                                    <td>{detailPaket.kpa_nama}</td>
                                </tr>
                                <tr>
                                    <td>Petugas Pejabat Fungsional</td>
                                    <td>:</td>
                                    <td>{detailPaket.pejabatf_nama ? detailPaket.pejabatf_nama : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Unit Eselon I</td>
                                    <td>:</td>
                                    <td>{detailPaket.unit_eselon1}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Pekerjaan</td>
                                    <td>:</td>
                                    <td>{detailPaket.jenis_pekerjaan_desc}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row style={{marginTop: 28}}>
                    <Col xs="12" sm="6" md="12">
                        <Card className="border-primary">
                            <CardHeader>
                            <h4>Upload Laporan Pelaksanaan Paket</h4>
                            </CardHeader>
                                {this.isPPK() &&
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col md="3">
                                            {this.state.fileUploaded ? <a href="#">DokumenLaporan.pdf</a> : <Input type="file" id="file-input" name="file-input" />}
                                        </Col>
                                        <Col md="9">
                                        {this.state.fileUploaded ? <Button color="primary" onClick={this.reupload}>Ganti File</Button> : <Button color="primary" onClick={this.uploadFile}>Upload</Button> }
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 60, paddingLeft: 15}}>
                                        <Card>
                                            <CardHeader>History file diupload</CardHeader>
                                            <CardBlock>
                                                <ul style={{paddingLeft: 20}}>
                                                  { this.state.fileUploaded && <li>
                                                    <p>15 Mei 2018 14:40:21 - DokumenLaporan.pdf</p>
                                                  </li>}
                                                  <li>
                                                    <p>11 Mei 2018 08:20:21 - DokumenLaporan.pdf</p>
                                                  </li>
                                                  <li>
                                                    <p>9 Mei 2018 13:32:10 - DokumenLaporan.pdf</p>
                                                  </li>
                                                  <li>
                                                    <p>5 Mei 2018 10:04:12 - DokumenLaporan.pdf</p>
                                                  </li>
                                                </ul>
                                            </CardBlock>
                                        </Card>
                                    </Row>
                                </CardBlock>
                                }
                                {!this.isPPK() &&
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col md="12">
                                            <a href="#">DokumenLaporan.pdf</a>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 60, paddingLeft: 15}}>
                                      <Card>
                                            <CardHeader>History file diupload</CardHeader>
                                            <CardBlock>
                                                <ul style={{paddingLeft: 20}}>
                                                  <li>
                                                    <p>11 Mei 2018 08:20:21 - DokumenLaporan.pdf</p>
                                                  </li>
                                                  <li>
                                                    <p>9 Mei 2018 13:32:10 - DokumenLaporan.pdf</p>
                                                  </li>
                                                  <li>
                                                    <p>5 Mei 2018 10:04:12 - DokumenLaporan.pdf</p>
                                                  </li>
                                                </ul>
                                            </CardBlock>
                                        </Card>
                                    </Row>
                                </CardBlock>
                                }
                        </Card>
                    </Col>
                </Row>
                </div>
              }
              {this.isEvaluasi() &&
                <DetailPaket 
                  namaPaket={detailPaket.nama_paket}
                  nilaiKontrak={this.convertCurrency(detailPaket.nilai_kontrak)}
                  duration={detailPaket.durasi_pekerjaan}
                  startDate={this.formatDate(detailPaket.tgl_mulai_pekerjaan, 'D MMMM YYYY')}
                  endDate={this.formatDate(detailPaket.tgl_selesai_pekerjaan, 'D MMMM YYYY')}
                  kpaName={detailPaket.kpa_nama}
                  pejabatFname={detailPaket.pejabatf_nama}
                  unitEs1={detailPaket.unit_eselon1}
                  workType={detailPaket.jenis_pekerjaan_desc}
                  tahapanInti={detailPaket.tahapan_duedate}
                  subTahapan={detailPaket.tahapan}
                />
              }
            </div>
        );
    }
}

export default DetailPaketMonitoring;
