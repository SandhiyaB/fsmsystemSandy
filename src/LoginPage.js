import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MainPage from './MainPage';
import './LoginPage.css';
import {
  FormErrors
} from './FormErrors';
import {  browserHistory,IndexRoute } from 'react-router';
import Aboutus from './Aboutus';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReportDisplay';
import Billing from './Billing';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';
import Inventory from './Inventory';
import MainPageHeader from './MainPageHeader';
import Configuration from './Configuration';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import {unregister} from './registerServiceWorker';
import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import ReprintResult from './ReprintResult' ;

import Charts from './Charts';

class LoginPage extends Component {
 
  constructor() {
    var today = new Date();
    var dailyDate = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
   
    super()

    this.state = {

      emailId: '',
      password: '',
      dailyDate:dailyDate,
      formErrors: {
        emailId: '',
        password: ''
      },
      emailIdValid: false,
      passwordValid: false
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value
      },
      () => {
        this.validateField(name, value)
      });
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailIdValid = this.state.emailIdValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {

      case 'emailId':
       emailIdValid =value.length >= 10;
       // emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailIdValid: emailIdValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailIdValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }



  login() {
    this.setState({
      emailId: this.state.emailId,
      password: this.state.password,

    });
     var key="shinchanbaby";
    localStorage.setItem('emailL',  CryptoJS.AES.encrypt(this.state.emailId,key));
 /*    alert(this.state.emailId);
    alert(this.state.password);
    alert(JSON.stringify(this.state)); */
   alert("enter ajax");
    var self = this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          emailId: this.state.emailId,
          password: this.state.password,
          dailyDate:this.state.dailyDate,
        }),
        url: "http://localhost:8080/RestAPI/rest/login",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function(data, textStatus, jqXHR)

        {
          alert("inside sucess ajax");
          console.log(data);
          if (data.fillingStationId == "NOT_REGISTERED") {
            alert("please Register");

          } else if (data.fillingStationId == "PASSWORD_INCORRECT") {
            alert("Please check your emailId and Password");

          } else {
             var key="shinchanbaby";
            localStorage.setItem('fillingStationIdL',CryptoJS.AES.encrypt(data.fillingStationId,key));
            localStorage.setItem('UserNameL', CryptoJS.AES.encrypt(data.userName,key));
            localStorage.setItem('companyNameL', CryptoJS.AES.encrypt(data.companyName,key));
            localStorage.setItem('addressL', CryptoJS.AES.encrypt(data.address,key));
            localStorage.setItem('gstPercentageL', CryptoJS.AES.encrypt(data.gst.toString(),key));
            localStorage.setItem('mobileNoL',CryptoJS.AES.encrypt(data.mobileNo.toString(),key));
            localStorage.setItem('receiptNoL',CryptoJS.AES.encrypt(data.receiptNo.toString(),key));
            localStorage.setItem('availableInventoryL', CryptoJS.AES.encrypt(data.availableInventory.toString(),key));
            localStorage.setItem('amountCollectedL', CryptoJS.AES.encrypt(data.totalAmount.toString(),key));
            localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(),key));
            localStorage.setItem('PasswordL', CryptoJS.AES.encrypt(self.state.password.toString(),key));

            ReactDOM.render( <Router  >
              <div >
              <Route path="/" component={MainPageHeader}/>
              <Route path = "/" component = { MainPage }/>
              
             </div>
               </Router>, document.getElementById('root'));



              
            }
          },


          error: function(data) {

            alert("inside error ajax");
            console.log('#####################error:################################' + data);
            alert('Login Invalid' + data);

          },
        });
    }


    Fpassword() {
      ReactDOM.render( < ForgotPassword / > , document.getElementById('root'));
      
    }
    handleChangeun(value) {
      this.setState({
        emailId: value
      });
    }

    handleChangePd(value) {
      this.setState({
        password: value
      });
    }

    render() {
      return (

        <div className = "loginpage" id = "loginpagebg" >
        <div className = "container" >
        <div className = "containerlogin" id = "loginpage" >
        <div className = "form-signin-heading text-muted" >
        <h2 > LogIn < /h2> </div>

        <div className = "panel panel-default" >
        <FormErrors formErrors = {this.state.formErrors}/>
         </div>

        <form className = "form-signin" >
        <div className = {`form-group ${this.errorClass(this.state.formErrors.emailId)}`} >
        { /* <label className="control-label col-sm-2"  htmlFor="emailId">emailId:</label> */ }

        <input type = "email"value = {this.state.emailId}
        onChange = {this.handleUserInput}
        name = "emailId"
        id = "emailId"
        className = "form-control"
        required = ""
        autoFocus = ""
        placeholder = "Enter email" / >

        </div>

        <div className = {`form-group ${this.errorClass(this.state.formErrors.password)}` } >
         { /* <label className="control-label col-sm-2"  htmlFor="password">Password:</label> */ }

        <input type = "password" value = {this.state.password}
        onChange = {this.handleUserInput}
        name = "password"
        id = "password"
        className = "form-control"
        required = ""
        placeholder = "Enter password" / >
        </div>


        <div className = "checkbox" >
        <button type = "button"onClick = {() => this.Fpassword()}
        className = "btn btn-link" > Forgot Password ? < /button>
        </div>

        <button type = "submit" disabled = {!this.state.formValid} onClick = {() => this.login()}
        className = "btn btn-lg btn-primary btn-block" > Submit < /button>
        </form>
        </div>
        </div>

        </div>

      );
    }

  }
  /* ReactDOM.render(
   <Router>
  	<div>
        <Route path="/mainpage" component={MainPage}/>
  	    </div>
    </Router>, document.getElementById('root')); */

  export default LoginPage;
  
/*<https-listener name="https" socket-binding="https" security-realm="ApplicationRealm" enable-http2="true"/>*/