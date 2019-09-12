import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import * as urls from '../../utils/api'
import {Growl} from 'primereact/growl';
let fetchApi = require('../../utils/fetch').fetchApi()
let validators = require('../../validators').validators()


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    callbackFn = (res) => {
        if(res.code === 'UF'){
            this.props.history.push('/dashboard')
        }
        if(res.code === 'UNF') {
            this.growl.show({life: 8000, severity: 'error', summary: 'Login unsuccessful.', detail: 'This email is not registered with us. Kindly register to continue.', closable:'true' });
        }
        if(res.code === "WP") {
            this.growl.show({life: 8000, severity: 'error', summary: 'Incorrect Password.', detail: 'The password entered is incorrect. Please try again.', closable:'true' });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.state   
        const body = JSON.stringify({username: this.state.email, password: this.state.password})
        if(email !== '' || password !== ''){
            if (validators.RegexEmail(email)){
                fetchApi.fetchData(urls.admin_login, 'POST', body, this.callbackFn)                    
            } else{
                this.growl.show({life: 8000, severity: 'error', summary: 'Invalid email.', detail: 'Please enater a valid email ID.', closable:'true' });
            }

        } else {
            this.growl.show({life: 8000, severity: 'error', summary: 'Invalid credentials.', detail: 'Please enater email and password.', closable:'true' });
        } 
      }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Growl ref={(el) => this.growl = el} />
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