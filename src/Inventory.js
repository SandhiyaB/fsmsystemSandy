
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './LoginPage.css';
import {
  FormErrors
} from './FormErrors';
import {  browserHistory,IndexRoute } from 'react-router';
import Aboutus from './Aboutus';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReport';
import Billing from './Billing';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import ReprintResult from './ReprintResult' ;
import idb from 'idb';
import MainPageHeader from './MainPageHeader';
import MainPage from './MainPage';
import registerServiceWorker from './registerServiceWorker';
class Inventory extends Component{

	constructor(data) {

        super(data)
        this.state = {
						fillingStationId:'',
						amountCollected:'',
						availableInventory:'',
						fill:'',
						

						formErrors: {availableInventory: ''},
						 availableInventoryValid: '',
					 
        };
    }

		handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
                 
}


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let availableInventoryValid = this.state.availableInventoryValid;
    

    switch(fieldName) {
    
      case 'availableInventory':
        availableInventoryValid = value.length <3 && value.match(/^[1-9][0-9]*$/);
        fieldValidationErrors.availableInventory = availableInventoryValid ? '': 'is Low';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                   availableInventoryValid: availableInventoryValid,}, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.availableInventoryValid && this.state.perBubbleTopRateValid});
}

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}

handlechangefill(value) {
        this.setState({
            fill: value
        });
    }




	Next(){


	/* 	
		alert(this.state.fill);
		alert(JSON.stringify(this.state));
 */

		
       this.state.availableInventory= Number(this.state.availableInventory )+ Number(this.state.fill)
       
		localStorage.setItem('availableInventoryL', CryptoJS.AES.encrypt(this.state.availableInventory.toString(),"shinchanbaby"));
		

/* 		alert(this.state.availableInventory); */	
		var avail=this.state.availableInventory;

		this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
        localStorage.setItem('fillValueL', CryptoJS.AES.encrypt(this.state.fill.toString(),"shinchanbaby"));

			if(navigator.onLine){
			    	    $.ajax({
			            type: 'POST',
			            data: JSON.stringify({
			            fillingStationId: this.state.fillingStationId,
			            fill: this.state.fill,
			        		}),
				        url: "http://localhost:8080/RestAPI/rest/availableInventory",
				        contentType: "application/json",
				        dataType: 'json',
				        async: false,

			        success: function(data, textStatus, jqXHR)

        {
          console.log(data);
          ReactDOM.render(
			<Router>
			  <div>
					  <Route path = "/" component = { MainPageHeader }/>
		          
		              <Route path="/" component={() => <Inventory avail={avail} />}/>
		              
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
          },


          error: function(data) {
            console.log('#####################error:################################' + data);
            alert('Login Invalid' + data);

          },
        });
      }
      else{

      	var dbPromise = idb.open('test-db',2,function(upgradeDb){
		var keyValStore=upgradeDb.createObjectStore('inventory',{ autoIncrement : true});
		  
		});

		dbPromise.then(function(db){
	   var tx=db.transaction('inventory','readwrite');
	   var keyValStore=tx.objectStore('inventory');
	   keyValStore.put();
	   return tx.complete;

	    }).then(function(val){
	      console.log('the value of offline added');
	    });

}
    }

			
			
			
			

			/* var perBubbleTopRateProps=this.state.perBubbleTopRate;
			var gstProps=localStorage.getItem('gstPercentageL');
			 this.state.billingAmount=(noOfBubbleTopsProps*perBubbleTopRateProps).toFixed(2);
			 this.state.gstAmount=(this.state.billingAmount*(gstProps/100)).toFixed(2);
			this.state.cgstAmount=this.state.gstAmount/2;
			this.state.sgstAmount=this.state.cgstAmount;
			 this.state.totalAmount= Number(this.state.billingAmount) + Number( this.state.gstAmount); */
			
			
					
componentDidMount() {
	this.state.availableInventory=CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	/* alert(this.state.availableInventory); */
	this.setState({
		
		availableInventory:CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
	
		amountCollected:CryptoJS.AES.decrypt(localStorage.getItem('amountCollectedL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
	});
	if(Number(this.state.availableInventory)<=1000){
		alert("Please Fill Inventory");
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

			<div className="container">
					<ul class="previous disabled" 
    style={{
    	float:"none",
    display:"inline-block",
    marginLeft:"5px",
    marginTop:"50px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

			<h3>Inventory</h3>
			<div className="panel panel-default">
	          <FormErrors formErrors={this.state.formErrors} />
	</div>
			<form>

				<div className="form-group">
					  <label htmlFor="amountCollectedid">Amount Collected :</label>
					  <label
						id="amountCollectedid"
						placeholder="Amount Display">{this.state.amountCollected}</label>
					</div>
					
				 
					<div className="form-group">
					  <label htmlFor="availableInventoryid">Available Inventory :</label>
					  <label
					     type="text"
						 id="availableInventoryid"
						>{this.state.availableInventory}</label>
						</div>
					
					<label htmlFor="fillid">Fill Inventory</label>
					  <input type="number"
						value={this.state.fill}
						required 
						name="fill"
						onChange={this.handleUserInput}
						className="form-control"
						id="fillid"
						placeholder="Enter Liters of water to be Fill in Tank "/>

					
					 

					<button type="submit" style={{marginBottom:'40%',marginTop:'7%', color:'blac#f5f5f5k',backgroundColor:'#35c742'}} className="btn btn-default"  onClick={() => this.Next()}>Submit</button>
				   </form>

				</div>

		);
	}

}

export default Inventory;