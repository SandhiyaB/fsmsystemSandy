
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Receiptpage from './Receiptpage';
import $ from "jquery";
import { FormErrors } from './FormErrors';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';

import './MainPage.css';


class Configuration extends Component{

	constructor(data) {



        super(data)
        this.state = {
					 fillingStationId:'',
					 receiptNo:'',
						vendorName: '',
						vendorCode: '',
						noOfBubbleTops:'',
						perBubbleTopRate:'',
						billingAmount:'',
						gstPercentage:'',
						gstAmount:'',
						cgstAmount:'',
						sgstAmount:'',
						totalAmount:'',

						   formErrors: {noOfBubbleTops: '', perBubbleTopRate: ''},
					 noOfBubbleTopsValid: false,
					 perBubbleTopRateValid: false
        };
    }

		
	edi(){
/* 

		alert(this.state.fillingStationId);
		alert(this.state.vendorName);
		alert(this.state.vendorCode);
		alert(this.state.noOfBubbleTops);
		alert(this.state.perBubbleTopRate);
		alert(JSON.stringify(this.state));
 */
			var noOfBubbleTopsProps=this.state.noOfBubbleTops;

			var perBubbleTopRateProps=this.state.perBubbleTopRate;
			var gstProps=localStorage.getItem('gstPercentageL');
			 this.state.billingAmount=(noOfBubbleTopsProps*perBubbleTopRateProps).toFixed(2);
			 this.state.gstAmount=(this.state.billingAmount*(gstProps/100)).toFixed(2);
			 this.state.cgstAmount=this.state.gstAmount/2;
			 this.state.sgstAmount=this.state.cgstAmount;
			 this.state.totalAmount = Number(this.state.billingAmount) + Number( this.state.gstAmount);
			
			 this.setState({

						vendorName: this.state.vendorName,
						vendorCode:  this.state.vendorCode,
						noOfBubbleTops:  this.state.noOfBubbleTops,
						perBubbleTopRate:  this.state.perBubbleTopRate,
					});

     /* alert(this.state.billingAmount);
		 */			ReactDOM.render(
								 React.createElement(Receiptpage, this.state),
									 document.getElementById("root"));

					}
					
edit(){
	 $("#configform").removeClass("disabledbutton");
	this.refs.editenable.setAttribute('disabled','disabled');
	
}



componentDidMount() {
     $("#configform").addClass("disabledbutton");
       

   }
  			

	render(){

		return(

		
			<div className="container">
			<h3>Configuration Settings</h3>
			
			<form style={{backgroundColor:'gray'}} id="configform" ref="editenable">

					<div className="container config" >
					<table className="table">
		
    <tbody>
				  <tr>
					<td><label id="configmenu" htmlFor="configEmailAlert">Email Alert:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="checkbox" id="configEmailAlert" data-toggle="toggle" data-size="mini" data-onstyle="success" data-offstyle="danger"/>
										
									  </label>
									</div></td>
					
				  </tr>
											  <tr>
					<td><label htmlFor="vendorIdid">Mobile Alert:</label></td>
						<td>
						<div className="checkbox">
							 <label>
								<input type="checkbox" id="vendorIdid" data-toggle="toggle" data-size="mini" data-onstyle="success" data-offstyle="danger"/>
								  </label>
									</div>
									</td>
					
				  </tr>

				  				  <tr>
					<td><label htmlFor="vendorIdid">Inventory Alert:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="checkbox" id="vendorIdid" data-toggle="toggle" data-size="mini" data-onstyle="success" data-offstyle="danger"/>
										
									  </label>
									</div></td>
					
				  </tr>

				  				  <tr>
					<td><label htmlFor="vendorIdid">Inventry Limit:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="checkbox" id="vendorIdid" data-toggle="toggle" data-size="mini" data-onstyle="success" data-offstyle="danger"/>
										
									  </label>
									</div></td>
					
				  </tr>

				  				  <tr>
					<td><label htmlFor="vendorIdid"> Report Alert:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="checkbox" id="vendorIdid" data-toggle="toggle" data-size="mini" data-onstyle="success" data-offstyle="danger"/>
										
									  </label>
									</div></td>
					
				  </tr>

				  				  <tr>
					<td><label htmlFor="vendorIdid">Trigger Time:</label></td>
					<td>
					 <div className="input-group bootstrap-timepicker timepicker">
						<input id="timepicker" type="text" className="form-control input-small"/>
						<span className="input-group-addon">
							<i className="glyphicon glyphicon-time">
								</i>
							</span>
					</div>
					 <div>
    
    
  </div>
							</td>
					
				  </tr>
				  
				   <tr>
					<td><label htmlFor="vendorIdid">Email ID:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="email" id="vendorIdid" 
										value={CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)}

										style={{marginLeft:'-8px', color:'black'}} >
											
										</input>
									  </label>
									</div></td>
					
				  </tr>
				   <tr>
					<td><label htmlFor="vendorIdid">Mobile #:</label></td>
					<td><div className="checkbox">
									  <label>
										<input type="number" id="vendorIdid"
										  value= {CryptoJS.AES.decrypt(localStorage.getItem('mobileNoL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)}
										  style={{marginLeft:'-8px', color:'black'}} />
										
									  </label>
									</div></td>
					
				  </tr>

     
    </tbody>
  </table>				
					<button type="submit" style={{marginBottom:'70px', color:'black'}} className="btn btn-default"  onClick={() => this.save()}>SAVE</button>

				   </div>
				   </form>
<button type="submit" style={{marginBottom:'70px', color:'black'}} className="btn btn-default"  onClick={() => this.edit()} >EDIT</button>
				</div>

		);
	}

}

export default Configuration;