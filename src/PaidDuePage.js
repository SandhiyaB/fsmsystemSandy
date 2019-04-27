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
  import { confirmAlert } from 'react-confirm-alert'; // Import
 import 'react-confirm-alert/src/react-confirm-alert.css'

  
  class ReprintPage extends Component{
  
  
      constructor(props) {
          super(props)
                  this.state = {
                    fillingStationId:'',
               receiptNo:'',
               billStatus:'PAID',
                  }
  
      }
  
            handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
       
    }
    Submit(){
     var self=this;
      this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  
                           /*  alert(JSON.stringify(this.state)); */
                            $.ajax({
                                            type: 'POST',
                                            data:JSON.stringify(this.state),
                                            url: "http://localhost:8080/RestAPI/bill/DueToPaid",
                                            contentType: "application/json",
                                            dataType: 'json',
                                            async:false,
                                            success: function(data,textStatus,jqXHR)
                                   {
                                                 console.log(data);
                                            /* 	 alert("receipt reprint"); */
  
                          
  if(data.vendorName==="INVALID_RECEIPT_NO"){
    confirmAlert({
      title: 'Invalid',
      message:'Receipt No '+ data.receiptNo +' is  Invalid ',
      buttons: [
        {
        label: 'Ok',
      
        },

      ]
      })
                                          
  
  }                else if(data.vendorName== "ALREADY_PAID"){

    confirmAlert({
      title: 'Already Paid',
      message:'Receipt No '+ data.receiptNo +' is  Already Paid ',
      buttons: [
        {
        label: 'Ok',
      
        },

      ]
      })
                                            
                                            } 
                                                                         
                                      else{
                                        confirmAlert({
                                          title: 'Success',
                                          message: 'Succesfully Changed the Receipt No  '+ data.receiptNo + ' Status to PAID' ,
                                          buttons: [
                                            {
                                              label: 'Reprint',
                                              onClick: () =>{ self.Reprint()},
                                            },
                                            {
                                              label: 'Cancel',
                                             
                                            }
                                          ]
                                        })
                        
                          }
  },
                                          error:function(data) {
                                        console.log('#####################error:################################'+data);
                                        alert('Login Invalid'+ data);
  
                                       },
                                            });
  
  
    }
    

    Reprint(){
   
      this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  
               /*  alert(JSON.stringify(this.state)); */
               alert(JSON.stringify(this.state));
                $.ajax({
                        type: 'POST',
                        data:JSON.stringify({
                          fillingStationId:this.state.fillingStationId,
                          receiptNo:this.state.receiptNo,
                        }),
                        url: "http://localhost:8080/RestAPI/bill/reprintTransaction",
                        contentType: "application/json",
                        dataType: 'json',
                        async:false,
                        success: function(data,textStatus,jqXHR)
                       {
                           console.log(data);
                        /* 	 alert("receipt reprint"); */
  
                          ReactDOM.render(
                                       <Router >
                                       <div>
                                       <Route path = "/" component = { MainPageHeader }/>
                                       <Route path="/" component={() => <ReprintResult data={data} />} />
                                                          </div>
                         </Router>, document.getElementById('root'));
                          }
  });
}
         
   
  render(){
      
     
      
          return(
  
  <div className="container">
            <h3 className="text-muted">Paid/Due </h3>
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


  
                      
                      <button to="/" onClick={()=>this.Submit()}  style={{marginBottom:'40%', color:'black'}}>PAID</button>
          </div>
          );
      }
  
  }
  export default ReprintPage;
  