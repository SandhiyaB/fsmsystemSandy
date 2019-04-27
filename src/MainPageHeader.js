
import React,{Component} from 'react';

import MainPage from './MainPage';
import Aboutus from './Aboutus';
import Billing from './Billing';
import ReprintVoid from './ReprintVoid';
import ReprintResult from './ReprintResult';
import Configuration from './Configuration';
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';

import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReportDisplay';
import Inventory from './Inventory';

import image from './image/billing.png';
import ReactDOM from 'react-dom';
import './MainPage.css';
import $ from 'jquery';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import LoginPage from './LoginPage';
import VendorRegistration from './VendorRegistration';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js' ;



class MainPageHeader extends Component{
	
constructor(props) {
				super(props)
				var today = new Date();
				var dailyDate = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
			   this.state = {
					 fillingStationId:'',
					 dailyDate:dailyDate,
					 emailId:'',
					 password:'',
					 
				 };
		}

MainPageFunc()
{
/* 	 alert(" main page"); */

	
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



openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

closeNav() {
			document.getElementById("mySidenav").style.width = "0";
		}
		


LogoutPage()
{
	/*  alert("Logging Out"); */
	 localStorage.clear();
	 ReactDOM.render(<LoginPage />,document.getElementById('root'));
}

Config(){

	ReactDOM.render(
		<Router>
		 <div>
		 
		<Route path="/" component={MainPageHeader}/>
		
		<Route  path="/" component={Configuration}/>
		
		
		</div>
		 </Router>,
		document.getElementById('root'));

}
vendorRegistrationFunc()
{
	
	 ReactDOM.render(
			<Router>
			  <div>
					 <Route path="/" component={MainPageHeader}/>
					  <Route path="/" component={VendorRegistration }/>
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
}

AboutusFunc(){


	ReactDOM.render(
		<Router>
		  <div>	
				<Route path="/" component={MainPageHeader}/>
				 <Route path="/" component={Aboutus}/>
				
				 
				
							 </div>
							  </Router>,
										document.getElementById('root'));
										registerServiceWorker();	
}
TermsAndConfig()
{

/* alert("terms and Condition"); */

}
HelpFunc(){
/* 	alert("Help"); */

}
	printerSettingsFunc(){
			// Step 1: Scan for a device with 0xffe5 service
navigator.bluetooth.requestDevice({
  filters: [{ services: [0x180A] }]
})
  .then(function(device) {
    // Step 2: Connect to it
    return device.gatt.connect();
  })
  .then(function(server) {
    // Step 3: Get the Service
    return server.getPrimaryService(0x180A);
  })
  .then(function(service) {
    // Step 4: get the Characteristic
    return service.getCharacteristic(0xffe9);
  })
  .then(function(characteristic) {
    // Step 5: Write to the characteristic
    var data = new Uint8Array([0xbb, 0x25, 0x05, 0x44]);
    return characteristic.writeValue(data);
  })
  .catch(function(error) {
     // And of course: error handling!
     console.error('Connection failed!', error);
  });
		
		
		
		
		
	}
componentDidMount =()=>{
	
	if(localStorage.getItem('isLoggedIn')){
		var login=CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
		if(login=="true")
		{
		this.interval = setInterval(() => this.Refresh(), 200000);
		 
		}
		}
	$(document).ready(function(){
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".sideNav").hasClass("sideNav in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
});	

}




Refresh() {
	this.state.emailId=CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)
	this.state.password=CryptoJS.AES.decrypt(localStorage.getItem('PasswordL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)
   
	this.setState({
      emailId: this.state.emailId,
      password: this.state.password,

    });
     var key="shinchanbaby";
/*     alert(this.state.emailId);
    alert(this.state.password);
    alert(JSON.stringify(this.state)); */
    var self = this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          emailId: this.state.emailId,
          password: this.state.password,
          dailyDate:this.state.dailyDate,
        }),
        url: "http://localhost:8080/RestAPI/rest/login",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function(data, textStatus, jqXHR)

        {
          console.log(data);
          if (data.fillingStationId == "NOT_REGISTERED") {
            alert("please Register");

          } else if (data.fillingStationId == "PASSWORD_INCORRECT") {
            alert("Please check your emailId and Password");

          } else {
             var key="shinchanbaby";
            localStorage.setItem('fillingStationIdL',CryptoJS.AES.encrypt(data.fillingStationId,key));
            localStorage.setItem('UserNameL', CryptoJS.AES.encrypt(data.userName,key));
            localStorage.setItem('companyNameL', CryptoJS.AES.encrypt(data.companyName,key));
            localStorage.setItem('addressL', CryptoJS.AES.encrypt(data.address,key));
            localStorage.setItem('gstPercentageL', CryptoJS.AES.encrypt(data.gst.toString(),key));
            localStorage.setItem('mobileNoL',CryptoJS.AES.encrypt(data.mobileNo.toString(),key));
            localStorage.setItem('receiptNoL',CryptoJS.AES.encrypt(data.receiptNo.toString(),key));
            localStorage.setItem('availableInventoryL', CryptoJS.AES.encrypt(data.availableInventory.toString(),key));
            localStorage.setItem('amountCollectedL', CryptoJS.AES.encrypt(data.totalAmount.toString(),key));
            localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(),key));
            localStorage.setItem('PasswordL', CryptoJS.AES.encrypt(self.state.password.toString(),key));

           
              
            }
          },


        });
    }

  /*  document.getElementById("openmain").style.marginLeft = "50px";
	    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";} */
   	/* document.getElementById("openmain").style.marginLeft= "0";
	document.body.style.backgroundColor = "white"; */

	render(){
	
	return(
		
		<div className=""  id="mainpagebody" style={{marginBottom:"5%"}}>
	
				<div className="mainpage-container">
				
					<div className="header">
					
						
					<NavLink to="/" onClick={()=>this.MainPageFunc()}>
						<div className="navbar-brand" id="neertitle"href="#">
							
								</div>
									</NavLink>
					  
					  <div  className="collapse navbar-collapse" id= "usernameid">
								<ul className="nav navbar-nav navbar-right" id="usernameidright">
									<button onClick={()=>this.openNav()} className="navbar-toggle"   data-toggle="collapse" data-target=".sideNav"  type="button" >
										<span style={{}}>
										<span className="glyphicon glyphicon-user"></span>
										{CryptoJS.AES.decrypt(localStorage.getItem('UserNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)}
											<span className="caret">
												</span>
													</span></button>	
										
							<div className="sidenav" id="mySidenav">
											<li><a to="/"  className="closebtn" onClick={()=>this.closeNav()}>&times;</a></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.LogoutPage()}>Logout</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.Config()}>Configuration</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.vendorRegistrationFunc()}>Vendor Registration</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.AboutusFunc()} >Aboutus</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.printerSettingsFunc()}>Printer Settings</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.TermsAndConfig()}>Terms & Conditions</NavLink></li>
											<li><NavLink to="/" id="sidemenu" onClick={()=>this.Help()}>Help</NavLink></li>
	</div> 

	 
											
{ /* 	<button type="button" id="collbtn" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					 <span class="icon-bar"></span>
					 <span class="icon-bar"></span>

                </button>
                
                <a class="navbar-brand" href="#">Project name</a>

            
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>
						<a href="#">Link</a>
                    </li>
                    <li class="dropdown this-works"> 
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Works <b class="caret"></b>
						</a>	</li>

                        <div class="dropdown-menu dropdown-form">
                            <form class="form-inline" role="form">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search" id="InputSearch" class="form-control" /> <span class="input-group-btn">
                                  <button class="btn btn-default" type="button">GO</button>
                              </span>

                                </div>
                                
                            </form>
                        </div>
                    
                   
                </ul>
            </div>*/}

        
											 
										
											</ul>
								</div>
						</div>
						
				<div>
				<h2 style={{textAlign:"center"}}>{CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)}</h2>
		</div>		
			 		
					</div>


				</div>	
			);
	}
}

export default MainPageHeader;
