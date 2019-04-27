import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import registerServiceWorker from './registerServiceWorker';



class App extends Component {
constructor() {
        super();
        this.state = {
            emailId: ''
        };
    }

    send() {

        this.setState({
            emailId: this.state.emailId,
        })
       /*  alert(this.state.emailId);
	alert(JSON.stringify(this.state)); */
	$.ajax({
      type: 'POST',
	   data: JSON.stringify(this.state),
      url:"http://localhost:8080/RestAPI/report/unsubscribe",
      contentType: "application/json",
          dataType: 'json',
       success: function(data){
                 /*   alert("success" +data); */
         console.log(data);
 							      },
            error: function(data) {
            console.log('#####################error:################################'+data);
      /*       alert('addUser error'); */
          console.log(data);
            }
     });

    }

    handleChange(value) {
        this.setState({
            emailId: value
        });
    }

    render() {
        return (
            <div>
               <p>Enter Your mail id </p>
                <input type="text" placeholder="Yourmailid@xxx.com" value={this.state.emailId} onChange={(e) =>this.handleChange(e.target.value)} />

                <input type="submit" value="Submit" onClick={()=>this.send()} />

            </div>
        );
    }
}

export default App;
