import React from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn, SearchField, ExportCSVButton} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './UserList.css'


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
        var hardwareAssets =  JSON.parse(localStorage.getItem("hardware_assets"))
        var softwareAssets = JSON.parse(localStorage.getItem('software_assets'))
        if(user_data !== null) {
            user_data["hardware_assets"] = hardwareAssets
            user_data["software_assets"] = softwareAssets
            this.setState({data:user_data})
        }
    }

    handleRowClick = (data) => {
        this.setState({selectedRowData: data.data})
        this.setState({showModal:true})
    }

    handleModalClose = () => {
        this.setState({showModal:false})
    }

    imgFormatter=(cell,row)=> {
        return  <a href="" onClick={(e) =>{e.preventDefault(); this.setState({selectedRow: row, showModal:true})}}>
                    <p>View Details</p>
                </a>
    }

    

    render(){
       

        const {selectedRow} = this.state
        return(
            <div>
                { Object.keys(this.state.data).length !== 0  ?
                     <BootstrapTable data={[this.state.data]} striped hover version='4' options={[SearchField, ExportCSVButton]} search pagination exportCSV>
                        <TableHeaderColumn isKey dataField={'empid'} width={'13%'}>Employee ID</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'fname'} width={'15%'}>Name</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'email'} width={"25%"}>Email</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'designation'}>Designation</TableHeaderColumn>
                        <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={ { whiteSpace: 'normal' } } dataField={'doj'}>Joining</TableHeaderColumn>
                        <TableHeaderColumn dataField='' dataFormat={this.imgFormatter } width={'13%'}></TableHeaderColumn>
                    </BootstrapTable>
                : <p>No data to display</p>
                }
            <Modal show={this.state.showModal} onHide={this.handleModalClose}  className="modalBody" >
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                            <p><b>Emp ID : </b> {selectedRow.empid}</p>
                            <p><b>Name : </b>{selectedRow.fname + '' + selectedRow.lname}</p>
                            <p><b>Email : </b>{selectedRow.email} </p>
                            <p><b>Mobile Number : </b>{selectedRow.mobile}</p>
                            <p><b>Department : </b>{selectedRow.department}</p>
                            <p><b>Designation : </b>{selectedRow.designation}</p>
                            <p><b>Date of Joining : </b>{JSON.stringify(new Date(selectedRow.doj)).substr(1, 10)}</p>
                            <p><b>Hardware Assets</b></p>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr id='tableHeader'>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Model Number</th>
                                        <th>Serial Number</th>
                                        <th>Issue Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedRow.hardware_assets && selectedRow.hardware_assets.map((item) => {

                                    var key = Object.keys(item)[0]
                                    var dateString = JSON.stringify(new Date(item[key].issue_date))
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

                                    var key = Object.keys(item)[0]
                                    var dateString = JSON.stringify(new Date(item[key].software_issue_date))
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
                            <div>
                                <Button variant="success" onClick={this.handleModalClose}>Edit</Button>  
                            </div>
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