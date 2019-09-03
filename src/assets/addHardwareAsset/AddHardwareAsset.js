import React from 'react'
import {Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import './addHardwareAsset.css'

export default class AddHardwareAsset extends React.Component {

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
        console.log(this.state)
    }
    render() {
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <h2 style={{color: '#00c2c7'}}>New Hardware Asset</h2>
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                       <Form>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <Form.Label>Software Name</Form.Label>
                                        <Form.Control ref={this.software_name} type="text" name="software_name" placeholder="Software Name" onChange={this.handleChange}/>
                                    </Form.Group>
                                   

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="desc" rows={3} onChange={this.handleChange} placeholder="Description" ref="desc"/>
                                    </Form.Group>
                               
                    
                                <Form.Group>
                                    <Form.Label>Model Number</Form.Label>
                                    <Form.Control type="text" name="other" placeholder="Other category" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control type="text" name="other" placeholder="Other category" onChange={this.handleChange}/>
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