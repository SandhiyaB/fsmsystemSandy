import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


import MainPageHeader from './MainPageHeader';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import MainPage from './MainPage';
import FSReportMenuPage from './FSReportMenuPage';



class NoTransaction extends Component{
    BackbtnFunc(){
        ReactDOM.render(
                <Router>
                  <div>           
                         <Route path="/" component={MainPageHeader}/>
                         <Route path="/" component={FSReportMenuPage}/>
                         
                                 </div>
                                      </Router>,
                                                document.getElementById('root'));
                                                registerServiceWorker();
                                            }   
    
render(){
        return(
            

            
    <div class="container" >
   <ul class="previous disabled" 
           id="backbtn">
                <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
     <h3 className="centerAlign" style={{textAlign:"center",marginBottom:"20%"}}> No Transaction</h3>
   
          
       
        
 </div>

    
                
            
        );
    }

}


export default NoTransaction;