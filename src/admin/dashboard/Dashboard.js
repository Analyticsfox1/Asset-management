import React from 'react'
import {Tabs, Tab, Modal, Button} from 'react-bootstrap'
import './dashboard.css'
import AddUser from '../../users/add-user/AddUser'
import UserList from '../../users/user-list/UserList'
import Register from '../../admin/register/Register'
import AddSoftwareAsset from '../../assets/addSoftwareAssets/AddSoftwareAsset'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmployeeModal: false,
            showAdminModal: false,
            showHardwareModal: false,
            showSoftwareModal: false
        }
    }

    onClickEmployee =() => {
        this.setState({showEmployeeModal:true})
    }

    onClickAdmin = () => {
        this.setState({showAdminModal:true})
    }

    onClickSoftware = () => {
        this.setState({showSoftwareModal: true})
    }

    onClickHardware = () => {
        this.setState({showSoftwareModal: true})
    }

    handleModalClose = () => {
        this.setState({showAdminModal:false})
        this.setState({showEmployeeModal:false})
        this.setState({showHardwareModal: false})
        this.setState({showSoftwareModal: false})
    }

    render(){
        return(
            <div className="main-container">
                <Tabs defaultActiveKey="dashboard" className="tabs">
                    <Tab className="tab" eventKey="dashboard" title="DASHBOARD">
                        <p>DASHBOARD</p>
                    </Tab>
                    <Tab className="tab" eventKey="assets" title="ASSETS">
                        <div className="row">
                            <div className="col-md-9"></div>
                        </div>
                    </Tab>
                    <Tab className="tab" eventKey="users" title="EMPLOYEES">
                        <div className="row">
                                <div className="col-md-9 section">
                                    <UserList/>
                                </div>
                                <div className="col-md-3 col-sm-12 col-xs-12 section">
                                    <Button variant="info addButton" onClick={this.onClickEmployee}>Add New Employee</Button>
                                    <Button variant="info addButton" onClick={this.onClickAdmin}>Add New Administrator</Button>
                                    <Button variant="info addButton" onClick={this.onClickSoftware}>Add Software Asset</Button>
                                    <Button variant="info addButton" onClick={this.onClickHardware}>Add Hardware Asset</Button>
                                </div> 
                        </div>
                    <Modal show={this.state.showEmployeeModal} onHide={this.handleModalClose} className="modalBody">
                        <Modal.Header closeButton size="lg">
                            <Modal.Title>Employee Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <AddUser></AddUser>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleModalClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showAdminModal} onHide={this.handleModalClose}  className="modalBody" >
                        <Modal.Header closeButton>
                            <Modal.Title>Register New Administrator</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p><Register/></p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleModalClose}>Close</Button>  
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showSoftwareModal} onHide={this.handleModalClose}  className="modalBody" >
                        <Modal.Header closeButton>
                            <Modal.Title>New Software Asset</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <AddSoftwareAsset/>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleModalClose}>Close</Button>  
                        </Modal.Footer>
                    </Modal>
                    </Tab>
                    <Tab className="tab" eventKey="reports" title="REPORTS">
                        <p>REPORTS</p>
                    </Tab>
                    <Tab className="tab" eventKey="common_assets" title="Common Assets">
                        <p>COMMON ASSETS</p>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}