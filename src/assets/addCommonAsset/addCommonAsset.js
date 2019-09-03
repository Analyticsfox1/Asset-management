import React from 'react'
import {Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import './addCommonAsset.css'

export default class AddCommonAsset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            category: '',
            supplier: '',
            price: '',
            unit_value: '',
            qty: '',
            model_number: '',
            serial_number: '',
            purchase_date: new Date()
        }
    }

    handlePurchaseDate = (date) => {
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
                <h2 style={{color: '#00c2c7'}}>New Common Asset</h2>
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                            <Form>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <Form.Label>Asset Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Name" onChange={this.handleChange}/>
                                    </Form.Group>
                                   
                                    <Form.Group>
                                        <Form.Label>Asset Description</Form.Label>
                                        <Form.Control as="textarea" name="desc" rows={3} onChange={this.handleChange} placeholder="Description" ref="desc"/>
                                    </Form.Group>
                    
                                    <Form.Group>
                                        <Form.Label>Asset Category</Form.Label>
                                        <Form.Control ref={this.other} type="text" name="category" placeholder="Category" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Supplier</Form.Label>
                                        <Form.Control type="text" name="supplier" placeholder="Supplier Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="price" placeholder="Total Price" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Unit Value</Form.Label>
                                        <Form.Control type="text" name="unit_value" placeholder="Price per unit" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="number" name="qty" placeholder="Quantity" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Model Number</Form.Label>
                                        <Form.Control type="text" name="model_number" placeholder="Model Number" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Serial Number</Form.Label>
                                        <Form.Control type="text" name="serial_number" placeholder="Serial Number" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Date of purchase</Form.Label>
                                        <div className="row">
                                        <DatePicker
                                            ref="purchase_date"
                                            className="datePicker"
                                            name="purchase_date"
                                            selected={this.state.purchase_date}
                                            onChange={this.handlePurchaseDate}/>
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