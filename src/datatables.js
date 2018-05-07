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
      userData: sessionCookie.data ? sessionCookie.data : {}
    }
  }
  componentDidMount() {
    this.$el = $(this.el);
    // this.$el.DataTable(this.props.data)
    this.setState({ table: this.$el.DataTable(this.props.data) })
    console.log("fromdt", this.props.data)

    console.log(document.getElementsByClassName("assign-checkbox"))
    this.assignKPA()
    this.setTipePekerjaan()
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

  setTipePekerjaan() {
    const url = this.state.userData.jabatan === 'kabag' ? `${process.env.API_HOST}/kabag/paket/spse/2018/set-tipe-pekerjaan` : `${process.env.API_HOST}/kpa/paket/spse/2018/set-tipe-pekerjaan`
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

    componentWillReceiveProps(nextProps){
        const differentData = this.props.data !== nextProps.data;
        if(differentData) {
          console.log("change me!")
          this.state.table.destroy()
          this.$el = $(this.el);
          this.setState({ table: this.$el.DataTable(nextProps.data) })
        }
      return differentData
      }

    render() {
        return(
        <div>
      <table className="display" width="150%" ref={el => this.el = el}>
        {/* <thead>
            <tr>
            {this.props.dataHeader.map(function(i,h){
              return <th key={h}>{i}</th>
            })
          }
          </tr>
        </thead> */}
      </table>
        </div >
      );
  }
}