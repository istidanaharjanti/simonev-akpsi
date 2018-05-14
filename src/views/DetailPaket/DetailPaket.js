import React, { Component } from "react";
import {
    Row,
    Col,
    Card, CardHeader, CardBlock, CardFooter,
    Collapse,
    Form,
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
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

let comment = ''
class DetailPaket extends Component {
    constructor(props) {
        super(props);
        const sessionCookie = JSON.parse(Cookies.get('userSession'));
        this.togglingMenu = this.togglingMenu.bind(this);
        this.isPPK = this.isPPK.bind(this);
        this.isKPA = this.isKPA.bind(this);
        this.isKabag = this.isKabag.bind(this);
        this.isPjFu = this.isPjFu.bind(this);
        this.getWarnaIndikator = this.getWarnaIndikator.bind(this);
        this.renderSugestionCard = this.renderSugestionCard.bind(this);
        this.getProgress = this.getProgress.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.renderCommentSection = this.renderCommentSection.bind(this);
        this.getCommentContent = this.getCommentContent.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.renderCommentatorName = this.renderCommentatorName.bind(this);
        this.showBerhasilGenerate = this.showBerhasilGenerate.bind(this);
        this.setFile = this.setFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);

        this.state = {
            collapse: 0,
            userData: sessionCookie.data ? sessionCookie.data : {},
            focused: false,
            startDate: moment(),
            commentContent: '',
            showNewComment: false,
            suksesBikinBap: false,
        }
    }

    componentDidUpdate() {
        comment = this.state.commentContent;
        console.log('comment', comment)
    }
    isPPK() {
        return this.state.userData.jabatan === 'ppk'
    }
    isKPA() {
        return this.state.userData.jabatan === 'kpa'
    }
    isKabag() {
        return this.state.userData.jabatan === 'kabag'
    }
    isPjFu() {
        return this.state.userData.jabatan === 'pejabatf'
    }
    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }
    showBerhasilGenerate() {
        this.setState({ suksesBikinBap: !this.state.suksesBikinBap })
    }
    togglingMenu(selectedState) {
        const self = this;
        return function () {
            self.setState({
                collapse: selectedState
            })
        };
    };

    getWarnaIndikator(index) {
        let warna
        if (index === 0) {
            warna = 'card-accent-success'
        } if (index === 1) {
            warna = 'card-accent-warning'
        } if (index === 2) {
            warna = 'card-accent-danger'
        }
        return warna;
    }

    renderSugestionCard(index) {
        if (index === 1) {
            return (
                <Card className="text-white bg-warning" style={{ fontWeight: 'bold' }}>
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
            )
        }
        if (index === 2) {
            return (
                <Card className="text-white bg-danger" style={{ fontWeight: 'bold' }}>
                    <CardHeader>
                        Apa yang harus anda lakukan?
                    </CardHeader>
                    <CardBlock className="card-body">
                        <ol type="i">
                            <li>Merencanakan strategi percepatan oleh Tenaga Ahli</li>
                            <li>Melibatkan konsultan untuk melakukan assesmen</li>
                            <li>Membuat Surat Peringatan ke vendor</li>
                            <li>Menghitung prestasi untuk menentukan denda keterlambatan</li>
                            <li>Melibatkan pihak Kantor Pusat</li>
                        </ol>
                    </CardBlock>
                </Card>
            )
        }
        else { return '' }
    }

    renderCommentatorName(){
      const kpa = this.isKPA();
      const ppk = this.isPPK();
      const kabag = this.isKabag();
      const pejabatF = this.isPjFu();
      let commentator
      if (kpa) {
        commentator = 'Ibrahim Saad'
      } else if (kabag) {
        commentator = 'kabag'
      } else if (ppk) {
        commentator = 'Sumarmo'
      } else if (pejabatF) {
        commentator = 'Pejabat Fungsional 1'
      } return commentator;
    }

    renderCommentSection() {
        return (
            <Card>
                <CardHeader>
                    <h6 style={{ fontWeight: 'bold' }}>Tanggapan pihak terkait</h6>
                </CardHeader>
                <CardBlock>
                    <Col md="12">
                        <p style={{ fontWeight: 'bold', color: '#216ba5', marginBottom: 0 }}>Ibrahim Saad</p>
                        <p style={{ fontSize: 10, color: 'grey', marginBottom: 4 }}>Kemarin - 09:45</p>
                        <p>Kamu semangat dong</p>
                    </Col>
                    {comment !== '' && this.state.showNewComment &&
                        <Col md="12">
                            <p style={{ fontWeight: 'bold', color: '#216ba5', marginBottom: 0 }}>{this.renderCommentatorName()}</p>
                            <p style={{ fontSize: 10, color: 'grey', marginBottom: 4 }}>Hari Ini - 14:25</p>
                            <p>{comment}</p>
                        </Col>
                    }
                </CardBlock>
                <CardFooter>
                    <Col md="12">
                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                            value={this.state.commentContent}
                            onChange={this.getCommentContent}
                            placeholder="Content..." />
                    </Col>
                    <Col md="3" style={{ float: 'right' }}>
                        <Button color="primary" style={{ float: 'right' }} onClick={this.sendComment}>Kirim Komentar</Button>
                    </Col>
                </CardFooter>
            </Card>
        )
    }
    getProgress(index) {
        let number
        if (index === 0) { number = '0%' }
        if (index === 1) { number = '7%' }
        if (index === 2) { number = '5%' }
        return number;
    }

    getCommentContent(event) {
        event.preventDefault();
        this.setState({ commentContent: event.target.value });
    };

    sendComment() {
        this.setState({
            showNewComment: true,
            commentContent: ''
        })
    }

    setFile(e) {
        console.log("up", e.target.files[0])
        this.setState({
            file: e.target.files
        })
    }
    uploadFile(tahapan) {
        const idPaket = window.location.hash.replace('#/detail-paket-', '');
        const form = new FormData()
        form.append("document", this.state.file[0])
        const self = this;
        const url = `${process.env.API_HOST}/ppk/evaluasi/tahapan/${idPaket}/document/${tahapan}/upload/pk`;
        const token = Cookies.get('token');
        axios({
            url,
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/pdf',
                // "Content-Disposition": `form-data; name=document; filename=${self.state.file[0].name}`
            },
            processData: false,
            mimeType: 'multipart/form-data',
            data: form
        }).then((response) => {
            console.log("res", response.data.data)
            // self.setState({
            //     fileUploaded: true,
            //     successUploadModal: true,
            //     url: response.data.data[0].path
            // })
        }).catch((e) => {
            alert(e);
        });
    }

    
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
                                    <td>{this.props.duration} hari</td>
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
                                    <td>{this.isPPK() ? 'Petugas Pejabat Fungsional' : 'Petugas PPK'}</td>
                                    <td>:</td>
                                    <td>{this.props.pejabatFname}</td>
                                </tr>
                                <tr>
                                    <td>Unit Eselon I</td>
                                    <td>:</td>
                                    <td>{this.props.unitEs1}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Pekerjaan</td>
                                    <td>:</td>
                                    <td>{this.props.workType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row>
                    {this.props.tahapanInti.map((data, index) => {
                        const warna = this.getWarnaIndikator(index)
                        const colorBadge = warna.replace('card-accent-', '')
                        return (
                            <Col xs="12" md="12">
                                <Card className={warna} style={{ marginBottom: 10 }}> {/* will be danger if < 10% mendekati h-3 duedate, warning if < 10% h-7*/}
                                    <CardHeader onClick={this.togglingMenu(index + 1)} style={{ cursor: 'pointer' }}>
                                        <h4>
                                            {index + 1}. {data.tahapan_desc}
                                            <Badge pill color={colorBadge} className="float-right">{this.getProgress(index)}</Badge>
                                        </h4>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.collapse === index + 1}>
                                        {this.isPPK() &&
                                            <CardBlock className="card-body">
                                                <Row>
                                                    <Col md="6">
                                                        <ol type="a">
                                                            {index === 0 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'persiapan').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="4">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
                                                                                </Col>
                                                                                <Col md="4">
                                                                                    <Input type="file" id="file-input" name="file-input" onChange={this.setFile}/>
                                                                                </Col>
                                                                                <Col md="4">
                                                                                    <Button color="primary" onClick={this.uploadFile}>Upload</Button>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {index === 1 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'pelaksanaan').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="4">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
                                                                                </Col>
                                                                                <Col md="4">
                                                                                    <Input
                                                                                        type="file"
                                                                                        id="file-input"
                                                                                        name="file-input"
                                                                                    />
                                                                                </Col>
                                                                                <Col md="4">
                                                                                    <Button type="button" color="primary">Upload</Button>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {index === 2 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'serah_terima').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="4">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
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
                                                        <h6>Generate File Berita Acara Pelaksanaan<Button color="link" onClick={this.showBerhasilGenerate} style={{marginLeft: 5, padding: 0, fontSize: 16}}>disini</Button></h6>
                                                        <Modal isOpen={this.state.suksesBikinBap} toggle={this.showBerhasilGenerate} className='modal-success'>
                                                            <ModalHeader toggle={this.showBerhasilGenerate}>BAP sukses dibuat!</ModalHeader>
                                                            <ModalBody>
                                                                Berita Acara Pelaksanaan berhasil dibuat! Klik unduh untuk melihat.
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <a color="primary" href="https://cdn.simonev.dualboot.id/get/simonev/BERITA ACARA PELAKSANAAN.pdf" target="_blank">Unduh</a>{' '}
                                                            </ModalFooter>
                                                        </Modal>
                                                    </Col>
                                                    <Col md="6">
                                                        <Row style={{ marginBottom: 10 }}>
                                                            <Col md="3">
                                                                <DatePicker
                                                                    selected={this.state.startDate}
                                                                    onChange={this.handleDateChange}
                                                                    dateFormat="DD/MM/YYYY"
                                                                    isClearable={true}
                                                                    placeholderText="Click to select a date"
                                                                />
                                                            </Col>
                                                            <Col md="9">
                                                                <Button color="primary" size="sm">Set Tanggal</Button>
                                                            </Col>
                                                        </Row>
                                                        {/*will be show suggestion list if warning or danger*/}
                                                        {this.renderSugestionCard(index)}
                                                        {this.renderCommentSection()}
                                                    </Col>
                                                </Row>
                                            </CardBlock>
                                        }
                                        {!this.isPPK() &&
                                            <CardBlock className="card-body">
                                                <Row>
                                                    <Col md="6">
                                                        <ol type="a">
                                                            {index === 0 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'persiapan').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="6">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
                                                                                </Col>
                                                                                <Col md="6">
                                                                                    <a href="#">File {sub.tahapan_action_desc}.pdf</a>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {index === 1 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'pelaksanaan').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="6">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
                                                                                </Col>
                                                                                <Col md="6">
                                                                                    <a href="#">File {sub.tahapan_action_desc}.pdf</a>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {index === 2 &&
                                                                this.props.subTahapan.filter(i => i.tahapan_id === 'serah_terima').map(sub => {
                                                                    return (
                                                                        <li>
                                                                            <FormGroup row>
                                                                                <Col md="6">
                                                                                    <Label htmlFor="file-input">{sub.tahapan_action_desc}</Label>
                                                                                </Col>
                                                                                <Col md="6">
                                                                                    <a href="#">File {sub.tahapan_action_desc}.pdf</a>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ol>
                                                        <h6>Unduh File Berita Acara Pelaksanaan<a href="https://cdn.simonev.dualboot.id/get/simonev/BERITA ACARA PELAKSANAAN.pdf" target="_blank">&nbsp;disini</a></h6>
                                                    </Col>
                                                    <Col md="6">
                                                        <Row style={{ marginBottom: 10 }}>
                                                            <Col md="3">
                                                                <label>Tanggal Selesai</label>
                                                                <DatePicker
                                                                    selected={this.state.startDate}
                                                                    onChange={this.handleDateChange}
                                                                    dateFormat="DD/MM/YYYY"
                                                                    disabled={true}
                                                                    placeholderText="Click to select a date"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        {this.renderSugestionCard(index)}
                                                        {this.renderCommentSection()}
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
