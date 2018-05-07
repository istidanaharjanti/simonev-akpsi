import './css/jquery.dataTables.css';
import React, { Component } from 'react';
import Cookies from 'js-cookie';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class DataTbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: ({}),
    }
  }
    componentDidMount(){
      this.$el = $(this.el);
      // this.$el.DataTable(this.props.data)
      this.setState({table: this.$el.DataTable(this.props.data)})
      console.log("fromdt", this.props.data)
    }

    componentWillReceiveProps(nextProps){
      const differentData = this.props.data !== nextProps.data;
      if(differentData){
        console.log("change me!")
        this.state.table.destroy()
        this.$el = $(this.el);
        this.setState({table: this.$el.DataTable(nextProps.data)})
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
        </div>
      );
    }
}