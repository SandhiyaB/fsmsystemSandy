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
import ReprintVoid from './ReprintVoid';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js' ;
import MainPageHeader from './MainPageHeader';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class VoidPage extends Component{


	constructor(props) {
		super(props)
				this.state = {
			 fillingStationId:'',
			 receiptNo:'',
				}

	}

  		handleUserInput = (e) => {
      const name = e.target.name;
	  const value = e.target.value;
	  this.setState({[name]: value});
	 
  }
  Submit(){
   
    this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);

 						/*  alert(JSON.stringify(this.state)); */
 						 $.ajax({
 						 				type: 'POST',
 						 				data:JSON.stringify(this.state),
 						 				url: "http://localhost:8080/RestAPI/bill/voidTransaction",
 						 				contentType: "application/json",
 						 				dataType: 'json',
 						 				async:false,
 						 				success: function(data,textStatus,jqXHR)
 						        {
 						 					 console.log(data);
 						 				/* 	 alert("receipt reprint"); */

                        if(data.vendorName==="INVALID_RECEIPT_NO"){

                                            alert("INVALID Receipt NO");
                                        }else{
										
												confirmAlert({
													title: 'Success',
													message: 'Succesfully Voided '+data.receiptNo,
													buttons: [
													  {
														label: 'Ok',
													
													  },
				
													]
												  })
						
										
                        ReactDOM.render(
                                     <Router >
                                     <div>
            <Route path = "/" component = { MainPageHeader }/>
            <Route path = "/" component = { ReprintVoid }/>
            
              <Route path="/" component={VoidPage}/>
                    </div>
                       </Router>, document.getElementById('root'));
                       
                        }
},
 						 			  error:function(data) {
 						             console.log('#####################error:################################'+data);
 						             alert('Login Invalid'+ data);

 						  		  },
 						 				});


  }
  
   componentDidMount() {
      var self=this;
   }
  

render(){
	
   
	
		return(

<div className="container">
	  <h3 className="text-muted">Void  Transaction </h3>
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

					<button type="submit" style={{marginBottom:'40%', color:'black'}} className="btn btn-default"  onClick={() => this.Submit()}>Submit</button>

		</div>
		);
	}

}
export default VoidPage;
