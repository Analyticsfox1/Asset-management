import React from 'react'
import {Card, Form, InputGroup, Button, FormControl} from 'react-bootstrap'
import {MultiSelect} from 'primereact/multiselect';
import '../../bootstrap-multiselect.css'
import DatePicker from "react-datepicker";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primeicons/primeicons.css';
import "react-datepicker/dist/react-datepicker.css";
import './AddUser.css'


export default class AddUser extends React.Component {
    constructor(props){
        super(props);
        this.list_hardware = []
        this.state = {
            empid: '',
            fname: '',
            lname: '',
            email: '',
            phone: '',
            mobile: '',
            address: '',
            designation: '',
            department: '',
            doj: new Date(),
            status: '',
            list_hardware: [],
            hardware_assets_owned: {category: '', details: { prod_description: '', ram: '', supplier: '', model_number: '', serial_number: '', purchase_date: '', issue_date: '', product_warranty:'', bill_no: '', earlier_used: '', product_warranty: '', product_cost: '', remarks:'' }},
            software_assets_owned: [],
            hardware_category: "",
            prod_description: '', ram:'', supplier: '', model_number:'', serial_number:'',purchase_date:'', issue_date:'', product_warranty:'',bill_no:'', earlier_used:''
            ,product_remarks:'', product_cost:''   
        }
    }


    handleDateChange = (date) => {
        this.setState({
          doj: date, 
        });
    }

    handleChange = (e) => {

        const categoryName = e.target.name;
        const categoryValue = e.target.value;
        
        switch(categoryName){
            case 'hardware_category': {
                this.setState({hardware_category:categoryValue})
                this.state.hardware_assets_owned.category = categoryValue;
                break;
            }
            case 'prod_description':
            case 'ram':
            case 'supplier':
            case 'model_number':
            case 'serial_number':
            case 'prchase_date':
            case 'issue_date':
            case 'product_warranty':
            case 'bill_no':
            case 'product_cost':
            case 'remarks': 
            case 'earlier_used': {
                this.state.hardware_assets_owned.details[categoryName] = categoryValue;
                break;
            }
            default: {
                this.setState({[categoryName]: categoryValue});
            }
        }

        this.setState({hardware_assets_owned: this.state.hardware_assets_owned});

        
    };
   
    handleSubmit = (e) => {
        e.preventDefault();
        
        const {empid,fname, lname, email, phone, mobile, address, department, designation, hardware_assets_owned,software_assets_owned, doj} = this.state;
                
        var user_data = {"empid":empid, "fname":fname, "lname":lname, "email":email, "phone":phone, "mobile":mobile, "address":address, "department": department, "designation": designation, "hardware_assets_owned": hardware_assets_owned, "software_assets_owned": software_assets_owned}
        
        localStorage.setItem("user_data", JSON.stringify(user_data))

        localStorage.setItem("hardware_assets", JSON.stringify(this.state.list_hardware))
    }

    addHardwareAsset = () => {

        let hardware_assets_owned = {};

        hardware_assets_owned = this.state.hardware_assets_owned;

        this.state.hardware_assets_owned = { '' : { prod_description: '', ram: '', supplier: '', model_number: '', serial_number: '', purchase_date: '', issue_date: '', product_warranty:'', bill_no: '', earlier_used: '', product_warranty: '', product_cost: '', remarks:'' }};

        this.state.list_hardware.push(hardware_assets_owned);

    }

    handleAddMore = (e) => {
       this.refs.prod_description.value = ''
       this.refs.supplier.value = ''
       this.refs.model_number.value = ''
       this.refs.serial_number.value = ''
       this.refs.purchase_date.value = ''
       this.refs.issue_date.value = ''
       this.refs.earlier_used.value = ''
       this.refs.remarks.value = '' 
       this.refs.product_cost.value= ''
       this.refs.product_warranty.value = ''
       this.refs.bill_no.value = ''
         
    }

    render(){
        const {hardware_category} = this.state
        return(
            <div>
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px', width: '1200px' }}>
                    <Card.Body>
                        <Form>
                            <div className="row" className="heading">
                                <div className="col-md-4"><hr/></div>
                                <div className="col-md-4" className="heading"><h3 style={{color:'#00c2c7'}}>Employee Details</h3></div>
                                <div className="col-md-4"><hr/></div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                <Form.Group>
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control ref={this.empid} type="text" name="empid" placeholder="Employee ID" onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control ref={this.fname} type="text" name="fname" placeholder="First Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control ref={this.lname} type="text" name="lname" placeholder="Last Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup className="mb-3">
                                        
                                            <FormControl
                                                placeholder="Email"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                name = "email"
                                                onChange={this.handleChange}
                                            />
                                            <InputGroup.Append>
                                            <InputGroup.Text>@analyticsfoxsoftwares.com</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control ref={this.phno} type="text" placeholder="Phone Number" name="phone" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control ref={this.mobile} type="text" placeholder="Mobile Number" name="mobile" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control name="address" as="textarea" rows="3" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control ref={this.department} type="text" name="department" placeholder="Department" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Designation</Form.Label>
                                        <Form.Control ref={this.designation} type="text" name="designation" placeholder="Designation" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Date of Joining</Form.Label>
                                        <div className="row">
                                        <DatePicker
                                            className="datePicker"
                                            name="doj"
                                            selected={this.state.doj}
                                            onChange={this.handleDateChange}/>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                        </Form>
                        <div className="row" className="heading">
                            <div className="col-md-4"><hr/></div>
                            <div className="col-md-4" className="heading"><h3 style={{color:'#00c2c7'}}>Hardware Assets</h3></div>
                            <div className="col-md-4"><hr/></div>
                        </div>
                        
                        <div className="row">
                            <Form>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Hardware Category</Form.Label>
                                    <Form.Control as="select" name="hardware_category" onChange={this.handleChange}> 
                                        <option>Laptop</option>
                                        <option>Desktop</option>
                                        <option>Monitor</option>
                                        <option>Keyboard</option>
                                        <option>Mouse</option>
                                        <option>Laptop Bag</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" name="prod_description" rows={3} onChange={this.handleChange} placeholder="Product Description" ref="prod_description"/>
                                        </Form.Group>
                                    </div>
                                {this.state.hardware_category === "Laptop" && 
                                    <div className="col-md-4">
                                        <Form.Group className="form-group required">
                                            <Form.Label className="control-label">RAM</Form.Label>
                                            <Form.Control type="text" name="ram" onChange={this.handleChange} placeholder="RAM" ref="ram"/>
                                        </Form.Group>
                                    </div> 
                                }
                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Supplier</Form.Label>
                                            <Form.Control type="text" name="supplier" onChange={this.handleChange} placeholder="Supplier" ref="supplier"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Model number</Form.Label>
                                            <Form.Control type="text" name="model_number" onChange={this.handleChange} placeholder="Model Number" ref="model_number" />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Serial number</Form.Label>
                                            <Form.Control type="text" name="serial_number" onChange={this.handleChange} placeholder="Serial Number" ref="serial_number"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Date of purchase</Form.Label>
                                            <Form.Control type="text" name="purchase_date" onChange={this.handleChange} placeholder="Purchase Date" ref="purchase_date"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                    <Form.Group  className="form-group required">
                                        <Form.Label className="control-label">Issue Date</Form.Label>
                                        <Form.Control type="text" name="issue_date" onChange={this.handleChange} placeholder="Issue Date" ref="issue_date"/>
                                    </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Product Warranty</Form.Label>
                                        <Form.Control type="text" name="product_warranty" placeholder="Warranty" onChange={this.handleChange} ref="product_warranty"/>
                                    </Form.Group>
                                    </div> 

                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Bill Number</Form.Label>
                                            <Form.Control type="text" name="bill_no" onChange={this.handleChange} placeholder="Bill number" ref="bill_no"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group className="form-group required">
                                            <Form.Label className="control-label">Price</Form.Label>
                                            <Form.Control type="text" name="product_cost" onChange={this.handleChange} placeholder="Product Price" ref="product_cost"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Earlier Used By</Form.Label>
                                            <Form.Control type="text" name="earlier_used" onChange={this.handleChange} placeholder="Earlier Used By" ref="earlier_used"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Remarks</Form.Label>
                                            <Form.Control as="textarea" name="remarks" rows={3} onChange={this.handleChange} placeholder="Remarks" ref="remarks"/>
                                        </Form.Group>
                                    </div>
                                </div> 
                                <div className="row buttons">
                                    <div className="col-md-6">
                                        <Button variant="info" className="btnAdd" onClick={this.addHardwareAsset}>Save</Button>
                                    </div>
                                    <div className="col-md-6">
                                        <Button variant="info" className="btnAdd" onClick={this.handleAddMore}>Add More</Button>
                                    </div>
                                </div>
                                
                                
                        <div className="row" className="heading" style={{marginTop: '20px'}}>
                            <div className="col-md-4"><hr/></div>
                            <div className="col-md-4" className="heading"><h3 style={{color:'#00c2c7'}}>Software Assets</h3></div>
                            <div className="col-md-4"><hr/></div>
                        </div>
                        </Form>
                    </div>
                        <div className="row">
                            <Form>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Software Category</Form.Label>
                                    <Form.Control as="select" name="software_category" onChange={this.handleChange}> 
                                        <option>Software 1</option>
                                        <option>Software 2</option>
                                        <option>Software 3</option>
                                        <option>Software 4</option>
                                        <option>Software 5</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">License Name</Form.Label>
                                        <Form.Control type="text" name="ram" onChange={this.handleChange} placeholder="License Name" ref="ram"/>
                                    </Form.Group>
                                </div> 
                                <div className="col-md-4">
                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">License Identification Number</Form.Label>
                                        <Form.Control type="text" name="ram" onChange={this.handleChange} placeholder="License Identification Number" ref="ram"/>
                                    </Form.Group>
                                </div> 
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" name="prod_description" rows={3} onChange={this.handleChange} placeholder="Description" ref="prod_description"/>
                                        </Form.Group>
                                    </div>
                                        <div className="col-md-4">
                                            <Form.Group className="form-group required">
                                                <Form.Label className="control-label">Cost</Form.Label>
                                                <Form.Control type="text" name="ram" onChange={this.handleChange} placeholder="Cost" ref="ram"/>
                                            </Form.Group>
                                        </div> 
                                    <div className="col-md-4">
                                        <Form.Group className="form-group required">
                                            <Form.Label className="control-label">Software Category</Form.Label>
                                            <Form.Control as="select" name="software_category" onChange={this.handleChange}> 
                                                <option>Category 1</option>
                                                <option>Category 2</option>
                                                <option>Category 3</option>
                                                <option>Category 4</option>
                                                <option>Category 5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                        
                                    <div className="col-md-4">
                                        <Form.Group  className="form-group">
                                            <Form.Label className="control-label">If other</Form.Label>
                                            <Form.Control type="text" name="supplier" onChange={this.handleChange} placeholder="Other category" ref="supplier"/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Purchase Date</Form.Label>
                                            <Form.Control type="text" name="supplier" onChange={this.handleChange} placeholder="Purchase Date" ref="supplier"/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Expiry Date</Form.Label>
                                            <Form.Control type="text" name="supplier" onChange={this.handleChange} placeholder="Expiry Date" ref="supplier"/>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group  className="form-group required">
                                            <Form.Label className="control-label">Model number</Form.Label>
                                            <Form.Control type="text" name="model_number" onChange={this.handleChange} placeholder="Model Number" ref="model_number" />
                                        </Form.Group>
                                    </div>
                                </div> 
                                <div className="row buttons">
                                    <div className="col-md-6 btn">
                                        <Button variant="info" className="btnAdd" onClick={this.addHardwareAsset}>Save</Button>
                                    </div>
                                    <div className="col-md-6 btn">
                                        <Button variant="info" className="btnAdd" onClick={this.handleAddMore}>Add More</Button>
                                    </div>
                                </div>
                                 <hr/>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit} >
                                Save Changes
                            </Button> 
                             </Form>
                        </div>
                   
                    </Card.Body>
                </Card>
            </div>
        )
    }
}