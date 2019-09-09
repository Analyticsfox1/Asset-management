import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import * as urls from '../../utils/api'
import {Growl} from 'primereact/growl';

let fetchApi = require('../../utils/fetch').fetchApi()

export default class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            cpassword: '',
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    callbackFn = (res) => {
        if(res.code === 'success'){
            this.growl.show({life: 8000, severity: 'success', summary: 'Password updated successfully.', detail: 'Your password has been reset successfuly.', closable:'true' });
            this.props.history.push('/')
        } 
        if(res.code === 'UNF'){
            this.growl.show({life: 8000, severity: 'error', summary: 'User not registeres.', detail: 'Seems like this user is not registered with us.', closable:'true' });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.email, this.state.password, this.state.cpassword)
        if(this.state.email === '' || this.state.password === '' || this.state.cpassword === ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful', detail: 'Please fill all the fields.', closable:'true' });
        } 
        else if(this.state.password !== this.state.cpassword) {
            this.growl.show({life: 8000, severity: 'error', summary: 'Passwords donot match.', detail: 'Please try again.', closable:'true' });
        } 
        else {
            const body = JSON.stringify({username:this.state.email, password: this.state.password})
            fetchApi.fetchData(urls.reset_password, 'POST', body, this.callbackFn)
        }
    }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Growl ref={(el) => this.growl = el} />
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