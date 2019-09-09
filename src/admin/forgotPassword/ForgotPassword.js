import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import * as urls from '../../utils/api'
import {Growl} from 'primereact/growl';

let fetchApi= require('../../utils/fetch').fetchApi()

export default class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            show: false,
            alertMessage: ''
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    callbackFn = (res) => {
        if(res.code === "success"){
            this.props.history.push('/reset-password')
        }
        if(res.code === "UNF") {
            this.growl.show({life: 8000, severity: 'error', summary: 'Email not registered.', detail: 'Kindly re-check email or register to continue.', closable:'true' });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.email)
        if (this.state.email === ''){
            this.growl.show({life: 8000, severity: 'error', summary: 'Unsuccessful', detail: 'Please enter registered email ID.', closable:'true' });
        } 
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){        
            var body = JSON.stringify({username: this.state.email})
            fetchApi.fetchData(urls.forgot_password, 'POST', body, this.callbackFn)
        }
        else {
            this.growl.show({life: 8000, severity: 'error', summary: 'Invalid email.', detail: 'Please enter a valid email ID.', closable:'true' });
        }
      }

    render() {
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', height:'auto', flexDirection:'column', padding:'30px'}}>
                <Growl ref={(el) => this.growl = el} />
                <h1 style={{color: '#00c2c7'}}>Forgot Password</h1>
                <Card className="col-md-5 col-sm-10 col-xs-10" style={{ height:'auto', padding: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Please enter the email ID which is registered with us. </Form.Label>
                                <Form.Control ref={this.email} type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                            </Form.Group>

                            <Button block style={{backgroundColor: '#00c2c7'}} type="submit" onClick={this.handleSubmit} >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
               <p className="mt-3"><Link to='/'>Take me to Login</Link></p>
            </div>
        )
    }
}