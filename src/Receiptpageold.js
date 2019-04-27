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
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
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
import idb from 'idb';
import zeroFill from 'zero-fill';
import MainPageHeader from './MainPageHeader';
class ReceiptScreen extends Component {
    constructor(data) {
        super(data)
        var today = new Date();
        var date = today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear() ;
        var time=today.toLocaleTimeString();
        var dailyDate = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;

        this.state = {
              response:data,
              date: date,
              dailyDate:dailyDate,
              time:time,
              fillingStationId:'',
              vendorCode:'',
              receiptNo:'',
              vendorName:'',
              noOfBubbleTops:'',
              perBubbleTopRate:'',
              gstPercentage:'',
              billingAmount:'',
              sgstAmount:'',
              cgstAmount:'',
              gstAmount:'',
              totalAmount:'',
              emailId:'',
              companyName:'',
              userName:'',
              availableInventory:'',
              fill:'',
            };
}


componentDidMount() {
   
  var company_name=CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  var address=CryptoJS.AES.decrypt(localStorage.getItem('addressL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  var email=CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)
  var mobile_no=CryptoJS.AES.decrypt(localStorage.getItem('mobileNoL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)
  var fillingStationIdProps=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  var bill_no=CryptoJS.AES.decrypt(localStorage.getItem('receiptNoL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  
  var vendorCodeProps=this.props.vendorCode;
  var gst_per=CryptoJS.AES.decrypt(localStorage.getItem('gstPercentageL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
  var vendor_name=this.props.vendorName;
  $("#company_name").append(company_name);
  $("#address").append(address);
  $("#email").append(email);
  $("#mobile_no").append(mobile_no);

  $("#vendor_name").append(vendor_name);
var product_qty=this.props.noOfBubbleTops;
var product_price=this.props.perBubbleTopRate;
 $("#bill_no").append(bill_no);
$("#product_qty").append(product_qty);
$("#product_price").append(product_price);
var billing_amount=this.state.response.billingAmount;

var sgst_per=this.state.response.cgstPercentage;
var cgst_per=this.state.response.cgstPercentage;
var gst_amt=this.state.response.gstAmount;
var sgst_amt=this.state.response.sgstAmount;
var cgst_amt=this.state.response.cgstAmount;
var amount=this.state.response.totalAmount;
$("#gstper").append(gst_per);
$("#sgstper").append(sgst_per);
$("#cgstper").append(cgst_per);
$("#billing_amount").append(billing_amount);
$("#sgst_amt").append(sgst_amt);
$("#cgst_amt").append(cgst_amt);
$("#amount").append(amount);
$("#gstamt").append(gst_amt);
this.setState({
    fillingStationId: fillingStationIdProps,
    vendorCode:vendorCodeProps,
    receiptNo:bill_no,
    vendorName:vendor_name,
    noOfBubbleTops:product_qty,
    perBubbleTopRate:product_price,
    gstPercentage:gst_per,
    billingAmount:billing_amount,
    sgstAmount:sgst_amt,
    cgstAmount:cgst_amt,
    gstAmount:gst_amt,
    totalAmount:amount,
   emailId:email,
   companyName:company_name,
    });

 }

Previous(){
  var self=this;

  									 ReactDOM.render(
  									<Router >
  									 <div>
                         <Route path = "/" component = { MainPageHeader }/>
                          <Route path="/" component={() => <Billing data={self} />}/>
                         
  									 </div>
  								 </Router>, document.getElementById('root'));
}
Cancel(){

    									 ReactDOM.render(
    									<Router>
    									 <div>
    										 <Route path = "/" component = { MainPageHeader }/>
                         <Route path = "/"component = {Billing}/>
                        
    									 </div>
    								 </Router>, document.getElementById('root'));
}


print(){
/* alert('step1'); */
var product_qty=this.props.noOfBubbleTops;
var newAvailableInventory =CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
this.state.availableInventory=(newAvailableInventory-(product_qty*20));
localStorage.setItem('availableInventoryL',CryptoJS.AES.encrypt(this.state.availableInventory.toString(),"shinchanbaby"));


var newAmountCollected=CryptoJS.AES.decrypt(localStorage.getItem('amountCollectedL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
var amount=this.state.response.totalAmount;
this.state.amountCollected=(Number(newAmountCollected)+Number(amount)).toFixed(2);
localStorage.setItem('amountCollectedL',CryptoJS.AES.encrypt(this.state.amountCollected.toString(),"shinchanbaby") );

var newReceiptNo=Number(CryptoJS.AES.decrypt(localStorage.getItem('receiptNoL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8))+1;

newReceiptNo=zeroFill(10,newReceiptNo);
localStorage.setItem('receiptNoL',CryptoJS.AES.encrypt(newReceiptNo.toString(),"shinchanbaby"));
this.setState(
{
  availableInventory:(newAvailableInventory-(product_qty*20)),
});


this.refs.disablefunc.setAttribute("disabled", "disabled");

var self=this;
  if(navigator.onLine){
    alert("online");
        var dbPromise = idb.open('test-db');
        //this.state.fill=CryptoJS.AES.decrypt(localStorage.getItem('fillValueL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
         dbPromise.then(function(db){
          if (db.objectStoreNames.contains('outbox') || db.objectStoreNames.contains('inventory')) {
          var tx=db.transaction('outbox','readonly');
          var keyValStore=tx.objectStore('outbox');
          var count=keyValStore.openCursor().then(function cursorIterate(cursor) {
              if (!cursor) return;
              console.log('cursor value',cursor.key);
               console.log('online');
  $.ajax({
   
      type: 'POST',
      data: cursor.value,
      url: "http://localhost:8080/RestAPI/bill/storingTransactionIndexDb",
      contentType: "application/json",
      dataType: 'json',
      success: function(data){
         console.log(data);
         
          
                              ReactDOM.render(
                              <Router>
                              <div>
                                 <Route path = "/" component = { MainPage }/>
                                  <Route path = "/Aboutus" component = { Aboutus }/>
                                  <Route exact path="/Inventory" component={Inventory}/>
                                  <Route path = "/billing"component = {Billing}/>
                                  <Route path = "/Report"component = {Report}/>
                                  <Route path="/ReprintVoid" component={ReprintVoid}/>
                                  <Route path="/ReprintPage" component={ReprintPage}/>
                                  <Route path="/VoidPage" component={VoidPage}/>
                                  <Route path="/ReprintResult" component={ReprintResult}/>
                                  <Route path="/DailyReport"component={DailyReport}/>
                                  <Route path="/HourlyReport"component={HourlyReport}/>
                                  <Route path="/PeriodReport"component={PeriodReport}/>
                                  <Route path="/PeriodReportDisplay"component={PeriodReportDisplay}/>
                                  <Route path="/VendorRegistration" component={VendorRegistration }/>
                              </div>
                            </Router>, document.getElementById('root'));             },
            error: function(data) {
            console.log('#####################error:################################'+data);
            alert('addUser error: ' + data);
            console.log(data);
            }
     });
     dbPromise.then(function(db){
        var tx=db.transaction('outbox','readwrite');
        var keyValStore=tx.objectStore('outbox');
        console.log('deleting',cursor.key);
        return keyValStore.delete(cursor.key);

});
     return cursor.continue().then(cursorIterate);
});
   
     }
    });
      //idb.delete('test-db');
      var self=this;
alert("current"+JSON.stringify(this.state));
         $.ajax({
   
                type: 'POST',
                data: JSON.stringify(
                      {
                           fillingStationId:self.state.fillingStationId,
                           vendorCode:self.state.vendorCode,
                           receiptNo:self.state.receiptNo,
                           vendorName:self.state.vendorName,
                           noOfBubbleTops:self.state.noOfBubbleTops,
                           gstPercentage:self.state.gstPercentage,
                           perBubbleTopRate:self.state.perBubbleTopRate,
                           billingAmount:self.state.billingAmount,
                           sgstAmount:self.state.sgstAmount,
                           cgstAmount:self.state.cgstAmount,
                           gstAmount:self.state.gstAmount,
                           totalAmount:self.state.totalAmount,
                           availableInventory:self.state.availableInventory,
                           dailyDate:self.state.dailyDate,
                        }),
                url: "http://localhost:8080/RestAPI/bill/storingTransaction",
                contentType: "application/json",
                dataType: 'json',
                success: function(data){
                   console.log(data);
                   

                    
                        window.print();
                     

                                        ReactDOM.render(
                                        <Router>
                                        <div>
                        <Route path = "/" component = { MainPageHeader }/>
                        <Route path = "/"component = {Billing}/>
                       

                                        </div>
                                      </Router>, document.getElementById('root'));             },
                      error: function(data) {
                      console.log('#####################error:################################'+data);
                      alert('addUser error: ' + data);
                      console.log(data);
                      }
     });
   
    

         
         
}
else{
  console.log('offline');
  var message= JSON.stringify(
    {
    
       fillingStationId:this.state.fillingStationId,
       vendorCode:this.state.vendorCode,
       receiptNo:this.state.receiptNo,
       vendorName:this.state.vendorName,
       noOfBubbleTops:this.state.noOfBubbleTops,
       gstPercentage:this.state.gstPercentage,
       perBubbleTopRate:this.state.perBubbleTopRate,
       billingAmount:this.state.billingAmount,
       sgstAmount:this.state.sgstAmount,
       cgstAmount:this.state.cgstAmount,
       gstAmount:this.state.gstAmount,
       totalAmount:this.state.totalAmount,
       availableInventory:this.state.availableInventory,
       dailyDate:this.state.dailyDate,
    });

  var dbPromise = idb.open('test-db',2,function(upgradeDb){
  var keyValStore=upgradeDb.createObjectStore('outbox',{ autoIncrement : true});
  
  });
  dbPromise.then(function(db){
   var tx=db.transaction('outbox','readwrite');
   var keyValStore=tx.objectStore('outbox');
   keyValStore.put(message);
   return tx.complete;

    }).then(function(val){
      console.log('the value of offline added');
    });

}
if ('SyncManager' in window) {
navigator.serviceWorker.ready
  .then(function (swRegistration) {
    console.log("comiiting");
    return swRegistration.sync.register('commits');
  });
}
   }

printdata(){
alert("printing");
 
}

  render() {
    return (
      <div id="main"className="container">
     <div id="printarea">
     <div className="row" id="checkInOut"style={{backgroundColor:'white',marginBottom: "0%"}}>
      
      <div className="col-xs-12" id="colcheckIn">
      <h2 id="company_name" />
      <h4 id="address"/>
     
      </div>
     
      <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     E-mail : 
      <span
     id="email" 
     >
     </span>
     </label>
     </div>
     
     <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     Mobile No :
      <span
      id="mobile_no" 
     >
     </span>
     </label>
     </div>
     
     
     <div className="row">
     
     <div className="col-xs-6" id="colcheckIn">
     <tr>
      <td>
      Date
      </td>
      <td>
      :{this.state.date}
      </td>
      </tr>
      </div>
     
     
     <div className="col-xs-6" id="colcheckIn">
      <tr>
      <td>
      Time 
      </td>
      <td>
      :{this.state.time}
      </td>
      </tr>
      </div>
      </div>
      
      <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     Bill: 
      <span
     id="bill_no" 
     >
     </span>
     </label>
     </div>
     
     <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     Vendor Name :
      <span
      id="vendor_name" 
     >
     </span>
     </label>
     </div>
     
     <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     No Of Bubbletops :
      <span
      id="product_qty" 
     >
     </span>
     </label>
     </div>
     <div className="col-xs-12 col-sm-12 col-lg-12" >
     <label>
     Rate per BubbleTop :
      <span
      id="product_price" 
     >
     </span>
     </label>
     </div>
     
     {/* <table id="producttable" style={{backgroundColor:"green",textAlign:"center"}}>
      <tbody >
      <tr>
      <td>
      No Of Bubbletops
      </td>
      :<td id="product_qty" >
      </td>
      </tr>
      <tr>
      <td>
      Rate per BubbleTop
      </td>
      :<td id="product_price" >
      </td>
      </tr>
     
      </tbody>
      </table>
      */}
     
     <div className="col-xs-12 col-sm-12 col-lg-12" >
      <table id="table2" >
      <tbody>
      <tr>
      <td>
      Billing Amount in Rs
      </td>
      <td>
      :<label id="billing_amount" />
      </td>
      </tr>
      <tr>
      
      <label id="gstper" >GST </label>%
      
      <td>
      :<label id="gstamt" />
      </td>
      </tr>
      <tr>
      <label id="sgstper">SGST </label>
      % <td>:<label id="sgst_amt" /> </td>
      </tr>
      <tr>
      
      <label id="cgstper">CGST </label>
      % <td>:<label id="cgst_amt" /> </td>
      
      </tr>
      <tr>
      <td>
      Amount in Rs<br/>
      (Incl of All Taxes)
      </td>
      <td>
      <b><label id="amount"/></b>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
     
     
      <div id="thankyou">
      <p> Thank You<br/>Visit Again </p>
      </div>
      </div>
      <table id="buttons">
      <tbody>
      <tr>
      <td>
      <input type="submit" value="Previous" onClick={()=>this.Previous()}/>
      </td>
      <td>
      <input type="submit" ref="disablefunc" value="Print" onClick={()=>this.print()}/>
      </td>
      <td>
      <input type="submit" value="Cancel" onClick={()=>this.Cancel()}/>
      </td>
      </tr>
      </tbody>
      </table>
     
     
     
     
      </div>
      </div>
      );
     
     }
     }
     
     



export default ReceiptScreen;
