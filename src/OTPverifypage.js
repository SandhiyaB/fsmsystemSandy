import React,{Component} from 'react';
import ForgotPassword from './ForgotPassword';
import Newpassword from './Newpassword';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

class OTPverifypage extends Component{
	constructor(props) {
        super(props)
        this.state = {
			 emailId:'',
			 otp: '',

        };
    }


	handleChangeotp(value){
        this.setState({
            otp: value
        });
    }

		componentDidMount() {
/* 			alert('componentDidMount'); */
			console.log(this.props.emailId);
     var emailIdProps=this.props.emailId;
			this.setState({
				emailId:emailIdProps
			});
}
OTPverify(){
	this.setState({
		emailId: this.state.emailId,
		otp:this.state.otp
	 });
                var self=this;
							  $.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/RestAPI/rest/verifyOTP",
							  contentType: "application/json",
							  dataType: 'json',


							  success: function(data,textStatus,jqXHR)
							  {
									/* alert(self.state.emailId); */
								   if(data==0){
										 console.log(self.state.emailId);
										 ReactDOM.render(<Newpassword emailId={self.state.emailId}/>, document.getElementById("root"));
									 }
									  else{
										   alert("Please check your emailID");

											  ReactDOM.render(<ForgotPassword />, document.getElementById("root"));

														}
							},

	});
}
	render(){

		return(

			<div>
			<div className="jumbotron ">
			<div className="form-group">
						  <label htmlFor="otp">OTP:</label>
						  <input type="text" id="OTP"  value={this.state.otp} onChange={(e) =>this.handleChangeotp(e.target.value)}  className="form-control" placeholder="Enter OTP" />
						</div>
						 <button type="button" onClick={()=> this.OTPverify()} class="btn btn-primary">Submit</button>

			</div>
			</div>
		);
	}

}
export default OTPverifypage;
