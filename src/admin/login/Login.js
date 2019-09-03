import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Alert, Card } from 'react-bootstrap'
let validators = require('../../validators').validators()


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            show: false,
            alertMessage: ''
        }
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const registered_email = localStorage.getItem("email")
        const registered_password= localStorage.getItem("password")
        const {email, password} = this.state
        

        
        console.log(this.state.email, this.state.password)
        if(email !== '' || password !== ''){
            if (validators.RegexEmail(email)){
                if(email !== registered_email || password !== registered_password){
                    this.setState({alertMessage: 'Invalid credentials. Please try again.'})
                    this.setState({show: true})
                } 
                else{
                    this.setState({show: false})
                    this.props.history.push('/dashboard')
                }
            } else{
                this.setState({show: true})
                this.setState({alertMessage: 'Please enater a valid email ID.'})
            }

        } else {
            this.setState({alertMessage: 'Please enter email and password'})
            this.setState({show: true})
        } 
      }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Alert variant={'info'} show={this.state.show}>{this.state.alertMessage}</Alert>
                <h1 style={{color: '#00c2c7'}}>Login</h1>
                <Card className="col-md-5 col-sm-10 col-xs-10" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={this.email} type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={this.password} type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                            </Form.Group>
                            <div className="float-right"><Link to='/forgot-password'>Forgot Password?</Link></div>
                            <Button block style={{backgroundColor:'#00c2c7'}} type="submit" onClick={this.handleSubmit} >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}