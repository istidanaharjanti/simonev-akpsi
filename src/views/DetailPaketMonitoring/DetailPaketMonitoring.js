import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
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
import Cookies from 'js-cookie';
import { SingleDatePicker } from 'react-dates';

class DetailPaketMonitoring extends Component {
    constructor() {
        super();
        const sessionCookie = JSON.parse(Cookies.get('userSession'));
        this.isPPK = this.isPPK.bind(this);
        this.reupload = this.reupload.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        
        this.state = {
            collapse: 0,
            userData: sessionCookie.data ? sessionCookie.data : {},
            detailPaket: {},
            fileUploaded: false
        }
    }
    
    getDetailPaket() {
      const self = this;
      const url = `${process.env.API_HOST}/pejabatf/evaluasi/tahapan/72755/detail`;
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
          detailPaket: response.data.data
        })
      }
      }).catch((e) => {
        alert(e);
      });
    }

    isPPK() {
        return this.state.userData.jabatan === 'ppk'
    }
    reupload() {
      this.setState({
        fileUploaded: !this.state.fileUploaded
      })
    }
    uploadFile() {
      this.setState({
        fileUploaded: true
      })
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" style={{ marginBottom: 24 }}><h3>Nama Paket</h3></Col>
                    <Col xs="12" md="6">
                        <table style={{ fontWeight: 'bold' }}>
                            <tbody>
                                <tr>
                                    <td>Nilai Kontrak</td>
                                    <td>:</td>
                                    <td>Rp. 200.000</td>
                                </tr>
                                <tr>
                                    <td>Durasi Pekerjaan</td>
                                    <td>:</td>
                                    <td>2 bulan</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Mulai Pekerjaan</td>
                                    <td>:</td>
                                    <td>1 May 2018</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Selesai Pekerjaan</td>
                                    <td>:</td>
                                    <td>2 Juni 2018</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col xs="12" md="6">
                        <table style={{ fontWeight: 'bold' }}>
                            <tbody>
                                <tr>
                                    <td>Petugas PPK</td>
                                    <td>:</td>
                                    <td>Akil Muchtar</td>
                                </tr>
                                <tr>
                                    <td>Unit Eselon I</td>
                                    <td>:</td>
                                    <td>DJBK</td>
                                </tr>
                                <tr>
                                    <td>Tipe Pekerjaan</td>
                                    <td>:</td>
                                    <td>Jasa Konsultasi</td>
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
                                            {this.state.fileUploaded ? <a href="#">Nama Dokumen</a> : <Input type="file" id="file-input" name="file-input" />}
                                        </Col>
                                        <Col md="9">
                                        {this.state.fileUploaded ? <Button color="primary" onClick={this.reupload}>Ganti File</Button> : <Button color="primary" onClick={this.uploadFile}>Upload</Button> }
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 60, paddingLeft: 15}}>
                                        <Card>
                                            <CardHeader>History file diupload</CardHeader>
                                            <CardBlock>
                                                datetimeuploaded - namafile
                                            </CardBlock>
                                        </Card>
                                    </Row>
                                </CardBlock>
                                }
                                {!this.isPPK() &&
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col md="12">
                                            <a href="#">Nama Dokumen</a>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 60, paddingLeft: 15}}>
                                        <Card>
                                            <CardHeader>History file diupload</CardHeader>
                                            <CardBlock>
                                                datetimeuploaded - namafile
                                            </CardBlock>
                                        </Card>
                                    </Row>
                                </CardBlock>
                                }
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DetailPaketMonitoring;
