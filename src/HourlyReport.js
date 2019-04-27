import React,{Component} from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Report from './Report';
import './reportTable.css';
import CryptoJS from 'crypto-js' ;
import NoTransaction from './NoTransaction';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import MainPage from './MainPage';
import MainPageHeader from './MainPageHeader';
import registerServiceWorker from './registerServiceWorker';

import './MainPage.css';
class HourlyReport extends Component{


	constructor(data) {
		super(data)
			 var today = new Date();
             var date = today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear() ;
             var currenttime=today.toLocaleTimeString();
             today.setHours(today.getHours()-1);
             today.setMinutes(today.getMinutes());
             today.setSeconds(today.getSeconds());
             today.toLocaleTimeString();
             var one_hr_lesstime=today.toLocaleTimeString();

				this.state = {
        		response:data,
			    fillingStationId:'',
			    date: date,
                currenttime:currenttime,
                one_hr_lesstime:one_hr_lesstime
		 				};
		}
		componentDidMount() {
		/*	alert('componentDidMount');*/
			
			console.log(this.props.data);
        if(this.props.data.retrievelist.length!=0){
			//For single record
			//var trHTML = '<tbody ><tr><td>' + this.state.response.vendorName + '</td><td>' + this.state.response.billingAmount + '</td></tr></tbody >';

			//For multiple records
            var trHTML;
     	    //trHTML += '<tr><th>' + 'VENDOR NAME' + '</th> <th><b>' + 'NO OF BUBBLE TOPS ' + '</b></th><th><b>' + 'GST PERCENTAGE'  + '</b></th><th><b>' + 'GROSS AMOUNT' + '</b></th><th><b>' + 'GST AMOUNT' +  '</b></th><th><b>' + 'TOTAL AMOUNT' + '</b></th><th><b>'+ 'TIME' + '</b></th></tr>';
     		
     			$.each(this.props.data.retrievelist, function (i, item) {
				/*alert(item);*/
				trHTML += '<tr class="success" ><td>' + item.receiptNo + '</td><td>' + item.vendorName + '</td><td>'  + item.noOfBubbleTopsFilled +'</td><td>' + item.billingAmount + '</td><td>' + item.gstamount + '</td><td>' + item.totalAmount + '</td><td>' + item.billStatus + '</td><td>'+ item.status + '</td><td>' + item.time +'</td></tr>';
			});
            $("#tableHeadings").append(trHTML);
            

	
	       
	       {/* var summary_table;
            // summary_table += '<tr/><th><b>' + 'TOTAL NO OF BUBBLE TOPS'  + '</b></th> <th><b>' + 'GST AMOUNT' + '</b></th> <th><b>' + 'GROSS AMOUNT' +  '</b></th><th><b>' + 'TOTAL AMOUNT' + '</b></th></tr>';
			$.each(this.props.data.summary., function (i, item) {
				
				summary_table += '<tr class="active" ><td>' + item.noOfBubbleTopsFilled + '</td><td>'  + item.gstAmount + '</td><td>' + item.grossAmount + '</td><td>' + item.total + '</td><td>' + item.voidTotal +'</td><td>' + item.finalTotal +'</td></tr>';
			});
*/}
			$("#bubbleTops").append(this.props.data.summary[0].noOfBubbleTopsFilled);

			$("#gstperc").append(this.props.data.retrievelist[0].gstpercentage);
			$("#gstamt").append(this.props.data.summary[0].gstAmount);
			$("#sgstper").append(this.props.data.retrievelist[0].gstpercentage/2);
			$("#sgst_amt").append(this.props.data.summary[0].gstAmount/2);
			$("#cgstper").append(this.props.data.retrievelist[0].gstpercentage/2);
			$("#cgst_amt").append(this.props.data.summary[0].gstAmount/2);
			$("#netAmount").append(this.props.data.summary[0].netAmount);
			
			$("#voidAmount").append(this.props.data.summary[0].voidTotal);
			$("#grossAmount").append(this.props.data.summary[0].grossTotal);
}
else{
        ReactDOM.render(
                <Router >
                <div>
                <Route path = "/" component = { MainPageHeader }/>
                <Route path="/" component={NoTransaction} />
           
                </div>
                </Router>, document.getElementById('root'));



}
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
	alert('Hourly report');
		return(

    <div className="container" style={{ marginTop: "10%",marginBottom: "10%"}}  >

  <ul class="previous disabled" 
            id="backbtn">
                <a href="#" onClick={()=>this.BackbtnFunc()}>
                <span aria-hidden="true">&larr;
                </span> BACK</a></ul>
   
	<h3 className="centerAlign">HourlyReport</h3>
  <h4 className="centerAlign">{this.state.date} </h4>
  <h5 className="centerAlign"> From {this.state.one_hr_lesstime}  to  {this.state.currenttime}</h5>

               <div style={{paddingBottom:"10%"}}>
        <table  id="tableHeadings">
        <thead>
         <tr className="tableHeadingsbg">
         	 <th>RECEIPT#</th>
	         <th>VENDOR NAME </th> 
	         <th>#BUBBLE TOPS</th>
	         <th>NET ₹ </th>
	         <th>GST ₹ </th>
	         <th>GROSS ₹ </th>
                 <th>PAID / DUE </th>
	         <th>STATUS</th>
	         <th>TIME</th>
         
         </tr>
     	</thead>
     	
         </table>
         
        </div>
   
        <div>
     	 <table style={{margin:"auto"}} id="tab">
         <tbody>
            <tr>
                    <td className="boldCol">
                   #BUBBLE TOPS
                    </td>
                    <td>
                     : <label  id="bubbleTops" className="unboldCol"></label>
                    </td>
            </tr>
             <tr>
                   
                    <label className="boldCol" id="gstperc" >GST   </label>
                    
                    % <td>
                    : <label id="gstamt" className="unboldCol" />
                    </td>
            </tr>
            <tr>
                    <label  className="boldCol"  id="sgstper"> SGST   </label>
                  % <td>: 
                  <label id="sgst_amt"  className="unboldCol"/> 
                  </td>
            </tr>
            <tr>
                  
                  <label className="boldCol" id="cgstper">CGST   </label>
                  % <td>: <label id="cgst_amt"  className="unboldCol"/> </td>
                  
            </tr>
             <tr>
                    <td className="boldCol" >
                    NET ₹ 
                    </td>
                    <td>
                    : <label id="netAmount"  className="unboldCol" ></label>
                    </td>
            </tr>
             
              <tr>
                    <td className="boldCol">
                    VOID ₹ 
                    </td>
                    <td>
                    : <label id="voidAmount"  className="unboldCol"></label>
                    </td>
            </tr>
            <tr>
                    <td className="boldCol">
                    GROSS ₹ 
                    </td>
                    <td>
                    : <label id="grossAmount"  className="unboldCol" ></label>
                    </td>
            </tr>
           
      </tbody>
      </table>
  </div>
 </div>
		);
	}

}
export default HourlyReport;
