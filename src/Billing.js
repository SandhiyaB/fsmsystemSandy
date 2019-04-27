import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Receiptpage from './Receiptpage';
import $ from "jquery";
import { FormErrors } from './FormErrors';
import {unregister} from './registerServiceWorker';
import './Billing.css';
import CryptoJS from 'crypto-js' ;
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import MainPageHeader from './MainPageHeader';
import MainPage from './MainPage';
import registerServiceWorker from './registerServiceWorker';
class Billing extends Component{

	constructor(data) {

        super(data)
        this.state = {
        		
						fillingStationId:'',
					 	receiptNo:'',
            		 	vendorName: '',
            			vendorCode: '',
						noOfBubbleTops:this.props.noOfBubbleTops,
						perBubbleTopRate:'',
						billingAmount:'',
						gstPercentage:'',
						cgstPercentage:'',
						sgstPercentage:'',
						gstAmount:'',
						cgstAmount:'',
						sgstAmount:'',
						totalAmount:'',
						

				     formErrors: {noOfBubbleTops: '', perBubbleTopRate: ''},
					 noOfBubbleTopsValid: false,
					 perBubbleTopRateValid: false
        };
    }



componentDidMount() {
	this.state.availableInventory=CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	
	if(Number(this.state.availableInventory)<=1000){
		alert("Please Fill Inventory");
	}
	
	
}

		handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let noOfBubbleTopsValid = this.state.noOfBubbleTopsValid;
    let perBubbleTopRateValid = this.state.perBubbleTopRateValid;

    switch(fieldName) {
      case 'noOfBubbleTops':
        noOfBubbleTopsValid =value.length <=3 && value.match(/^[1-9][0-9]*$/);
        fieldValidationErrors.noOfBubbleTops = noOfBubbleTopsValid ? '' : ' is invalid';
    break;
      case 'perBubbleTopRate':
        perBubbleTopRateValid = value.length <3 && value.match(/^[1-9][0-9]*$/);
        fieldValidationErrors.perBubbleTopRate = perBubbleTopRateValid ? '': 'is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    noOfBubbleTopsValid: noOfBubbleTopsValid,
                    perBubbleTopRateValid: perBubbleTopRateValid  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.noOfBubbleTopsValid && this.state.perBubbleTopRateValid});
}

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}


		handleChangeCODE(value) {



				 this.setState({

						 vendorCode: value
				 });
		 }

	 handleChangeVN(value) {
				 this.setState({
						 vendorName: value
				 });
		 }



	Next(){

/* 
		alert(this.state.fillingStationId);
		alert(this.state.vendorName);
		alert(this.state.vendorCode);
		alert(this.state.noOfBubbleTops);
		alert(this.state.perBubbleTopRate);
		alert(JSON.stringify(this.state));
 */
this.state.availableInventory=CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	
if(Number(this.state.availableInventory)>500){
	
			var noOfBubbleTopsProps=this.state.noOfBubbleTops;

			var perBubbleTopRateProps=this.state.perBubbleTopRate;
			var gstProps = CryptoJS.AES.decrypt(localStorage.getItem('gstPercentageL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  			this.state.billingAmount=(noOfBubbleTopsProps*perBubbleTopRateProps).toFixed(2);
			this.state.gstAmount=(this.state.billingAmount*(gstProps/100)).toFixed(2);
	    	this.state.cgstPercentage=gstProps/2;
	    	this.state.cgstAmount=this.state.gstAmount/2;
      		this.state.sgstAmount=this.state.cgstAmount;
			this.state.totalAmount= (Number(this.state.billingAmount) + Number( this.state.gstAmount)).toFixed(2);
			this.setState({

						vendorName: this.state.vendorName,
						vendorCode:  this.state.vendorCode,
						noOfBubbleTops:  this.state.noOfBubbleTops,
						perBubbleTopRate:  this.state.perBubbleTopRate,
					});

    /*  alert(this.state.billingAmount);
	 */				ReactDOM.render(
								 React.createElement(Receiptpage, this.state),
									 document.getElementById("root"));
	 }
	 else{
		 alert("please fill inventory and start billing");
		 ReactDOM.render(
			<Router>
				<div>	
					<Route path="/" component={MainPageHeader}/>
					 <Route path="/" component={Billing}/>
					
					 
					
								 </div>
									</Router>,
											document.getElementById('root'));
											registerServiceWorker();
	 }
					}

BackbtnFunc(){
ReactDOM.render(
	<Router>
		<div>	
			<Route path="/" component={MainPageHeader}/>
			 <Route path="/" component={MainPage}/>
			
			 
			
						 </div>
							</Router>,
									document.getElementById('root'));
									registerServiceWorker();

}

	render(){

		return(

			<div className="container" >
				<ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    marginTop:"50px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

			<h3>Billing</h3>
			<div className="panel panel-default">
	          <FormErrors formErrors={this.state.formErrors} />
	</div>
			<form>

				<div className="form-group">
					  <label htmlFor="vendorIdid">Vendor Code:</label>
					  <input
						type="text"
						value={this.state.vendorCode}
						maxLength="50"
						onChange={(e) =>this.handleChangeCODE(e.target.value)}
						className="form-control"
						id="vendorIdid"
						placeholder="Enter Vendor Code"/>
					</div>

					<div className="form-group">
					  <label htmlFor="vendorNameid">Vendor Name:</label>
					  <input type="text"
						 value={this.state.vendorName}
						 onChange={(e) =>this.handleChangeVN(e.target.value)}
						 className="form-control"
						 id="vendorNameid"
						 placeholder="Enter Vendor Name" />
						</div>


         <div className={`form-group ${this.errorClass(this.state.formErrors.noOfBubbleTops)}`}>

						<label htmlFor="noOfBubbleTops">No of BubbleTop:</label>
					  <input type="number"
						value={this.state.noOfBubbleTops}
						required name="noOfBubbleTops"
						onChange={this.handleUserInput}
						className="form-control"
						id="noOfBubbleTops"
						placeholder="Enter No of BubbleTop"/>

					</div>
					 <div className={`form-group ${this.errorClass(this.state.formErrors.perBubbleTopRate)}`}>

					  <label htmlFor="perBubbleTopRateid">Rate Per Bubbletop :</label>
					  <input type="number"
						value={this.state.perBubbleTopRate}
						onChange={this.handleUserInput}
						name="perBubbleTopRate"
						className="form-control"
						id="perBubbleTopRateid"
						placeholder="Enter Per Bottle Rate "/>
					</div>

					<button type="submit" style={{marginBottom:'35%' , backgroundColor:'#14c5dd',color:'white'}} className="btn btn-default" disabled={!this.state.formValid} onClick={() => this.Next()}>Next</button>
				   </form>

				</div>

		);
	}

}

export default Billing;
