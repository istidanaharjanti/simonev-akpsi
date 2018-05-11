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

class DetailPaket extends Component {
    constructor() {
        super();
        const sessionCookie = JSON.parse(Cookies.get('userSession'));
        this.togglingMenu = this.togglingMenu.bind(this);
        this.isPPK = this.isPPK.bind(this);

        this.state = {
            collapse: false,
            userData: sessionCookie.data ? sessionCookie.data : {}
        }
    }



    togglingMenu() {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    isPPK() {
        return this.state.userData.jabatan === 'ppk'
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row style={{ marginBottom: 28 }}>
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
                <Row>
                    <Col xs="12" sm="6" md="12">
                        <Card className="card-accent-warning"> {/* will be danger if < 10% mendekati h-3 duedate, warning if < 10% h-7*/}
                            <CardHeader onClick={this.togglingMenu} style={{ cursor: 'pointer' }}>
                                <h4>
                                    1. Tahapan Persiapan
                  <Badge pill color="warning" className="float-right">7%</Badge>
                                </h4>
                            </CardHeader>
                            <Collapse isOpen={this.state.collapse}>
                                {this.isPPK() &&
                                    <CardBlock className="card-body">
                                        <Row>
                                            <Col md="6">
                                                <ol type="a">
                                                    <li>
                                                        <FormGroup row>
                                                            <Col md="3">
                                                                <Label htmlFor="file-input">Tahapan lalala</Label>
                                                            </Col>
                                                            <Col xs="12" md="9">
                                                                <Input type="file" id="file-input" name="file-input" />
                                                            </Col>
                                                        </FormGroup>
                                                    </li>
                                                    <li>
                                                        <FormGroup row>
                                                            <Col md="3">
                                                                <Label htmlFor="file-input">Tahapan lalala</Label>
                                                            </Col>
                                                            <Col xs="12" md="9">
                                                                <Input type="file" id="file-input" name="file-input" />
                                                            </Col>
                                                        </FormGroup>
                                                    </li>
                                                </ol>
                                            </Col>
                                            <Col md="6">
                                                <Col md="12">
                                                    {/* <DatePicker /> */}
                                                    disini DatePicker, setelah di set, jadi tanggal fixed
                                                </Col>
                                                {/*will be show suggestion list if warning or danger*/}
                                                <Col md="12">
                                                    <Card className="text-white bg-warning" style={{fontWeight: 'bold'}}> {/* kondisi s.d.a */}
                                                        <CardHeader>
                                                            Apa yang harus anda lakukan?
                                                        </CardHeader>
                                                        <CardBlock className="card-body">
                                                        <ol type="i">
                                                            <li>Kelola tenaga kerja yang diperlukan</li>
                                                            <li>Lakukan rapat dengan pihak Cipta Karya Dinas Pekerjaan Umum</li>
                                                            <li>Percepat pengiriman barang</li>
                                                            <li>Rapat dengan vendor untuk membahas percepatan</li>
                                                        </ol>
                                                        </CardBlock>
                                                    </Card>
                                                </Col>
                                                <Col md="12">
                                                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                                                        placeholder="Content..." />
                                                </Col>
                                                <Col md="3" style={{ float: 'right' }}>
                                                    <Button color="primary" style={{ float: 'right' }}>Kirim Komentar</Button>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </CardBlock>
                                }
                                {!this.isPPK() &&
                                    <CardBlock className="card-body">
                                        <Row>
                                            <Col md="6">
                                                <ol type="a">
                                                    <li>
                                                        <FormGroup row>
                                                            <Col md="4">
                                                                <Label htmlFor="file-input">Tahapan lalala</Label>
                                                            </Col>
                                                            <Col xs="12" md="8">
                                                                <a href="#">Link Donlod file</a>
                                                            </Col>
                                                        </FormGroup>
                                                    </li>
                                                    <li>
                                                        <FormGroup row>
                                                            <Col md="4">
                                                                <Label htmlFor="file-input">Tahapan lalala</Label>
                                                            </Col>
                                                            <Col xs="12" md="8">
                                                                <a href="#">Link Donlod file</a>
                                                            </Col>
                                                        </FormGroup>
                                                    </li>
                                                </ol>
                                            </Col>
                                            <Col md="6">
                                                <Col md="12">
                                                    {/* <DatePicker /> */}
                                                    disini tanggal fixed
                                                 </Col>
                                                <Col md="12">
                                                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                                                        placeholder="Content..." />
                                                </Col>
                                                <Col md="3" style={{ float: 'right' }}>
                                                    <Button color="primary" style={{ float: 'right' }}>Kirim Komentar</Button>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </CardBlock>
                                }
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DetailPaket;
