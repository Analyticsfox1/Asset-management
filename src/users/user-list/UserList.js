import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


export default class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hardware_assets : [],
            software_assets : [],
            selectedRowData : {},
            showModal: false,
            data: []           
        }
    }

    componentDidMount(){
        var user_data = JSON.parse(localStorage.getItem("user_data"))
        // this.state.user_data.push(user_data)
        var hardwareAssets =  JSON.parse(localStorage.getItem("hardware_assets"))
        var softwareAssets = JSON.parse(localStorage.getItem('software_assets'))
        this.state.data.push(user_data)
        this.state.data[0] = (hardwareAssets)
        this.state.data[1] = (softwareAssets)
        this.state.data.push(user_data)
        console.log("Data",this.state.data)
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
    render(){
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Employees</div>;
        const {selectedRowData} = this.state
        return(
            <div>
            <DataTable value={this.state.data} header={header} paginator={true} rows={10} filter={true} onRowClick = {data =>  this.handleRowClick(data)}>
                <Column field="fname" header="Name" />
                <Column field="email" header="Email" />
                <Column field="designation" header="Designation" />
            </DataTable>
            <Modal show={this.state.showModal} onHide={this.handleModalClose}  className="modalBody" >
                        <Modal.Header closeButton>
                            <Modal.Title>New Software Asset</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                            <p>Name : {selectedRowData.fname + '' + selectedRowData.lname}</p>
                            <p>Email : {selectedRowData.email} </p>
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