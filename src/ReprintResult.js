import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import Report from './Report';
import CryptoJS from 'crypto-js' ;
import './ReceiptScreen.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import MainPageHeader from './MainPageHeader';
import PaidDuePage from './PaidDuePage';
import ReprintVoid from './ReprintVoid';

class ReprintResult extends Component{


	constructor(data) {
		super(data)
				this.state = {
                              
				 response:data,
				 fillingStationId:''
		 				};
		}
		componentDidMount() {
			/* alert( this.state.response);
			alert($("#records_table")); */
	
			//For single record
			//var data='<tbody ><b><tr><td> Bill#:' + this.props.data.receiptNo+ '</td></tr><tr><td> Vendor Name:' +this.props.data.vendorName + '</td></tr><tr><td>Date:' +this.props.data.date  + '</td></tr><tr><td>Time' +this.props.data.time+ '</td></tr></td></tr><b></tbody >';
			//$("#table1").append(data);
	
			//var trHTML = '<tbody ><b><tr><td>No Of Bubbletops:' +this.props.data.noOfBubbleTops+ '</td></tr><tr><td>Rate per BubbleTop :' +this.props.data.perBubbleTopRate+ '</td></tr><tr><td>Billing Amount:' +this.props.data.billingAmount+ '</td></tr><tr><td>GST' +this.props.data.gstPercentage+ '%</td><td>:' +this.props.data.gstAmount+ '</td></tr><tr><td>SGST' +this.props.data.gstPercentage/2+ '%</td><td>:' +this.props.data.sgstAmount+ '</td></tr><tr><td>CGST' +this.props.data.gstPercentage/2+ '%</td><td>:' +this.props.data.cgstAmount+ '</td></tr><tr><td>Amount:' +this.props.data.totalAmount+ '</td></tr><b></tbody >';
			//$("#records_table").append(trHTML);
			//trHTML	
			$("#bill_no").append(this.props.data.receiptNo);
         	$("#vendor_name").append(this.props.data.vendorName);
         	$("#date").append(this.props.data.date);
         	$("#time").append(this.props.data.time);
			$("#product_qty").append(this.props.data.noOfBubbleTops);
			$("#product_price").append(this.props.data.perBubbleTopRate);
			$("#billing_amount").append(this.props.data.billingAmount);
			$("#gstper").append(this.props.data.gstPercentage);
			$("#gstamt").append(this.props.data.gstAmount);
			$("#sgstper").append(this.props.data.gstPercentage/2);
			$("#sgst_amt").append(this.props.data.sgstAmount);
			$("#cgstper").append(this.props.data.gstPercentage/2);
			$("#cgst_amt").append(this.props.data.cgstAmount);
      $("#amount").append(this.props.data.totalAmount);
      $("#billStatus").append(this.props.data.billStatus);
			var address=CryptoJS.AES.decrypt(localStorage.getItem('addressL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
                  $("#address").append(address);
                  var email=CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
                  $("#email").append(email);
                  var mobile=CryptoJS.AES.decrypt(localStorage.getItem('mobileNoL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
                  $("#mobile_no").append(mobile);
                  
		 }

		 print(){
		 	window.print();
		 }
      
     
     Cancel(){
 
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
render(){
	
		return(

           <div id="main" className="container">
    
    <div className="row" id="checkInOut"style={{backgroundColor:'white',marginBottom: "0%"}}>
    
    <div id="print">
   
    <div className="col-xs-12" id="colcheckIn">
    <h2   style={{textAlign: "center"}} id="company_name" />
    <h4 style={{textAlign: "center"}} id="address"/>
    
    </div >
    
    <div className="col-xs-12 col-sm-12 col-lg-12"  style={{textAlign: "center",fontSize:"16px"}}>
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
    
    
    <div className="row"   style={{ fontWeight:"800"}}>
    
    <div className="col-xs-6" id="colcheckIn" style={{paddingLeft: "30px"}}>
    <tr>
    <td>
    Date :
    </td>
    <span 
    id="date"  style={{fontSize: "15px"}}
    >
    </span>

     </tr>
    </div>
    
    
    <div className="col-xs-6" id="colcheckIn" >
    <tr>
    <td>
    Time :
    </td>
     <span 
    id="time"  style={{fontSize: "15px"}}
    >
    </span>
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
    <label style={{fontSize:"18px",fontWeight:"100"}}  >
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
         id="billStatus"
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
   
    <table id="buttons"    style={{ marginBottom:"25%", marginLeft: "auto",
    marginRight: "auto"}}>
    <tbody>
    <tr>
    
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
   
   

export default ReprintResult;

/*
  <div id="main" className="container">
    
    <div className="row" id="checkInOut"style={{backgroundColor:'white',marginBottom: "0%"}}>
    
    <div id="print">
   
    <div className="col-xs-12" id="colcheckIn">
    <h2   style={{textAlign: "center"}} id="company_name" />
    <h4 style={{textAlign: "center"}} id="address"/>
    
    </div >
    
    <div className="col-xs-12 col-sm-12 col-lg-12"  style={{textAlign: "center",fontSize:"16px"}}>
    <label>
    E-mail : 
    <span
    id="email" 
    >
    </span>
    </label>
    </div>
    
    <div className="col-xs-12 col-sm-12 col-lg-12" style={{textAlign: "center",fontSize:"16px"}} >
    <label>
    Mobile No :
    <span
    id="mobile_no" 
    >
    </span>
    </label>
    </div>
    
    
    <div className="row"   style={{ fontWeight:"800"}}>
    
    <div className="col-xs-6" id="colcheckIn" style={{paddingLeft: "30px",fontSize:"20px"}}>
    <tr>
    <td>
    Date :
    </td>
    <span 
    id="date" 
    >
    </span>
    </tr>
    </div>
    
    
    <div className="col-xs-6" id="colcheckIn" >
    <tr>
    <td>
    Time :
    </td>
    <span 
    id="time" 
    >
    </span>
    </tr>
    </div>
    </div>
    <div id="thankyou" style={{textAlign: "center",
       fontSize:" large"}}>
    <p> 
    ------------------------------------------------------</p>
    </div>
    
    <div className="col-xs-12 col-sm-12 col-lg-12" >
    <label>
    Bill: 
    <span style={{textAlign: "right" ,fontSize:"20px" }}
    id="bill_no" 
    >
    </span>
    </label>
    </div>
    
    <div className="col-xs-12 col-sm-12 col-lg-12"  style={{fontSize:"18px"}}>
    <label>
    Vendor Name :
    <span
    id="vendor_name" 
    >
    </span>
    </label>
    </div>
    
    <div className="col-xs-12 col-sm-12 col-lg-12" style={{fontSize:"18px"}} >
    <label>
    No Of Bubbletops :
    <span
    style={{
     paddingLeft: "37px"}}
    id="product_qty" 
    >
    </span>
    </label>
    </div>
    <div className="col-xs-12 col-sm-12 col-lg-12" style={{fontSize:"18px"}} >
    <label>
    Rate per BubbleTop :
    <span
    style={{
     paddingLeft: "25px"}}
    id="product_price" 
    >
    </span>
    </label>
    </div>
    
 
   <div className="col-xs-12 col-sm-12 col-lg-12" style={{fontSize:"18px"}}>
    <label>
    Billing Amount in Rs :
    <span
    style={{
     paddingLeft: "20px"}}
    id="billing_amount" 
    >
    </span>
    </label>
    </div>
    <div className="col-xs-12 col-sm-12 col-lg-12"  style={{fontSize:"18px"}}>
    <label>
    GST :
    <span
      style={{
       paddingLeft: "100px"}}
    id="gstamt" 
    >
    </span>
    </label>
    </div>
    <div className="col-xs-12 col-sm-12 col-lg-12" style={{fontSize:"18px"}}>
    <label>
    CGST % :
    <span
      style={{
       paddingLeft: "75px"}}
    id="cgst_amt" 
    >
    </span>
    </label>
    </div>
    <div className="col-xs-12 col-sm-12 col-lg-12" style={{fontSize:"18px"}} >
    <label>
    SGST % :
    <span 
     style={{
         paddingLeft: "75px"}}
    id="sgst_amt" 
    >
    </span>
    </label>
    </div>
    <div id="thankyou" style={{textAlign: "center",
       fontSize:" large"}}>
    <p> 
    ------------------------------------------------------</p>
    </div>
   
   
    <div className="col-xs-12 col-sm-12 col-lg-12"  >
    <label style={{fontSize:"18px"}}>
    Amount in Rs<br/>
    (Incl of All Taxes)
    <span 
    id="amount" 
    style={{
     fontSize: "x-large",
    fontWeight: "900",
    paddingLeft: "20px"}}
    >
    </span>
    </label>
    </div>
   
   
     
    <div id="thankyou" style={{textAlign: "center",
       fontSize:" large"}}>
    <p> Thanks! Visit Again <br/>
    ************************************************ </p>
    </div>
   
    </div >
   
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
    </div>*/