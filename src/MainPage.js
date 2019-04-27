


import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './MainPage.css';
import {
  FormErrors
} from './FormErrors';
import {  browserHistory,IndexRoute } from 'react-router';
import Aboutus from './Aboutus';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReport';
import MainPageHeader from './MainPageHeader';
import Billing from './Billing';
import LoginPage from './LoginPage';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';
import Charts from './Charts';

import Inventory from './Inventory';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import {unregister} from './registerServiceWorker';
import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import ReprintResult from './ReprintResult' ;
import Configuration from './Configuration';
import FSReportMenuPage from './FSReportMenuPage';
import VendorPayment from './VendorPayment';
import ConfigurationMenuPage from './ConfigurationMenuPage';

class MainPage extends Component{
	
constructor(props) {
				super(props)
				var today = new Date();
				var date = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
				this.state = {
					 fillingStationId:'',
					 date:date,
					 emailId:'',
					 companyName:''
				 };
		}

InventoryFunc(){
	ReactDOM.render(
		<Router>
		  <div>
		  <Route path="/" component={MainPageHeader}/>
		 
		  <Route path = "/" component = {Inventory}/>
		</div>
								  </Router>,
											document.getElementById('root'));

}
BillingFunc(){
	ReactDOM.render(
		<Router>
		  <div>
		  <Route path="/" component={MainPageHeader}/>
		 
		  <Route path = "/" component = {Billing}/>
		</div>
								  </Router>,
											document.getElementById('root'));

}

ReprintVoidFunc(){
	ReactDOM.render(
		<Router>
		  <div>
		  <Route path="/" component={MainPageHeader}/>
		 
		  <Route path = "/" component = {ReprintVoid}/>
		</div>
								  </Router>,
											document.getElementById('root'));

}

FSReportMenuFunc(){
	
	ReactDOM.render(
		<Router>
		 <div>
		 
		<Route path="/" component={MainPageHeader}/>
		
		<Route exact path="/" component={FSReportMenuPage}/>
		
		
		</div>
		 </Router>,
		document.getElementById('root'));
		

}

ChartFunc()
{
	
ReactDOM.render(
<Router>
 <div>
 
<Route path="/" component={MainPageHeader}/>

<Route exact path="/" component={Charts}/>


</div>
 </Router>,
document.getElementById('root'));

}

ConfigFunc(){
	
	ReactDOM.render(
		<Router>
		 <div>
		 
		<Route path="/" component={MainPageHeader}/>
		
		<Route  path="/" component={ConfigurationMenuPage}/>
		
		
		</div>
		 </Router>,
		document.getElementById('root'));

}

VendorFunc(){

	ReactDOM.render(
		<Router>
		 <div>
		 
		<Route path="/" component={MainPageHeader}/>
		
		<Route  path="/" component={VendorPayment}/>
		
		
		</div>
		 </Router>,
		document.getElementById('root'));
}

	render(){
	
		


		return(
		
<div className="container"style={{marginBottom:'10%'}}>
		
	

  <div className="container-fluid" id="rowid" style={{backgroundColor:'white'}}>
  
 
 <div className="row"  style={{backgroundColor:'white'}}>
 
		<div className="col-xs-6" id="colstyle">
				<a  to="/" onClick={()=>this.InventoryFunc()} id="inventorycolstyle" className="" >Inventory</a>
					</div>
		<div className="col-xs-6" id="colstyle" >
				<a to="/" onClick={()=>this.BillingFunc()} id="billingcolstyle"  >Billing</a>
						</div>
						</div>
	<div className="row"  style={{backgroundColor:'white'}}>
		<div className="col-xs-6" id="colstyle">
		
					<a to="/"  onClick={()=>this.ReprintVoidFunc()} id="reprintcolstyle">Reprint/Void</a>
					</div>
		<div className="col-xs-6" id="colstyle">
                        <a to="/"  onClick={()=>this.FSReportMenuFunc()} id="reportcolstyle">Report</a>
                                </div>
                                </div>

                                <div className="row"  style={{backgroundColor:'white'}}>
		<div className="col-xs-6" id="colstyle">
								<a  to="/Charts" onClick={()=>this.ChartFunc()} id="chartscolstyle" className="" >Charts</a>
					</div>
						
		<div className="col-xs-6" id="colstyle"onClick={()=>this.VendorFunc()}>
										<a to="/" id="employeecolstyle" >Vendor</a>
									</div> 
									</div>
									<div className="col-xs-6" id="colstyle">
					<a  to="/" id="alertscolstyle" className="" >Alerts</a>
						</div>
			
					
					<div className="col-xs-6" id="colstyle">
							<a to="/"  onClick={()=>this.ConfigFunc()} id="configurationcolstyle">Configuration</a>
									</div>*

				</div>
			

	</div>	
		);
	}

}

export default MainPage;


				{/* 	<div className="col-xs-6" id="colstyle">
					<a  to="/" id="alertscolstyle" className="" >Alerts</a>
						</div>
			
					
					<div className="col-xs-6" id="colstyle">
							<a to="/"  onClick={()=>this.ConfigFunc()} id="configurationcolstyle">Configuration</a>
									</div>*/}