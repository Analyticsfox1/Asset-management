import  React from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {BootstrapTable, TableHeaderColumn, SearchField, ExportCSVButton} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { CSVLink, CSVDownload } from "react-csv";




export default class commonAssetList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                data: []
        }
    }

    componentDidMount() {
        var data = JSON.parse(localStorage.getItem('common_assets'))
        console.log('common_assets',data)
        this.setState({data, data})
    }

//    onFilterTextBoxChanged = () => {
//         gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
//     }

  
    render() {
        console.log(this.state.data)
        this.state.data.map(item => console.log('Item', item))
        const columnDefs = [{
            headerName: "Name", field: "name",sortable: true 
          }, {
            headerName: "Desc", field: "desc",sortable: true 
          }]
          const gridOptions = {
              rowData : this.state.data,
              columnDefs : columnDefs
          }
        return(
            <div >
            <CSVLink data={this.state.data}><Button variant="success">Export CSV</Button> </CSVLink>

            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Model Number</th>
                                        <th>Serial Number</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.data && this.state.data.map((item) => {
                                    return(
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.model_number}</td>
                                            <td>{item.serial_number}</td>
                                           
                                        </tr>
                                    )
                                }  
                                )}
                                </tbody>
                            </Table>
            </div>
        )
    }
}