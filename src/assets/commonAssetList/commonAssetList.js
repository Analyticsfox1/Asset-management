import  React from 'react'
import {Button, Table} from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './commonAssetList.css'
import { CSVLink } from "react-csv";


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

    searchFilter = () => {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else if (tr[i].id != 'tableHeader'){tr[i].style.display = "none";}
        }
    }

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
                <input type="text" id="myInput" style={{float:"right", borderRadius: '3px', height: '2.2rem', width: '15rem', borderWidth: 1,borderColor: '#CDC9C8', boxShadow: 'none', outline: 0}} onKeyUp={this.searchFilter} placeholder="Search.."/    >

                <Table striped bordered hover responsive id="myTable" style={{marginTop: '20px'}}>
                        <thead>
                            <tr  id='tableHeader'>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Model Number</th>
                                <th>Serial Number</th>
                                <th>Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data && this.state.data.map((item) => {
                            return(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.category}</td>
                                    <td>{item.model_number}</td>
                                    <td>{item.serial_number}</td>
                                    <td>{item.unit_price}</td>
                                    
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