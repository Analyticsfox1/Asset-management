import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Login from './admin/login/Login'
import Register from './admin/register/Register'
import ForgotPassword from './admin/forgotPassword/ForgotPassword'
import ResetPassword from './admin/resetPassword/ResetPassword'
import Dashboard from './admin/dashboard/Dashboard'

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/forgot-password' component={ForgotPassword}/>
        <Route exact path='/reset-password' component={ResetPassword}/>
        <Route exact path='/dashboard' component={Dashboard}/>
      </div>
    </Router>
  );
}

export default App;
