import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReport';
import registerServiceWorker from './registerServiceWorker';
import MainPage from './MainPage';
import $ from 'jquery';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import Billing from './Billing';
import Aboutus from './Aboutus';
import Inventory from './Inventory';
import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import MainPageHeader from './MainPageHeader';
import './MainPage.css';


class Report extends Component{
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


HourlyReportFunc(){
	this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
				this.setState({
						fillingStationId:CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),

					});
					/* 	alert(JSON.stringify(this.state)); */
							$.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/RestAPI/report/hourlyReport",
							  contentType: "application/json",
							  dataType: 'json',
								async:false,
							  success: function(data,textStatus,jqXHR)
                 {
								  console.log(data);
						/* 			alert("hourly"); */
									ReactDOM.render(
								 <Router  >
								 <div>
								 <Route path = "/" component = { MainPage }/>
								 <Route path = "/Aboutus" component = {Aboutus}/>
								 <Route exact path = "/Inventory" component = {Inventory}/>
								 <Route path = "/billing"component = {Billing}/>
								 <Route path = "/Report" component = {Report}/>
                 				 <Route path="/DailyReport"component={DailyReport}/>
								 <Route path="/HourlyReport" component={() => <HourlyReport data={data} />} />
								 <Route path="/PeriodReport"component={PeriodReport}/>
								 <Route path="/VendorRegistration" component={VendorRegistration }/>
								 </div>
								 </Router>, document.getElementById('root'));




							
										 },


			             error:function(data) {
             					console.log('#####################error:################################'+data);
             					alert('Login Invalid'+ data);

 		     						},
							  });
						}
 DailyReportFunc(){
	 this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	 this.state.emailId=CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	 this.state.companyName=CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
						this.setState({
						 			fillingStationId:CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
						 			emailId:CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
									companyName:CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)

						 });
			/* 			 alert(JSON.stringify(this.state)); */
						 $.ajax({
						 				type: 'POST',
						 				data:JSON.stringify(this.state),
						 				url: "http://localhost:8080/RestAPI/report/dailyReport",
						 				contentType: "application/json",
						 				dataType: 'json',
						 				async:false,
						 				success: function(data,textStatus,jqXHR)
						        {
						 					 console.log(data);

											 ReactDOM.render(
											<Router  >
											<div>
											<Route path = "/" component = { MainPage }/>
								            <Route exact path = "/Inventory" component = {Inventory}/>
								            <Route path = "/Aboutus" component = { Aboutus }/>
								            <Route path = "/billing"component = {Billing}/>
								            <Route path = "/Report"component = {Report}/>
											<Route path="/HourlyReport"component={HourlyReport}/>
											<Route path="/DailyReport"component={() => <DailyReport data={data} />} />
											<Route path="/PeriodReport"component={PeriodReport}/>
											<Route path="/VendorRegistration" component={VendorRegistration }/>
												 </div>
										 </Router>, document.getElementById('root'));
											registerServiceWorker();

						 				},
						 			  error:function(data) {
						             console.log('#####################error:################################'+data);
						      /*        alert('Login Invalid'+ data); */

						  		  },
						 				});
	}
	PeriodFunc()
{
	/*  alert(" Period Report page"); */
	 ReactDOM.render(
	<Router  >
	<div>
	<Route path = "/" component = { MainPage }/>
	<Route exact path = "/Inventory" component = {Inventory}/>
	<Route path = "/billing"component = {Billing}/>
	<Route path = "/Report"component = {Report}/>
	<Route path="/HourlyReport"component={HourlyReport}/>
	<Route path="/DailyReport"component={DailyReport } />
	<Route path="/PeriodReport"component={PeriodReport}/>
	<Route path="/PeriodReportDisplay"component={PeriodReportDisplay}/>
	<Route path="/VendorRegistration" component={VendorRegistration }/>
		 </div>
	</Router>, document.getElementById('root'));
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
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    marginBottom:"10%",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}>
        <span aria-hidden="true">&larr;</span> BACK</a></ul>

  <h2 className="text-muted">Repojhjfhjrt</h2>


  <div className="col-sm-12 col-xs-12 col-lg-12" style={{marginBottom:"10%"}}>
        
 <div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 
        <div className="col-xs-6" id="colcheckIn">
        
                <a  to="/" onClick={()=>this.HourlyReportFunc()} id="Hourlycolstyle" >Daily</a>
                    </div>
                <div className="col-xs-6 " id="colcheckIn" >
                    <a to="/" onClick={()=>this.DailyReportFunc()} id="Periodcolstyle"  >Monthly</a>
                            </div>
        </div>
        <div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 
                        <div className="col-xs-6 " id="colcheckIn">
                                <a to="/" onClick={()=>this.PeriodFunc()} id="Periodcolstyle">Period</a>
                                    </div>
                       
 		</div>
 			</div>




  </div>
		);
	}

}
export default Report;
