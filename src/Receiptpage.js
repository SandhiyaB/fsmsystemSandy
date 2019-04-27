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
  import { browserHistory,IndexRoute } from 'react-router';
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
 
  import Receiptpage from './Receiptpage';
 
  import { confirmAlert } from 'react-confirm-alert'; // Import
  import 'react-confirm-alert/src/react-confirm-alert.css'
 
 
 
  class ReceiptPage extends Component {
  constructor(data) {
  super(data)
  var today = new Date();
  var date = today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear();
  var time=today.toLocaleTimeString();
  var dailyDate = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate()  + ' '+today.toLocaleTimeString() ;
  
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
  billStatus:'DUE',
  cashReceived:'',
  balanceAmount:'',
 
  };
  }
 
 
 
  Balancestatus(){
  
  var cashReceivedCal=this.state.cashReceived; 
  var balanceAmount=this.state.balanceAmount;
  
  this.state.balanceAmount = (Number(this.state.totalAmount) - Number(cashReceivedCal)).toFixed(2);
  
  if(Number(this.state.balanceAmount)==0)
  {
    this.state.billStatus='PAID';

    this.setState({
      billStatus:this.state.billStatus,

    });
  }else{
    this.state.billStatus='DUE';
    this.setState({
      billStatus:this.state.billStatus,
    });

  }
  
  console.log(this.state.balanceAmount);
  console.log(this.state.balanceAmountp);
  ReactDOM.render(
  React.createElement(Receiptpage, this.state),
  document.getElementById("root"));
 
  
 
  }
 
  Printstatus = () => {
  
  confirmAlert({
  title: 'Payment Status',
  message: 'Please Select .',
  buttons: [
  {
  label: 'PAID',
  onClick: () =>{this.paidPrint()},
  },
  {
  label: 'DUE',
  onClick: () =>{this.duePrint()},
  }
  ]
  })
 };
 
 paidPrint(){
  this.state.billStatus='PAID';
  this.setState({
  billStatus:'PAID',
  });
  this.print()
 
  
  }
 
 duePrint(){
  this.state.billStatus='DUE';
  this.setState({
  billStatus:'DUE',
  });
  this.print()
 
  
  }
 
 
 
  
  printp(printpage){
  var printContents = document.getElementById(printpage).innerHTML;
  var originalContents = document.body.innerHTML;
  
  document.body.innerHTML = printContents;
  
  window.print();
  
  document.body.innerHTML = originalContents;
  return false;
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
  var balanceAmount=this.state.balanceAmount;
  var receivedCash =this.state.cashReceived;
 
 
  $("#gstper").append(gst_per);
  $("#sgstper").append(sgst_per);
  $("#cgstper").append(cgst_per);
  $("#billing_amount").append(billing_amount);
  $("#sgst_amt").append(sgst_amt);
  $("#cgst_amt").append(cgst_amt);
  $("#amount").append(amount);
  $("#gstamt").append(gst_amt);
 
  $("#balamt").append(balanceAmount);
 
  
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
 
  balanceAmount:amount,
 
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
  handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
  () => { (name, value) });
 }
 
  
 
 
 
 
 
  
  print(){
 /* alert('step1'); */
 alert(this.state.dailyDate);
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
  alert(this.state.billStatus);

  var self=this;
  if(navigator.onLine){
 /* alert("online"); */
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
  </Router>, document.getElementById('root')); },
 
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
 /* alert("current"); */
  var self=this;
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
  billStatus:self.state.billStatus,
  balanceAmount:this.state.balanceAmount,
  cashReceived:this.state.cashReceived,
 
  }),
  url: "http://localhost:8080/RestAPI/bill/storingTransaction",
  contentType: "application/json",
  dataType: 'json',
  success: function(data){
  
  self.printp('print');
  
  /* 
  if (navigator.appName == "Microsoft Internet Explorer") 
  { 
  var PrintCommand = '<object ID="PrintCommandObject" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2">
  </object>';
  document.body.insertAdjacentHTML('beforeEnd', PrintCommand); 
  PrintCommandObject.ExecWB(6, -1);
  PrintCommandObject.outerHTML = "";
  } 
  else { window.print(); } */
  
  
  console.log(data);
  
  /* window.print(); */
  
  ReactDOM.render(
  <Router>
  <div>
  <Route path = "/" component = { MainPageHeader }/>
  <Route path = "/"component = {Billing}/>
  
  
  </div>
  </Router>, document.getElementById('root')); },
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
  billStatus:this.state.billStatus,
  balanceAmount:this.state.balanceAmount,
  cashReceived:this.state.cashReceived,

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
  
  
  
  render() {
  return (
  <div id="main" className="container">
  
  <div className="row" id="checkInOut"style={{backgroundColor:'white',marginBottom: "0%"}}>
  
  <div id="print">
  
  <div className="col-xs-12" id="colcheckIn">
  <h2 style={{textAlign: "center"}} id="company_name" />
  <h4 style={{textAlign: "center"}} id="address"/>
  
  </div >
  
  <div className="col-xs-12 col-sm-12 col-lg-12" style={{textAlign: "center",fontSize:"16px"}}>
  <label>
  E-mail : 
  </label>
  <span
  id="email" 
  >
  </span>
  
  </div>
  
  <div className="col-xs-12 col-sm-12 col-lg-12" style={{textAlign: "center",fontSize:"16px"}} >
  <label>
  Mobile No :
  </label>
  <span
  id="mobile_no" 
  >
  </span>
  
  </div>
  
  
  <div className="row" style={{ fontWeight:"800"}}>
  
  <div className="col-xs-6" id="colcheckIn" style={{paddingLeft: "30px"}}>
  <tr>
  <td>
  Date 
  </td>
  <td style={{fontSize: "15px"}}>
  :{this.state.date}
  </td>
  </tr>
  </div>
  
  
  <div className="col-xs-6" id="colcheckIn" >
  <tr>
  <td>
  Time 
  </td>
  <td style={{fontSize: "15px"}}>
  :{this.state.time}
  </td>
  </tr>
  </div>
  </div>
  <div id="thankyou" style={{textAlign: "center",
  fontSize:" large"}}>
  <p> 
  -------------------------------------------</p>
  </div>
  
  
  <div className="col-xs-12 col-sm-12 col-lg-12"
  style={{ marginLeft: "-38px",
  textAlign: "center" }}>
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  Bill : 
 
  </label>
  <span style={{textAlign: "right" ,fontSize:"20px",fontWeight:"900"}}
  id="bill_no" 
  >
  </span>
  
  </div>
  
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{fontSize:"18px",marginLeft: "-56px",
  textAlign: "center"}}
  >
  <label style={{fontSize:"18px",fontWeight:"100" }}>
  Vendor Name :
  </label >
 
  <span style={{fontSize:"18px",fontWeight:"600"}}
  id="vendor_name" 
  >
  </span>
  
  </div>
  
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{fontSize:"18px",marginLeft: "-18px",
  textAlign: "center"}} >
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  No Of Bubbletops :
 
  </label>
 
  <span
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "75px"}}
  id="product_qty" 
  >
  </span>
 
  </div>
 
  <div className="col-xs-12 col-sm-12 col-lg-12"
  style={{fontSize:"18px" ,marginLeft: "-17px",
  textAlign: "center"}} >
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  Rate per BubbleTop :
 
  </label>
  <span
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "61px"}}
  id="product_price" 
  >
  </span>
  
  </div>
  
  
  <div className="col-xs-12 col-sm-12 col-lg-12"
  style={{fontSize:"18px",marginLeft: "-3px",
  textAlign: "center"}}>
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  Billing Amount in Rs :
 
  </label>
  <span
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "51px"}}
  id="billing_amount" 
  >
  </span>
  
  </div>
 
  <div className="col-xs-12 col-sm-12 col-lg-12"
  style={{fontSize:"18px",marginLeft: "11px",
  textAlign: "center"}}>
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  GST :
 
  </label>
  <span
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "150px"}}
  id="gstamt" 
  >
  </span>
  
  </div>
 
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{fontSize:"18px",marginLeft: "-11px",
  textAlign: "center"}}>
  <label style={{fontSize:"18px",fontWeight:"100"}} >
  CGST % :
  </label>
  <span
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "150px"}}
  id="cgst_amt" 
  >
  </span>
 
  </div>
 
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{fontSize:"18px",marginLeft: "-10px",
  textAlign: "center"}} >
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  SGST % :
 
  </label>
  <span 
  style={{
  fontSize:"18px",
  fontWeight:"600",
  paddingLeft: "151px"}}
  id="sgst_amt" 
  >
  </span>
 
  </div>
 
  
  
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{marginLeft: "-30px",
  textAlign: "center"}} 
  >
  <label style={{fontSize:"18px"}}>
  Amount in Rs<br/>
  (Incl of All Taxes)
 
  </label>
  <span 
  id="amount" 
  style={{
  fontSize: "x-large",
  fontWeight: "900",
  paddingLeft: "20px"}}
  >
  </span> 
  
  </div>
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{marginLeft: "-30px",
  textAlign: "center"}} 
  >
  <label style={{fontSize:"18px"}}>
  Amount Paid Rs<br/>
  (Incl of All Taxes)
 
  </label>
  <span 
  id="amount" 
  style={{
  fontSize: "x-large",
  fontWeight: "900",
  paddingLeft: "20px"}}
  >{this.state.cashReceived}
  </span> 
  &nbsp;&nbsp;<p> -------------------------</p>
  </div>
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{marginLeft: "-30px",
  textAlign: "center"}} 
  >
  <label style={{fontSize:"18px"}}>
  Balance Amount in Rs<br/>
  (Incl of All Taxes)
 
  </label>
  <span 
  id="balamt" 
  style={{
  fontSize: "x-large",
  fontWeight: "900",
  paddingLeft: "20px"}}
  > {this.state.balanceAmount}
  </span> 
  <p> ---------------------- </p>
  </div>
 
  <div className="col-xs-12 col-sm-12 col-lg-12" 
  style={{fontSize:"18px",marginLeft: "-10px",
  textAlign: "center"}} >
  <label style={{fontSize:"18px",fontWeight:"100"}} >
 
  Status :
 
  </label>
 
  <span 
  style={{
  fontSize:"21px",
  fontWeight:"600",
  paddingLeft: "1px"}}
  id="bill"
  value={this.state.billStatus} 
 
  > {this.state.billStatus} 
 
  </span>
 
  </div>
 
 
 
  
  
  
  <div id="thankyou" style={{textAlign: "center",
  fontSize:" large"}}>
  <p> Thanks! Visit Again <br/>
  ***************************************** </p>
  </div>
  
  </div >
  
  <table id="buttons" style={{ marginBottom:"25%", marginLeft: "auto",
  marginRight: "auto"}}>
  <tbody>
  <tr>
  <td>
  <input type="submit" class="btn btn-info btn-xs" value="Previous" onClick={()=>this.Previous()}/>
  </td>
  <td>
  <button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Pay</button>
 
  <div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog modal-sm">
  <div class="modal-content">
  <div class="modal-header">
  <button type="button" class="close" data-dismiss="modal">&times;</button>
  <h4 class="modal-title">Bill Payment</h4>
  </div>
  <div class="modal-body">
  <div class="form-group">
  <label htmlFor="cashReceivedid">Enter the Amount:</label>
  <input type="number"
  name="cashReceived"
  value={this.state.cashReceived}
  onChange={this.handleUserInput}
  class="form-control"
  id="cashReceivedid"/>
  </div>
  </div>
  <div class="modal-footer">
  <button type="button" ref="disablefunc" class="btn btn-default" onClick={()=>this.Balancestatus()} data-dismiss="modal">pay</button>
  </div>
  </div>
  </div>
  </div>
  </td>
  <td>
  <input type="submit" ref="disablefunc" class="btn btn-info btn-xs" value="Print" onClick={()=>this.print()}/> 
  </td>
  {/* <td>
  <input type="submit" ref="disablefunc" value="Print" onClick={()=>this.Printstatus()}/> 
  <input type="submit" ref="disablefunc" value="pay" onClick={()=>this.Balancestatus()}/>
  </td>*/}
  <td>
  <input type="submit" class="btn btn-info btn-xs" value="Cancel" onClick={()=>this.Cancel()}/>
  </td>
  </tr>
  </tbody>
  </table>
  
  
  
  
  </div>
  </div>
  );
  
  }
  }
  
  
  
  {/*}
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
  
  <label id="gstper">GST </label>%
  
  <td>
  :<label id="gstamt" />
  </td>
  </tr>
  <tr>
  <label id="sgstper">CGST </label>
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
  */}
  
  
  
  
  
  
  export default ReceiptPage;