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
import PeriodReportDisplay from './PeriodReport';
import Billing from './Billing';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';
import Inventory from './Inventory';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import ReprintResult from './ReprintResult' ;
import MainPageHeader from './MainPageHeader';


class ReprintPage extends Component{


	constructor(props) {
		super(props)
				this.state = {
			 fillingStationId:'',
			 receiptNo:'',
				}

	}

  		handleUserInput = (e) => {
      const name = e.target.name;
	  const value = e.target.value;
	  this.setState({[name]: value});
	 
  }
  Submit(){
   
    this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);

						 /*  alert(JSON.stringify(this.state)); */
						 alert(JSON.stringify(this.state));
 						 $.ajax({
 						 				type: 'POST',
 						 				data:JSON.stringify(this.state),
 						 				url: "http://localhost:8080/RestAPI/bill/reprintTransaction",
 						 				contentType: "application/json",
 						 				dataType: 'json',
 						 				async:false,
 						 				success: function(data,textStatus,jqXHR)
 						        {
 						 					 console.log(data);
 						 				/* 	 alert("receipt reprint"); */

                        
if(data.vendorName==="INVALID_RECEIPT_NO"){

	alert("data.vendorName");
                                        alert("INVALID Receipt NO");
                                    }else{
                        ReactDOM.render(
                                     <Router >
                                     <div>
                                     <Route path = "/" component = { MainPageHeader }/>
                                     <Route path="/" component={() => <ReprintResult data={data} />} />
                                                        </div>
                       </Router>, document.getElementById('root'));
                        }
},
 						 			  error:function(data) {
 						             console.log('#####################error:################################'+data);
 						             alert('Login Invalid'+ data);

 						  		  },
 						 				});


  }
  
 
render(){
	
   
	
		return(

<div className="container">
		  <h3 className="text-muted">Reprint </h3>
		  <div className ="jumbotron">
					  <label htmlFor="reprintReceiptNo">ReceiptNo :</label>
					  <input type="number"
						value={this.state.receiptNo}
						onChange={this.handleUserInput}
						name="receiptNo"
						className="form-control"
						id="ReceiptNo"
						placeholder="Enter receipt number"/>
					</div>

					
					<button to="/" onClick={()=>this.Submit()}  style={{marginBottom:'40%', color:'black'}}>Submit</button>
		</div>
		);
	}

}
export default ReprintPage;
