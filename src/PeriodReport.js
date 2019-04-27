
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
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
import PeriodReportDisplay from './PeriodReportDisplay';
import Billing from './Billing';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
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
import FSReportMenuPage from './FSReportMenuPage';

class PeriodReport extends Component{


	constructor(props) {
		super(props)
				this.state = {

			 fillingStationId:'',
       fromDate:'',
       toDate:'',
				}

	}

  		handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});

  }
  Submit(){
/*     alert(this.state.fromDate);
    alert(this.state.toDate); */
    this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
/* 
 						 alert(JSON.stringify(this.state)); */
 						 $.ajax({
 						 				type: 'POST',
 						 				data:JSON.stringify(this.state),
 						 				url: "http://localhost:8080/RestAPI/report/periodReport",
 						 				contentType: "application/json",
 						 				dataType: 'json',
 						 				async:false,
 						 				success: function(data,textStatus,jqXHR)
 						        {
 						 					 console.log(data);
 						 				/* 	 alert("Period Report"); */

                        ReactDOM.render(
      								 <Router  >
      								 <div>
      								
                       <Route path = "/" component = { MainPageHeader}/>
                      
                       <Route path="/" component={() => <PeriodReportDisplay data={data} />}/>
      								 </div>
                       </Router>, document.getElementById('root'));
},
 						 			  error:function(data) {
 						             console.log('#####################error:################################'+data);
 						             alert('Login Invalid'+ data);

 						  		  },
 						 				});


  }
  
    componentDidMount() {
      var self=this;
    $('#toDate').datepicker({ 
       onSelect: function(date) {
         var dt = new Date(date);
            dt.setDate(dt.getDate() - 1);
            $("#fromDate").datepicker("option", "maxDate", dt);
       self.setState({
        toDate:date,
       });
        
     },
     dateFormat: 'yy/mm/dd',
     minDate: '-3M', 
     maxDate: 'M',
    numberOfMonths:1 } );
    $('#fromDate').datepicker({
      onSelect: function(date) {
        var dt = new Date(date);
            dt.setDate(dt.getDate() + 1);
            $("#toDate").datepicker("option", "minDate", dt);
       self.setState({
        fromDate:date,
       });
     },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: 'M', 
      numberOfMonths:1 });        
}
BackbtnFunc(){
  ReactDOM.render(
          <Router>
            <div>           
                   <Route path="/" component={MainPageHeader}/>
                   <Route path="/" component={FSReportMenuPage}/>
                   
                           </div>
                                </Router>,
                                          document.getElementById('root'));
                                          registerServiceWorker();
                                      }   

render(){

	
		return(

<div className="container">
 
<ul class="previous disabled" 
            id="backbtn">
                <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
   
			  <h3 className="text-muted">Period Report</h3>
      
		  <div class ="jumbotron">

		<form  style={{ paddingBottom: '50px',  position: 'inline-block'}}>
<label htmlFor="fromDate" style={{ paddingRight: '50px'}}> From:</label>
		  <input type="text" value={this.state.fromDate} id="fromDate" name="fromDate" onChange={this.handleUserInput}/>

		</form>

		<form  style={{ paddingRight: '50px'}}   >
<label htmlFor="toDate" style={{ marginRight: '70px'}}> To:</label>

		  <input type="text"  value={this.state.toDate}   id="toDate" name="toDate" onChange={this.handleUserInput}/>

		 
		</form>
<button style={{ marginTop: "35px",marginBottom: '25%',
    backgroundColor: '#27b5eb'}}>
     <NavLink to="/" onClick={()=>this.Submit()} style={{ color : "#d9edf7"}} >Submit</NavLink></button>



		</div>

   
          <table id="records_table" style={{width:'80%'}}>

           </table>

  </div>
		);
	}

}
export default PeriodReport;
