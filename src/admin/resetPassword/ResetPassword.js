import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Card, Form, Alert} from 'react-bootstrap'

export default class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            cpassword: '',
            show: false,
            alertMessage:''
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.email, this.state.password, this.state.cpassword)
        if(this.state.email === '' || this.state.password === '' || this.state.cpassword === ''){
            this.setState({alertMessage:'Please fill all the fields.'})
            this.setState({show: true})
        } 
        else if(this.state.email !== localStorage.getItem("email")){
            this.setState({alertMessage:'This email isn\'t registered with us'})
            this.setState({show: true}) 
        }
        else if(this.state.password !== this.state.cpassword) {
            this.setState({alertMessage:'Passwords donot match. Please try again'})
            this.setState({show: true}) 
        } else {
            this.setState({show: false})
            localStorage.setItem("password", this.state.cpassword)
            alert('Password reset succesful!')
            this.props.history.push('/')
        }
    }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Alert variant={'danger'} show={this.state.show}>{this.state.alertMessage}
                <div className="d-flex justify-content-end">
                        <Link onClick={() => this.setState({show: false})} variant="danger" height="10px">
                            Close
                        </Link>
                    </div>
               </Alert>
                <h1 style={{color: '#00c2c7'}}>Reset Password</h1>
                <Card className="col-md-5 col-sm-10 col-xs-10" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={this.email} type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={this.password} type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control ref={this.cpassword} type="password" placeholder="Re-enter Password" name="cpassword" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button block style={{backgroundColor: '#00c2c7'}} type="submit" onClick={this.handleSubmit} >
                                Reset Password
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
               <p className="mt-3"> <Link to='/'>Back to login</Link></p>
            </div>
        )
    }
}