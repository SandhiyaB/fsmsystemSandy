import React,{Component} from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';



class Newpassword extends Component{
	constructor() {
        super()
        this.state = {
			 password: '',
			  emailId:'',

			   formErrors: {passwordValid: '', },
					 passwordValid: false
        };
    }



    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}
validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    

    switch(fieldName) {
     case 'password':
        passwordValid = value.length >= 5 && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
    break;
      
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    passwordValid: passwordValid,
                     }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.passwordValid });
}


	handleChangepassword(value){
        this.setState({
            password: value

		});
    }


		componentDidMount() {
		/* 	alert('componentDidMount'); */
			console.log(this.props.emailId);
		 var emailIdProps=this.props.emailId;
			this.setState({
				emailId:emailIdProps
			});
}
Passwordverify(){

			var password = document.getElementById("password");
			var confirmpassword = document.getElementById("confirmpassword");


			if(password.value==confirmpassword.value){
			alert("Password Matched");
			this.setState({
				password: this.state.password,
        emailId: this.state.emailId,
			});
							  $.ajax({
							  type: 'POST',
							  data:JSON.stringify({
							  	emailId:this.state.emailId,
							  	password:this.state.password,
							  	}),
							  url: "http://localhost:8080/RestAPI/rest/updatePassword",
							  contentType: "application/json",
							  dataType: 'json',


							  success: function(data,textStatus,jqXHR)
							  {

									ReactDOM.render(<LoginPage/>, document.getElementById("root"));

								}



	});
}
else{	alert("Incorrect password");
	 return false;

 ReactDOM.render(<Newpassword/>, document.getElementById("root"));
	 }
}

	render(){
		return(

			<div className="container">
			<div className="jumbotron">
			
			<div className="panel panel-default">
	          <FormErrors formErrors={this.state.formErrors} />
				</div>
			   <div className = {`form-group ${(this.state.formErrors.password)}` } >
			          <label className="control-label col-sm-2"  htmlFor="password">NewPassword:</label> 

			        <input type = "password" value = {this.state.password}
			        onChange = {this.handleUserInput}
			        name = "password"
			        id = "password"
			        className = "form-control"
			        required = ""
			        placeholder = "Enter password" / >
			        </div>

						
						<h5 style={{color:"darkblue"}}>Password should contains [8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character]</h5> 

						<div className="form-group">
						  <label htmlFor="confirmpassword">Confirm Password:</label>
						  <input type="password" 
						  id="confirmpassword" 
						  className="form-control" 
						  
						  placeholder="Confirm Password " />

						</div>

						 <button type="button" onClick={()=> this.Passwordverify()} class="btn btn-primary">Reset Password</button>

			</div>
		</div>


		);
	}

}
export default Newpassword;
