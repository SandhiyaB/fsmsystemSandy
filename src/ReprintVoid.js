
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
import ReprintPage from './ReprintPage';
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
import PaidDuePage from './PaidDuePage';
class ReprintVoid extends Component{

	constructor(data) {

        super(data)
        this.state = {
			 		formErrors: {availableInventory: ''},
					 availableInventoryValid: '',
					 
        };
    }
ReprintPagefunc(){
	 /* alert(" Reprint page"); */
	 ReactDOM.render(
			<Router>
			  <div>
					<Route path = "/" component = { MainPageHeader }/>
             
          <Route path = "/" component = { ReprintVoid }/>
          <Route path="/" component={ReprintPage}/>
              	 </div>
								  </Router>,
											document.getElementById('root'));
	
	
}

VoidPagefunc(){
	/*  alert(" Reprint page"); */
	 ReactDOM.render(
			<Router>
			  <div>
					<Route path = "/" component = { MainPageHeader }/>
          <Route path = "/" component = { ReprintVoid }/>
          
             <Route path="/" component={VoidPage}/>
              
								 </div>
								  </Router>,
											document.getElementById('root'));
	
	
}
PaidDuefunc(){
	ReactDOM.render(
		<Router>
			<div>
				<Route path = "/" component = { MainPageHeader }/>
				<Route path = "/" component = { ReprintVoid }/>
				
					 <Route path="/" component={PaidDuePage}/>
						
							 </div>
								</Router>,
										document.getElementById('root'));



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
componentDidMount()
{
  this.ReprintPagefunc();
}
	render(){

		return(

			<div className="container">
		<ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    marginTop:"50px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

			<div className="panel panel-default">
	         <ul class="nav nav-tabs  nav-justified ">
						<li><NavLink to="/" onClick={()=>this.ReprintPagefunc()}><h4>Reprint</h4></NavLink></li>
						<li><NavLink to="/" onClick={()=>this.VoidPagefunc()}><h4>Void</h4></NavLink></li>
						<li><NavLink to="/" onClick={()=>this.PaidDuefunc()}><h4>Paid/Due</h4></NavLink></li>
						</ul>
	</div>
			

				</div>

		);
	}

}

export default ReprintVoid;
