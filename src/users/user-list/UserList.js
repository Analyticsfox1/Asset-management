import React from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
// import {DataTable} from 'primereact/datatable';
// import {Column} from 'primereact/column';
import {BootstrapTable, TableHeaderColumn, SearchField, ExportCSVButton} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


export default class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hardware_assets : [],
            software_assets : [],
            selectedRow : {},
            showModal: false,
            data: {}          
        }
    }

    componentDidMount(){
        var user_data = JSON.parse(localStorage.getItem("user_data"))
        // this.state.user_data.push(user_data)
        var hardwareAssets =  JSON.parse(localStorage.getItem("hardware_assets"))
        var softwareAssets = JSON.parse(localStorage.getItem('software_assets'))
        // this.state.data[2] = (user_data)
        // this.state.data[0] = (hardwareAssets)
        // this.state.data[1] = (softwareAssets)
        // this.state.data.push(user_data)
        user_data["hardware_assets"] = hardwareAssets
        user_data["software_assets"] = softwareAssets
        console.log("Hardware Assets", hardwareAssets)
        this.setState({data:user_data})

    
    }

    handleRowClick = (data) => {
        console.log('Called')
        this.setState({selectedRowData: data.data})
        this.setState({showModal:true})
        console.log(data)
    }

    handleModalClose = () => {
        this.setState({showModal:false})
    }

    imgFormatter=(cell,row)=> {
        return  <a href="#" onClick={() => this.setState({selectedRow: row, showModal:true})}>
                    <p>View Details</p>
                </a>
    }

    

    render(){
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Employees</div>;
        const {selectedRow} = this.state
     
        console.log(this.state.data)
        console.log("Selected Row",selectedRow.hardware_assets)
        return(
            <div>
                {this.state.data && 
                     <BootstrapTable data={[this.state.data]} striped hover version='4' options={[SearchField, ExportCSVButton]} search pagination exportCSV>
                        <TableHeaderColumn isKey dataField={'empid'} width={'13%'}>Employee ID</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'fname'} width={'15%'}>Name</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'email'} width={"25%"}>Email</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'designation'}>Designation</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'doj'}>Joining</TableHeaderColumn>

                        <TableHeaderColumn dataField='' dataFormat={this.imgFormatter } width={'13%'}></TableHeaderColumn>
                    </BootstrapTable>
                }
            <Modal show={this.state.showModal} onHide={this.handleModalClose}  className="modalBody" >
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                            <p><b>Emp ID : </b> {selectedRow.empid}</p>
                            <p><b>Name : </b>Name : {selectedRow.fname + '' + selectedRow.lname}</p>
                            <p><b>Email : </b>{selectedRow.email} </p>
                            <p><b>Mobile Number : </b>{selectedRow.mobile}</p>
                            <p><b>Department : </b>{selectedRow.department}</p>
                            <p><b>Designation : </b>{selectedRow.designation}</p>
                            <p><b>Date of Joining : </b>{JSON.stringify(new Date(selectedRow.doj)).substr(1, 10)}</p>
                            <p><b>Hardware Assets</b></p>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Model Number</th>
                                        <th>Serial Number</th>
                                        <th>Issue Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedRow.hardware_assets && selectedRow.hardware_assets.map((item) => {
                                    console.log(item)

                                    var key = Object.keys(item)[0]
                                    var dateString = JSON.stringify(new Date(item[key].issue_date))
                                    console.log(dateString)
                                    var date = dateString.substr(1, 10)
                                    return(
                                        <tr>
                                            <td>{key}</td>
                                            <td>{item[key].prod_description}</td>
                                            <td>{item[key].model_number}</td>
                                            <td>{item[key].serial_number}</td>
                                            <td>{date}</td>
                                        </tr>
                                    )
                                }  
                                )}
                                </tbody>
                            </Table>
                            <p><b>Software Assets</b></p>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>License Number</th>
                                        <th>License Identification Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedRow.software_assets && selectedRow.software_assets.map((item) => {
                                    console.log(item)

                                    var key = Object.keys(item)[0]
                                    var dateString = JSON.stringify(new Date(item[key].software_issue_date))
                                    console.log(dateString)
                                    var date = dateString.substring(10)
                                    return(
                                        <tr>
                                            <td>{key}</td>
                                            <td>{item[key].software_description}</td>
                                            <td>{item[key].software_sub_category}</td>
                                            <td>{item[key].license_name}</td>
                                            <td>{item[key].license_identification_number}</td>
                                            
                                        </tr>
                                    )
                                }  
                                )}
                                </tbody>
                            </Table>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleModalClose}>Close</Button>  
                        </Modal.Footer>
            </Modal>
       
            </div>
        )
    }
}