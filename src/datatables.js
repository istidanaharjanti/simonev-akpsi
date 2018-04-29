import './css/jquery.dataTables.css';
import React, { Component } from 'react';
import Cookies from 'js-cookie';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class DataTbl extends Component {
    componentDidMount(){
      this.$el = $(this.el);
      this.$el.DataTable(this.props.data)
    }
    render() {
      return(
        <div>
          <table className="display" width="100%" ref={el => this.el = el}>
          <thead>
            <tr>
            {this.props.dataHeader.map(function(i,h){
              return <th key={h}>{i}</th>
            })
          }
          </tr>
        </thead>
          </table>
        </div>
      );
    }
}