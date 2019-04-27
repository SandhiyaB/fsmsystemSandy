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
import {  browserHistory } from 'react-router';
import Billing from './Billing';
import Aboutus from './Aboutus';
import Inventory from './Inventory';
import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import MainPageHeader from './MainPageHeader';
import './MainPage.css';




class FSReportMenuPage extends Component{

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
                        /* alert(JSON.stringify(this.state));
                         */    $.ajax({
                              type: 'POST',
                              data:JSON.stringify(this.state),
                              url: "http://localhost:8080/RestAPI/report/hourlyReport",
                              contentType: "application/json",
                              dataType: 'json',
                                async:false,
                              success: function(data,textStatus,jqXHR)
                 {
                                  console.log(data);
                         
                                    ReactDOM.render(
                                 <Router >
                                 <div>
                                 <Route path = "/" component = { MainPageHeader }/>
                                 <Route path="/" component={() => <HourlyReport data={data} />} />
                            
                                 </div>
                                 </Router>, document.getElementById('root'));




                            
                                         },


                         error:function(data) {
                                console.log('#####################error:################################'+data);
                                alert('Server Error'+ data);

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
/*                          alert(JSON.stringify(this.state));
                         */ $.ajax({
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
                                            <Router>
                                            <div>
                                            <Route path = "/" component = { MainPageHeader }/>
                                            <Route path="/"component={() => <DailyReport data={data} />} />
                                                  </div>
                                         </Router>, document.getElementById('root'));
                                            registerServiceWorker();

                                        },
                                      error:function(data) {
                                     console.log('#####################error:################################'+data);
                                     alert('Server Error'+ data);

                                  },
                                        });
    }

    PeriodFunc()
{

     ReactDOM.render(
    <Router>
    <div>
    <Route path = "/" component = { MainPageHeader }/>
    <Route path="/"component={PeriodReport}/>
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

            <div className="container" id="menucol"  style={{paddingTop:"5%",backgroundColor:"white"}}>
  <ul class="previous disabled"
  id="backbtn" 
   >
        <a href="#" onClick={()=>this.BackbtnFunc()}>
        <span aria-hidden="true">&larr;</span> BACK</a>
        </ul>

 <div className="col-sm-12 col-xs-12 col-lg-12" style={{marginBottom:"10%"}}>
        
 <div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "10%"}}>
 
         <div className="col-xs-6" id="colcheckIn">
        
                <a  to="/" onClick={()=>this.HourlyReportFunc()} id="Hourlycolstyle" ><span id ="HourlyName" >Hourly</span></a>
                    </div>
                <div className="col-xs-6 " id="colcheckIn" >
                    <a to="/" onClick={()=>this.DailyReportFunc()} id="Dailycolstyle"><span id ="dailyName" >Daily</span></a>
                            </div>
        </div>
        <div className="row"  id="checkInOut"style={{backgroundColor:'white',marginBottom: "25%", marginTop:"20%"}}>
 
                        <div className="col-xs-6 " id="colcheckIn">
                                <a to="/" onClick={()=>this.PeriodFunc()} id="Periodcolstyle"> <span id ="PeriodName" >Period</span></a>
                                    </div>

                       {/*  <div className="col-xs-6 " id="colcheckIn" style={{paddingLeft:"0%"}}>
                                <a to="/MaintenanceVoid" onClick={()=>this.MaintenanceReportFunc()} id="Maincolstyle">Maintenance</a>
                                    </div> */}


        
            {/*<div className="col-xs-6" id="colstyle">
                        <a to="/ReportVoid"  id="Reportcolstyle">Reports</a>
                            </div>*/}
                        
                    
                        </div>
                        </div>
            </div>
            
        );
    }

}
export default FSReportMenuPage;



