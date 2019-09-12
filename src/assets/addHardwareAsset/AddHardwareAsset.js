import React from 'react'
import {Form, Card, Button } from 'react-bootstrap'
import './addHardwareAsset.css'
import {Growl} from 'primereact/growl';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css'
let validators = require('../../validators').validators()

export default class AddHardwareAsset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hardware_name: '',
            desc: '',
            model_no: '',
            serial_no: '',
            hardwares : []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('New_hardware_assets')){
            this.setState({hardwares: JSON.parse(localStorage.getItem('New_hardware_assets'))})
        }
    }

    handlePurchaseDateChange = (date) => {
        this.setState({
          purchase_date: date, 
        });
    }

    handleExpireDateChange = (date) => {
        this.setState({
          expiry_date: date, 
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        if(e.target.name === "other" || (e.target.name === "software_category" && e.target.value === "Other")) {
            this.setState({disableOther: false})
        } else {
            this.setState({disableOther: true})
        }
     
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { hardware_name, desc, model_no, serial_no } = this.state
        let ValidationChk = ''
        if(hardware_name !== '' || model_no !== '' || serial_no !== ''){
            if(!validators.RegexAlphaNumeric(hardware_name)){
                ValidationChk += 'Hardware name should be alphanumeric'
            }
            if(!validators.RegexAlphaNumeric(model_no)){
                ValidationChk += 'Model Number should be alphanumeric'
            }
            if(!validators.RegexAlphaNumeric(serial_no)){
                ValidationChk += 'Serial Number should be alphanumeric'
            }
            if(ValidationChk !== ''){
                ValidationChk = 'Please fill valid details -'  + ValidationChk
            }
            else {
                var obj = {hardware_name: hardware_name, desc: desc, model_no: model_no, serial_no: serial_no}
                this.state.hardwares.push(obj)
                localStorage.setItem('New_hardware_assets', JSON.stringify(this.state.hardwares))
                this.growl.show({severity: 'success', summary: 'Asset added successfully!', detail: 'New Hardware Asset', closable:'true' });
            }
        } else {
            this.growl.show({severity: 'danger', summary: 'Unsuccessful - Fill mandatory fields', detail: 'Hardware name, model number and serial number are mandatory', closable:'true' });
        }
    }
    render() {
        
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <h2 style={{color: '#00c2c7'}}>New Hardware Asset</h2>
                <Growl ref={(el) => this.growl = el} />
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                       <Form>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <Form.Label>Hardware Name</Form.Label>
                                        <Form.Control type="text" name="hardware_name" placeholder="Hardware Name" onChange={this.handleChange}/>
                                    </Form.Group>
                                   

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="desc" rows={3} onChange={this.handleChange} placeholder="Description" />
                                    </Form.Group>
                               
                    
                                <Form.Group>
                                    <Form.Label>Model Number</Form.Label>
                                    <Form.Control type="text" name="model_no" placeholder="Model Number" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control type="text" name="serial_no" placeholder="Serial Number" onChange={this.handleChange}/>
                                </Form.Group>
                                </div>
                            </Form>

                        <Button className="addButton" style={{backgroundColor: '#00c2c7'}} type="submit" onClick={this.handleSubmit} >
                            Add Asset
                        </Button>
                      
                    </Card.Body>
                </Card>
            </div>
        )
    }

}