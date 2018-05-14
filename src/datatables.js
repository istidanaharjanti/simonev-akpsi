import './css/jquery.dataTables.css';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class DataTbl extends Component {
  constructor(props) {
    super(props);
    const sessionCookie = JSON.parse(Cookies.get('userSession'))
    this.state = {
      table: ({}),
      assignVal: [],
      userData: sessionCookie.data ? sessionCookie.data : {},
      showPaketDetail: false
    }
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.setState({ table: this.$el.DataTable(this.props.data) })
    console.log("fromdt", this.props.data);
    if(this.state.userData.jabatan === 'kpa') {
    const urlKPA = `${process.env.API_HOST}/kpa/paket/spse/2018/set-tipe-pekerjaan`
      this.setTipePekerjaan(urlKPA)
    }
    if(this.isKabag()) {
    const urlKabag = `${process.env.API_HOST}/kabag/paket/spse/2018/set-tipe-pekerjaan`
      this.assignKPA();
      this.setTipePekerjaan(urlKabag);
      this.assignPjFunc();
    }
  }
  componentDidUpdate() {
    if (this.isKabag()) {
      this.state.table.columns( 8 ).visible( this.props.visibility );
      this.state.table.columns( 10 ).visible( !this.props.visibility );
      this.state.table.columns( 11 ).visible( this.props.detailView );
    }
    if(this.state.userData.jabatan === 'kpa') {
      console.log('test')
      this.state.table.columns( 9 ).visible( this.props.detailView );
    }
  }
  isKabag() {
    return this.state.userData.jabatan === 'kabag'
  }

  assignKPA() {
    $(document).on('change', '.assign-checkbox', function () {
      console.log($(this).find('input').is(':checked'))
      var id = $(this).find('input').attr('id')
      var val = []
      val.push({
        "paket_id": id.replace('assign-', ''),
        "status": $(this).find('input').is(':checked')
      })
      console.log("val: ", val)
      axios({
        url: `${process.env.API_HOST}/kabag/paket/spse/2018/assign`,
        method: 'POST',
        data: val,
        headers: {
          'Authorization': Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log("resp", response.data.data)
      }).catch((err) => {
        alert(err)
      })
    })
  }

  setTipePekerjaan(url) {
    $(document).on('change', '.set-tipe-checkbox', function () {
      console.log($(this).val())
      console.log($(this).attr('class'))
      console.log($(this).closest('.set-tipe-checkbox').attr('id'))
      var id = $(this).closest('input').attr('id')
      var tp = 'monitoring'
      if(!$(this).is(':checked')){
        tp = 'evaluasi'
      }
      var val = []
      val.push({
        "paket_id": id.replace('set-tipe-', ''),
        "tipe_pekerjaan": tp
      })
      console.log("val: ", val)
      axios({
        url: url,
        method: 'POST',
        data: val,
        headers: {
          'Authorization': Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log("resp", response.data.data)
      }).catch((err) => {
        alert(err)
      })
    })
  }
  assignPjFunc() {
    const url = `${process.env.API_HOST}/kabag/paket/spse/2018/pejabatf/assign`
    $(document).on('change', '.select-pejabat-fn', function () {
      const nip = $(this).val();
      const id= $(this).closest('.select-pejabat-fn').attr('id');
      const val = [];
      val.push({
        "paket_id": id.replace('pejabatFn-', ''),
        "pegawai_nip": nip
      });
      console.log(val);
      axios({
        url: url,
        method: 'POST',
        data: val,
        headers: {
          'Authorization': Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log("resp", response.data.data)
      }).catch((err) => {
        alert(err)
      })
    });
  }
  
    componentWillReceiveProps(nextProps){
        const differentData = this.props.data !== nextProps.data;
        if(differentData) {
          console.log("change me!")
          this.state.table.destroy()
          this.$el = $(this.el);
          this.setState({ 
            table: this.$el.DataTable(nextProps.data), 
            // showPaketDetail: nextProps.showPaketDetail
          })
        }
      return differentData
      }

    render() {
        return(
        <div>
      <table className="display" width="150%" ref={el => this.el = el}>
      </table>
        </div >
      );
  }
}