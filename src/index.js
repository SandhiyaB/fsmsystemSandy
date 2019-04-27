import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import Aboutus from './Aboutus';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import PeriodReportDisplay from './PeriodReportDisplay';
import Billing from './Billing';
import Report from './Report';
import ReprintVoid from './ReprintVoid';
import ReprintPage from './ReprintPage';
import VoidPage from './VoidPage';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';
import Inventory from './Inventory';
import MainPageHeader from './MainPageHeader';
import Configuration from './Configuration';

import Charts from './Charts';

import VendorRegistration from './VendorRegistration';
import CryptoJS from 'crypto-js' ;
import ReprintResult from './ReprintResult' ;
import {  browserHistory,IndexRoute } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';




if(localStorage.getItem('isLoggedIn')){
var login=CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
if(login=="true")
{
	ReactDOM.render( <Router >
              <div >
              <Route path="/" component={MainPageHeader}/>
              <Route path = "/" component = { MainPage }/>
              
             </div>
               </Router>, document.getElementById('root'));

}

else{
ReactDOM.render(<LoginPage / > , document.getElementById("root"));
registerServiceWorker();
}

}
else{
ReactDOM.render(<LoginPage / > , document.getElementById("root"));
registerServiceWorker();
}