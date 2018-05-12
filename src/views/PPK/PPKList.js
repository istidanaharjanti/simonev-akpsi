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
  
  render() {
    return (
      <div className="animated fadeIn">
        <h1>Data Paket SPSE Tahun 2018</h1>
      </div>
    );
  }
}

export default PPKList;
