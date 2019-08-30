import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert, InputGroup, FormControl } from 'react-bootstrap';

export default class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: '',
            show: false,
            alertMessage: '',
            variant: 'danger'
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const {fname, lname, email, password, cpassword} = this.state
        if(fname === '' || lname === '' || email === '' || password === '' || cpassword === ''){
           this.setState({alertMessage:'Please fill all the fields'})
           this.setState({show: true})
        }
        else{
            if (password !== cpassword){
                this.setState({alertMessage: 'Passwords do not match. Please enter passwords again.'})
                this.setState({variant: 'danger'})
                this.setState({show: true})
            }
            else {
                localStorage.setItem("fname", fname)
                localStorage.setItem("lname", lname)
                localStorage.setItem("email", email+'@analyticsfoxsoftwares.com')
                localStorage.setItem("password", password)
                this.setState({alertMessage: 'Registration Successful!'})
                this.setState({variant: 'success'})
                this.setState({show: true})
            }
        }
    }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Alert show={this.state.show} variant={this.state.variant}>
                {this.state.alertMessage}
                <div className="d-flex justify-content-end">
                    <Link onClick={() => this.setState({show: false})} variant="danger" height="10px">
                        Close
                    </Link>
                </div>
                </Alert>
                <h2 style={{color: '#00c2c7'}}>New Administrator</h2>
                <Card className="col-md-5 col-sm-10 col-xs-10" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                        <Form>
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
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control ref={this.lname} type="text" name="lname" placeholder="Contact Number" onChange={this.handleChange}/>
                            </Form.Group>
                        
                            <Button block style={{backgroundColor: '#00c2c7'}} type="submit" onClick={this.handleSubmit} >
                                Add New Administrator
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}