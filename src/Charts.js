
import $ from 'jquery';
import React, {
  Component
} from 'react';
import {Pie,Bar,Doughnut,HorizontalBar} from 'react-chartjs-2';
import CryptoJS from 'crypto-js' ;
import Inventory from './Inventory';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import MainPageHeader from './MainPageHeader';
import MainPage from './MainPage';
import registerServiceWorker from './registerServiceWorker';
class Charts extends Component{

constructor(props){
  var today = new Date();
  var date = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
     
   super(props);
   this.state={
    fillingStationId:'',
    date:date,
    chartData:{
      labels :[ '#Bubble Tops','Net Amt','Gross Amt','Void Total'] ,
      datasets:[
      {
        label:'Daily graph',
        
        data:[
        50,
        3000,
        5000
        ],
        backgroundColor:[
          'rgba(255,10,50,0.6)',
           'rgba(255,162,235,0.6)',
           'rgba(255,206,86,0.6)',
           'rgba(255,102,225,0.6)',
           'rgba(255,12,25,0.3)',
         ]
      }
    ]
    },
    newChart:{
      labels :[ 'Available Inventory'] ,
      datasets:[
      {
        label:'Daily graph',
        
        data:[
        1,
        1
        ],
        backgroundColor:[
          'rgba(255,10,50,0.6)',
           
           'rgba(255,205,86,0.6)',
           'rgba(255,90,255,0.6)',

         ]
      }
    ]
    },

   }

}
	
  componentDidMount() {


      this.state.fillingStationId=CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
      this.state.emailId=CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
      this.state.companyName=CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
                         this.setState({
                                     fillingStationId:CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
                                     emailId:CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8),
                                     companyName:CryptoJS.AES.decrypt(localStorage.getItem('companyNameL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)
 
                          });
      var self=this;/* 
                          alert(JSON.stringify({
                            fillingStationId:this.state.fillingStationId,
                           date:this.state.date,
                           }));
                           */$.ajax({
                                         type: 'POST',
                                         data:JSON.stringify(
                                           {
                                            fillingStationId:this.state.fillingStationId,
                                           date:this.state.date,
                                           emailId:this.state.emailId,
                                           companyName:this.state.companyName,
                                           }
                                         ),
                                         url: "http://localhost:8080/RestAPI/report/chartSummary",
                                         contentType: "application/json",
                                         dataType: 'json',
                                         async:false,
                                         success: function(data,textStatus,jqXHR)
                                 {
                                              console.log(data);

                                    self.state.chartData.datasets[0].label="Summary";
                                    self.state.chartData.datasets[0].data[0]= Number(data[0].noOfBubbleTopsFilled);
                                    self.state.chartData.datasets[0].data[1]=  Number(data[0].netAmount); 
                                    self.state.chartData.datasets[0].data[2]=  Number(data[0].grossTotal); 
                                    self.state.chartData.datasets[0].data[3]=  Number(data[0].voidTotal); 
                                    
                                    self.setState(
                                      {
                                        newChart:self.state.newChart,
                                      })
                                      var tab;
                                      tab+='<thead><tr class="headcolor"style={{margin:"auto"}}/><th style={{textAlign:"center"}}>Chart Info</th></thead>';
                                            
                                      tab +='<tr class="success" ><td> #BubbleTops</td><td>' + data[0].noOfBubbleTopsFilled+ '</td></tr>';
                                       tab +='<tr class="success" ><td> Net Amount</td><td>' + data[0].netAmount+ '</td></tr>';
                                      tab +='<tr class="success" ><td> Gross Total</td><td>' + data[0].grossTotal+ '</td></tr>';
                                      tab +='<tr class="success" ><td> Void Total</td><td>' + data[0].voidTotal+ '</td></tr>';
                                      $("#summary").append(tab);
                                
                                         },
                                       error:function(data) {
                                      console.log('#####################error:################################'+data);
                                      alert('Server Error'+ data);
 
                                   },
                                         });
     
 
    console.log("chart vlue",this.state.newChart);

    this.state.newChart.datasets[0].label="Inventory";
    this.state.newChart.datasets[0].data[0]= Number(CryptoJS.AES.decrypt(localStorage.getItem('availableInventoryL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8));
   // this.state.newChart.datasets[0].data[1]= Number(CryptoJS.AES.decrypt(localStorage.getItem('amountCollectedL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8)); 
     console.log("chart vlue", this.state.newChart.datasets[0].data);
      console.log("chart vlue", this.state.newChart);
      this.setState(
      {
        newChart:this.state.newChart,
        chartData:this.state.chartData
      })
      var tab;
      tab+='<thead><tr class="headcolor"style={{margin:"auto"}}/><th style={{textAlign:"center"}}>Chart Info</th></thead>';
            
      tab +='<tr class="success" ><td>  Available Inventory</td><td>' + this.state.newChart.datasets[0].data[0]+ '</td></tr>';
       
      $("#inventory").append(tab);



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

  render() {
    return (
      <div style={{marginBottom:"10%"}}>
      	<ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    borderRadius: "5px",
    marginTop:"50px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>

        <h2>Chart</h2>
        <div className="chart"> 
        <HorizontalBar data={this.state.chartData} width={200} height={50}/>
       
        <div id="tableOverflow" style={{
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "5%",
    }}>
        
        <table className="table" id="summary">
        
      
         </table>
        
        </div>
       
        
         <HorizontalBar data={this.state.newChart} width={200} height={50}/>
         <div id="tableOverflow" style={{
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "25%",
    }}>
        
        <table className="table" id="inventory">
        
      
         </table>
         </div>
        </div>
      </div>
    );
  }
}
export default Charts;