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

class DetailPaket extends Component {
    constructor(props) {
        super(props);
        const sessionCookie = JSON.parse(Cookies.get('userSession'));
        this.togglingMenu = this.togglingMenu.bind(this);
        this.isPPK = this.isPPK.bind(this);

        this.state = {
            collapse: 0,
            userData: sessionCookie.data ? sessionCookie.data : {},
            focused: false,
            date: null
        }
    }

    isPPK() {
        return this.state.userData.jabatan === 'ppk'
    }

    togglingMenu(selectedState) {
        const self = this;
        return function () {
            self.setState({
                collapse: selectedState
            })
        };
    };

    render() {
        return (
            <div className="animated fadeIn">
                <Row style={{ marginBottom: 28 }}>
                    <Col xs="12" md="12" style={{ marginBottom: 24 }}><h3>{this.props.namaPaket}</h3></Col>
                    <Col xs="12" md="6">
                        <table style={{ fontWeight: 'bold' }}>
                            <tbody>
                                <tr>
                                    <td>Nilai Kontrak</td>
                                    <td>:</td>
                                    <td>{this.props.nilaiKontrak}</td>
                                </tr>
                                <tr>
                                    <td>Durasi Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.props.duration}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Mulai Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.props.startDate}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Selesai Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.props.endDate}</td>
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
                                    <td>{this.props.kpaName}</td>
                                </tr>
                                <tr>
                                    <td>Petugas Pejabat Fungsional</td>
                                    <td>:</td>
                                    <td>{this.props.pejabatFname}</td>
                                </tr>
                                <tr>
                                    <td>Unit Eselon I</td>
                                    <td>:</td>
                                    <td>{this.props.unitEs1}</td>
                                </tr>
                                <tr>
                                    <td>Tipe Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.props.workType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row>
                    {this.props.tahapanInti.map((data, index) => {
                        return (
                            <Col xs="12" md="12">
                                <Card className="card-accent-warning" style={{ marginBottom: 10 }}> {/* will be danger if < 10% mendekati h-3 duedate, warning if < 10% h-7*/}
                                    <CardHeader onClick={this.togglingMenu(index+1)} style={{ cursor: 'pointer' }}>
                                        <h4>
                                            {index + 1}. {data.tahapan_desc}
                                            <Badge pill color="warning" className="float-right">7%</Badge>
                                        </h4>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.collapse === index + 1}>
                                        {this.isPPK() &&
                                            <CardBlock className="card-body">
                                                <Row>
                                                    <Col md="6">
                                                        <ol type="a">
                                                          {this.props.subTahapan.map(data => {
                                                            return (
                                                              <li>
                                                                <FormGroup row>
                                                                    <Col md="4">
                                                                        <Label htmlFor="file-input">{data.tahapan_action_desc}</Label>
                                                                    </Col>
                                                                    <Col md="4">
                                                                        <Input type="file" id="file-input" name="file-input" />
                                                                    </Col>
                                                                    <Col md="4">
                                                                        <Button color="primary">Upload</Button>
                                                                    </Col>
                                                                </FormGroup>
                                                              </li>
                                                            )
                                                           })
                                                          }
                                                        </ol>
                                                    </Col>
                                                    <Col md="6">
                                                        <Col md="12" style={{ marginBottom: 10 }}>
                                                            <SingleDatePicker
                                                                date={this.state.date} // momentPropTypes.momentObj or null
                                                                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                                                focused={this.state.focused} // PropTypes.bool
                                                                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                                            />
                                                        </Col>
                                                        {/*will be show suggestion list if warning or danger*/}
                                                        <Col md="12">
                                                            <Card className="text-white bg-warning" style={{ fontWeight: 'bold' }}> {/* kondisi s.d.a */}
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
                                                        <Col md="12" style={{ marginBottom: 10 }}>
                                                            <SingleDatePicker
                                                                disabled
                                                                date={this.state.date} // momentPropTypes.momentObj or null
                                                                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                                                focused={this.state.focused} // PropTypes.bool
                                                                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                                            />
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
                        )
                    })
                    }
                </Row>
            </div>
        );
    }
}

export default DetailPaket;
