import React from 'react'
import {Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import './addSoftwareAssets.css'
import {Growl} from 'primereact/growl';


let validators = require('../../validators').validators()

export default class AddSoftwareAsset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            software_name: '',
            license_name: '',
            license_identification_number: '',
            desc: '',
            cost: '',
            software_category: '',
            other: '',
            purchase_date: new Date(),
            expiry_date: new Date(),
            disableOther: true
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
        if(e.target.name == "other" || (e.target.name == "software_category" && e.target.value == "Other")) {
            console.log('Before',this.state.disableOther)
            this.setState({disableOther: false})
            console.log('After',this.state.disableOther)
        } else {
            this.setState({disableOther: true})
        }
     
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {software_name, license_name, license_identification_number, desc, cost, software_category, other, purchase_date,
            expiry_date} = this.state
        
        var ValidationChk = ''
        if(software_name !== '' ||license_name !== '' || license_identification_number !== '' || cost !== ''){
            if(!validators.RegexAlphaNumeric(license_name)){
                ValidationChk += 'License Name must be alphanumeric'
            }
            if(!validators.RegexAlphaNumeric(license_identification_number)){
                ValidationChk += 'License Identification Number must be alphanumeric'
            }
            if(!validators.RegexPrice(cost)){
                ValidationChk += 'Cost must be numeric'
            }
            if(ValidationChk !== ''){
                ValidationChk = 'Please fill valid details ' + ValidationChk
            }
            else {
                var obj = {software_name: software_name, license_name: license_name, license_identification_number: license_identification_number, desc: desc, cost: cost, software_category: software_category, other: other,purchase_date: purchase_date,expiry_date: expiry_date}
                var arr = []
                localStorage.setItem('New_software_asset', arr.push(obj))
                this.growl.show({life: 8000, severity: 'success', summary: 'Software asset added successfully!', detail: 'New Software Asset was successfully added.', closable:'true' });
            }
        }
        else {
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful - Fill all mandatory fields.', detail: 'Software name, license name, license identification number and cost are mandatory.', closable:'true' });
        }     
    }
    
    render() {
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <h2 style={{color: '#00c2c7'}}>New Software Asset</h2>
                <Growl ref={(el) => this.growl = el} />
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                       <Form>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <Form.Label>Software Name</Form.Label>
                                        <Form.Control ref={this.software_name} type="text" name="software_name" placeholder="Software Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>License Name</Form.Label>
                                        <Form.Control ref={this.license_name} type="text" name="license_name" placeholder="License Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>License Identification Number</Form.Label>
                                        <Form.Control ref={this.license_identification_number} type="text" name="license_identification_number" placeholder="License Identification Number" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control ref={this.cost} type="text" name="cost" placeholder="Cost" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="desc" rows={3} onChange={this.handleChange} placeholder="Description" ref="desc"/>
                                    </Form.Group>
                                </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formGridState">
                                    <Form.Label>Software Category</Form.Label>
                                        <Form.Control as="select" name="software_category" onChange={this.handleChange}> 
                                            <option>Category 1</option>
                                            <option>Category 2</option>
                                            <option>Category 3</option>
                                            <option>Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Mention other category</Form.Label>
                                    <Form.Control ref={this.other} type="text" name="other" placeholder="Other category" onChange={this.handleChange} disabled={this.state.disableOther}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Purchase Date</Form.Label>
                                    <div className="row">
                                    <DatePicker
                                        className="datePicker"
                                        name="doj"
                                        selected={this.state.purchase_date}
                                        onChange={this.handlePurchaseDateChange}/>
                                    </div>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Expiry Date</Form.Label>
                                    <div className="row">
                                    <DatePicker
                                        className="datePicker"
                                        name="doj"
                                        selected={this.state.expiry_date}
                                        onChange={this.handleExpireDateChange}/>
                                    </div>
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