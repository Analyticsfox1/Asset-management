import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Button, Alert} from 'react-bootstrap'

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

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.email)
        if (this.state.email === ''){
            this.setState({alertMessage: "Please enter your email ID"})
            this.setState({show:true})
        } 
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            let registered_email = localStorage.getItem("email")
            if(this.state.email !== registered_email) {
                this.setState({alertMessage: "This email id is not registered with us."})
                this.setState({show: true})
            } else {
                this.props.history.push('/reset-password')
            }
        }
        else {
            this.setState({show: true})
            this.setState({alertMessage: 'Please enater a valid email ID.'})
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