import React, { Component } from "react";
import { makeData } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class DataPaket extends Component  {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="animated fadeIn">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}


export default DataPaket;



// import React, {Component} from "react";

// class DataPaket extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
        
//       </div>
//     )
//   }
// }

// export default DataPaket;