import './css/jquery.dataTables.css';
import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class DataTbl extends Component {
    componentDidMount(){
      this.$el = $(this.el);
      this.$el.DataTable({
         "ajax": this.props.data,
         "columns": [
            { "data": "id" },
            { "data": "nama_paket" },
            { "data": "jenis_pekerjaan" },
            { "data": "lokasi_pekerjaan" },
            { "data": "pagu_paket" },
            { "data": "tahun_anggaran" },
            { "data": "unit_eselon1" }
         ]
      })
    }

    // componentWillUnmount() {
    //   this.$el.DataTable.destroy(true);
    // }
    render() {
      return(
        <div>
          <table className="display" width="100%" ref={el => this.el = el}>
          </table>
        </div>
      );
    }
}