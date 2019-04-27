
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js' ;
import MainPageHeader from './MainPageHeader';
import MainPage from './MainPage';
import Configuration from './Configuration';
import InventoryConfiguration from './InventoryConfiguration';
class ConfigurationMenuPage extends Component{

	constructor() {
        super()
        this.state = {

			    }
}
   	
   
										
	componentDidMount() {
      var self=this;
      self.GenralConfigurationFunc();
    }


    GenralConfigurationFunc(){

      

        ReactDOM.render(
          <Router>
            <div>
             <Route path="/" component={MainPageHeader}/>
             <Route path="/" component={ConfigurationMenuPage}/>
               <Route  path="/" component={Configuration}/>
                </div>
                      </Router>,
                          document.getElementById('root'));
                          registerServiceWorker();
                  
      
    }


    InventoryConfigurationFunc(){

      

        ReactDOM.render(
          <Router>
            <div>
             <Route path="/" component={MainPageHeader}/>
             <Route path="/" component={ConfigurationMenuPage}/>
             <Route  path="/" component={InventoryConfiguration}/>
                </div>
                      </Router>,
                          document.getElementById('root'));
                          registerServiceWorker();
                  
      
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
			


      <div className="container">
      <ul class="previous disabled" 
      style={{float:"none",
      display:"inline-block",
      marginLeft:"5px",
      borderRadius: "5px",
      padding: "3px 7px 3px 7px"
      }}>
          <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
  
    
<div className='horMenu'>
<ul class="nav nav-tabs  nav-justified ">
  <li><a className="active" onClick={()=>this.GenralConfigurationFunc()}><span class="glyphicon glyphicon-ok">Genral Configuration</span></a></li>
  <li><a onClick={()=>this.InventoryConfigurationFunc()}><span class="glyphicon glyphicon-time">Inventory Configuration</span></a></li>
 
  </ul>

</div>


 </div>

	
				
			
		);
	}

}


export default ConfigurationMenuPage;
