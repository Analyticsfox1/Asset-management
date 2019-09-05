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
import {Growl} from 'primereact/growl';

let validators=require('../../validators').validators();


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
            list_software: [],
            hardware_assets_owned: {category: '', details: { prod_description: '', ram: '', supplier: '', model_number: '', serial_number: '', purchase_date: new Date(), issue_date: new Date( ),product_warranty:'', earlier_used: '', product_warranty: '', product_cost: '', remarks:'' }},
            software_assets_owned: {category: '', details: { license_name: '', license_identification_number: '', software_description: '', software_cost: '', software_sub_category: '', software_purchase_date: new Date(), software_expiry_date: new Date()}},
            hardware_category: '',
            prod_description: '', ram:'', supplier: '', model_number:'', serial_number:'',purchase_date:new Date(), issue_date:new Date(), product_warranty:'', earlier_used:'',product_remarks:'', product_cost:''  ,
            software_category:'',
            license_name: '', license_identification_number:'', software_description:'', software_sub_category:'', software_cost: '', software_purchase_date: new Date(), software_expiry_date: new Date() 
        }
    }


    handleDateChange = (date) => {
        this.setState({doj: date});
    }
    handleHardwarePurchaseDate = (date) => {
        this.setState({purchase_date: date})
    }
    handleHardwareIssueDate = (date)  => {
        this.setState({issue_date: date})
    }
    handleSoftwarePurchaseDate = (date) => {
        this.setState({software_purchase_date: date})
    }
    handleSoftwareExpiryDate = (date) => {
        this.setState({software_expiry_date: date})
    }
    handleChange = (e) => {

        const categoryName = e.target.name;
        const categoryValue = e.target.value;
        
        switch(categoryName){
            case 'hardware_category': {
                this.setState({hardware_category:categoryValue})
                break;
            }
            case 'software_category': {
                this.setState({software_category: categoryValue})
                break;
            }
            case 'prod_description':
            case 'ram':
            case 'supplier':
            case 'model_number':
            case 'serial_number':
            case 'purchase_date':
            case 'issue_date':
            case 'product_warranty':
            case 'bill_no':
            case 'product_cost':
            case 'remarks': 
            case 'earlier_used': {
                    this.state.hardware_assets_owned.details[categoryName] = categoryValue;       
                break;
            }
            case 'license_name': 
            case 'license_identification_number': 
            case 'software_description': 
            case 'software_sub_category': 
            case 'software_cost': 
            case 'software_purchase_date': 
            case 'software_expiry_date': {
                 this.state.software_assets_owned.details[categoryName] = categoryValue;
                break;
            }
            default: {
                this.setState({[categoryName]: categoryValue});
                break;
            }
        }

        this.setState({hardware_assets_owned: this.state.hardware_assets_owned});
        this.setState({software_assets_owned: this.state.software_assets_owned})

        
    };
   
    handleSubmit = (e) => {
        e.preventDefault();
        
        const {empid,fname, lname, email, phone, mobile, address, department, designation, doj} = this.state;
        var ValidationChk = ''
        if(empid === null || empid === ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful. Employee ID is mandatory', detail: 'Please fill all mandatory fields', closable:'true' });

        }
        if(!validators.RegexNames(fname)){
            ValidationChk += '-First Name'
        }
        if(!validators.RegexNames(lname)){
            ValidationChk += '-Last Name'
        }
        if(!validators.RegexAlphaNumeric(email)){
            ValidationChk += '-Email'
        }
        if(!validators.RegexPhone(phone)){
            ValidationChk += '-Phone Number'
        }
        if(!validators.RegularExpressionMobileNumber(mobile)){
            ValidationChk += '-Mobile Number'
        }
        if(!validators.RegexAlphaNumeric(address)){
            ValidationChk += '-Address'
        }
        if(!validators.RegexNames(department)){
            ValidationChk += '-Department'
        }
        if(!validators.RegexNames(designation)){
            ValidationChk += '-Designation'
        }
        if(this.state.list_hardware === []){
            ValidationChk += 'Hardware Assets'
        } 
        if(ValidationChk !== ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful. Please fill valid details', detail: ValidationChk, closable:'true' });
        }
        
        else {
            var joining = JSON.stringify(new Date(doj))
            var date = joining.substring(10)
            var user_data = {"empid":empid, "fname":fname, "lname":lname, "email":email+'@analyticsfoxsoftwares.com', "phone":phone, "mobile":mobile, "address":address, "department": department, "designation": designation, "doj": date}
        
            localStorage.setItem("user_data", JSON.stringify(user_data))
    
            localStorage.setItem("hardware_assets", JSON.stringify(this.state.list_hardware))
    
            localStorage.setItem("software_assets", JSON.stringify(this.state.list_software))
    
            console.log(user_data, this.state.list_hardware, this.state.list_software )
            this.growl.show({life: 8000, severity: 'success', summary: 'Employee added successfully!', detail: 'Employee Details were successfully added.', closable:'true' });
        }
    }

    addHardwareAsset = () => {
        var details = this.state.hardware_assets_owned.details
        let ValidationChk = '';
        if(!validators.RegexAlphaNumeric(details.prod_description)){
            ValidationChk +=  ' -Product Description must be alphanumeric';
        } 
        if(!validators.RegexAlphaNumeric(details.serial_number)){
            ValidationChk +=  '-Serial Number must be alphanumeric';
        }
        if(!validators.RegexAlphaNumeric(details.model_number)){
            ValidationChk +=  '-Model Number must be alphanumeric';
        }
        if(!validators.RegexAlphaNumericWarranty(details.product_warranty)){
            ValidationChk +=  '-Warranty must be 6 characters alphanumeric';
        }
        if(!validators.RegexPrice(details.product_cost)){
            ValidationChk += '-Product Cost must be numeric.'
        }
        if(ValidationChk !== ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful. Please fill valid details', detail: ValidationChk, closable:'true' });
        }
        else {
            console.log("Add more",this.state.hardware_assets_owned)

            let hardware_assets_owned = {};
        
            hardware_assets_owned[this.state.hardware_category] = this.state.hardware_assets_owned.details
            
            this.state.list_hardware.push(hardware_assets_owned)
            
            console.log('List of hardware assets',this.state.list_hardware)
            this.growl.show({life: 8000, severity: 'success', summary: 'Hardware Asset added successfully!', detail: 'Hardware asset was successfully added.', closable:'true' });
        }
    }

    addSoftwareAsset = () => {
        var details = this.state.software_assets_owned.details
        let ValidationChk = ''
        if(!validators.RegexAlphaNumeric(details.license_name)){
            ValidationChk += '-License name must be alphanumeric'
        }
        if(!validators.RegexAlphaNumeric(details.license_identification_number)){
            console.log(details.license_identification_number)
            ValidationChk += '-License Identification Number must be alphanumeric.'
        }
        if(!validators.RegexPrice(details.software_cost)){
            ValidationChk += '-Software Cost must be numeric'
        }
        if(ValidationChk !== ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful. Please fill valid details', detail: ValidationChk, closable:'true' });
        }
        else{
            let software_assets_owned = {}
        
            software_assets_owned[this.state.software_category] = this.state.software_assets_owned.details
            
            this.state.list_software.push(software_assets_owned)
            
            console.log('List of software assets', this.state.list_software)
            this.growl.show({life: 8000, severity: 'success', summary: 'Software Asset added successfully!', detail: 'Software asset was successfully added.', closable:'true' });

        }
    }

    handleHardwareAddMore = (e) => {
       this.refs.prod_description.value = ''
       this.refs.supplier.value = ''
       this.refs.model_number.value = ''
       this.refs.serial_number.value = ''
       this.refs.purchase_date.value = new Date()
       this.refs.issue_date.value = new Date()
       this.refs.earlier_used.value = ''
       this.refs.remarks.value = '' 
       this.refs.product_cost.value= ''
       this.refs.product_warranty.value = ''
       this.state.hardware_assets_owned= {category: '', details: { prod_description: '', ram: '', supplier: '', model_number: '', serial_number: '', purchase_date: new Date(), issue_date: new Date( ),product_warranty:'', earlier_used: '', product_warranty: '', product_cost: '', remarks:'' }}   
    }

    handleSoftwareAddMore = () => {
        this.refs.license_name.value = ''
        this.refs.license_identification_number.value = ''
        this.refs.software_description.value = ''
        this.refs.software_cost.value = ''
        this.refs.software_purchase_date = new Date()
        this.refs.software_expiry_date = new Date()
        this.state.software_assets_owned= {category: '', details: { license_name: '', license_identification_number: '', software_description: '', software_cost: '', software_sub_category: '', software_purchase_date: new Date(), software_expiry_date: new Date()}}
    }

    render(){
        return(
            <div>
                <Growl ref={(el) => this.growl = el} />
                <Card className="col-md-12 col-sm-12 col-xs-12" style={{ height:'auto', padding: '10px', width: '1200px' }}>
                    <Card.Body>
                            <div className="row" className="heading">
                                <div className="col-md-4"><hr/></div>
                                <div className="col-md-4" className="heading"><h3 style={{color:'#00c2c7'}}>Employee Details</h3></div>
                                <div className="col-md-4"><hr/></div>
                            </div>
                       
                       {/* -----------------------------------Employee General Details Fields-------------------------------------- */}
                        <Form>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                <Form.Group  className="form-group required">
                                        <Form.Label className="control-label">Employee ID</Form.Label>
                                        <Form.Control ref={this.empid} type="text" name="empid" placeholder="Employee ID" onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">First Name</Form.Label>
                                        <Form.Control ref={this.fname} type="text" name="fname" placeholder="First Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">Last Name</Form.Label>
                                        <Form.Control ref={this.lname} type="text" name="lname" placeholder="Last Name" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">Email</Form.Label>
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

                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">Mobile Number</Form.Label>
                                        <Form.Control ref={this.mobile} type="text" placeholder="Mobile Number" name="mobile" onChange={this.handleChange}/>
                                    </Form.Group>

                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">Address</Form.Label>
                                        <Form.Control name="address" as="textarea" rows="3" ref="address" onChange={this.handleChange}/>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">Department</Form.Label>
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

                        {/* ----------------------------------Hardware Assets Form Fields--------------------------------------- */}
                        
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
                                        <Form.Group  className="form-group">
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
                                        <Form.Group>
                                            <Form.Label>Date of purchase</Form.Label>
                                            <div className="row">
                                            <DatePicker
                                                ref="purchase_date"
                                                className="datePicker"
                                                name="purchase_date"
                                                selected={this.state.purchase_date}
                                                onChange={this.handleHardwarePurchaseDate}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Issue Date</Form.Label>
                                            <div className="row">
                                            <DatePicker
                                                ref="issue_date"
                                                className="datePicker"
                                                name="issue_date"
                                                selected={this.state.issue_date}
                                                onChange={this.handleHardwareIssueDate}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Product Warranty</Form.Label>
                                        <Form.Control type="text" name="product_warranty" placeholder="Warranty" onChange={this.handleChange} ref="product_warranty"/>
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
                                        <Button variant="info" className="btnAdd" onClick={this.handleHardwareAddMore}>Add More</Button>
                                    </div>
                                </div>
                        </Form>
                    </div>
                        <div className="row" className="heading" style={{marginTop: '20px'}}>
                            <div className="col-md-4"><hr/></div>
                            <div className="col-md-4" className="heading"><h3 style={{color:'#00c2c7'}}>Software Assets</h3></div>
                            <div className="col-md-4"><hr/></div>
                        </div>

                        {/* ----------------------------------Software Assets Form Fields--------------------------------------- */}

                        
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
                                        <Form.Control type="text" name="license_name" onChange={this.handleChange} placeholder="License Name" ref="license_name"/>
                                    </Form.Group>
                                </div> 
                                <div className="col-md-4">
                                    <Form.Group className="form-group required">
                                        <Form.Label className="control-label">License Identification Number</Form.Label>
                                        <Form.Control type="text" name="license_identification_number" onChange={this.handleChange} placeholder="License Identification Number" ref="license_identification_number"/>
                                    </Form.Group>
                                </div> 
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" name="software_description" rows={3} onChange={this.handleChange} placeholder="Description" ref="software_description"/>
                                        </Form.Group>
                                    </div>
                                        <div className="col-md-4">
                                            <Form.Group className="form-group required">
                                                <Form.Label className="control-label">Cost</Form.Label>
                                                <Form.Control type="text" name="software_cost" onChange={this.handleChange} placeholder="Cost" ref="software_cost"/>
                                            </Form.Group>
                                        </div> 
                                    <div className="col-md-4">
                                        <Form.Group className="form-group required">
                                            <Form.Label className="control-label">Software Category</Form.Label>
                                            <Form.Control as="select" name="software_sub_category" onChange={this.handleChange}> 
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
                                            <Form.Control type="text" name="software_other" onChange={this.handleChange} placeholder="Other category" ref="software_other"/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Purchase Date</Form.Label>
                                            <div className="row">
                                            <DatePicker
                                                ref="software_purchase_date"
                                                className="datePicker"
                                                name="software_purchase_date"
                                                selected={this.state.software_purchase_date}
                                                onChange={this.handleSoftwarePurchaseDate}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Expiry Date</Form.Label>
                                            <div className="row">
                                            <DatePicker
                                                ref="software_expiry_date"
                                                className="datePicker"
                                                name="software_expiry_date"
                                                selected={this.state.software_expiry_date}
                                                onChange={this.handleSoftwareExpiryDate}/>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> 
                                <div className="row buttons">
                                    <div className="col-md-6 btn">
                                        <Button variant="info" className="btnAdd" onClick={this.addSoftwareAsset}>Save</Button>
                                    </div>
                                    <div className="col-md-6 btn">
                                        <Button variant="info" className="btnAdd" onClick={this.handleSoftwareAddMore}>Add More</Button>
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