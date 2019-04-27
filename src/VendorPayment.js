import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';

import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import CryptoJS from 'crypto-js';

class VendorPayment extends Component {

    constructor() {
        super()
        var today = new Date();
        var date = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() + ' '+today.toLocaleTimeString();
     
        this.state = {
            vendorCode: '',
            amountPaid: '',
            date:date
        }

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }






    Pay() {

        var self = this;
       
        this.state.fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        alert(JSON.stringify(this.state));
        /*  alert(JSON.stringify(this.state)); */
        $.ajax({
            type: 'POST',
            data: JSON.stringify(this.state),
            url: "http://localhost:8080/RestAPI/bill/PayingDueAmount",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                /* 	 alert("receipt reprint"); */


            },
            error: function (data) {
                // Text button confirm



            },
        });
    }




    render() {
        return (



            <div class="container" style={{ marginBottom: "30%" }}>

                <label>Vendor code:</label>
                <input type="text"
                    onChange={this.handleUserInput}
                    id="vendorCode"
                    name="vendorCode"
                    placeholder="Your Code.."
                    required />
                <label>Amount Paid:</label>
                <input type="number"
                    onChange={this.handleUserInput}
                    id="amountPaid"
                    name="amountPaid"
                    placeholder="Your amount.."
                    required />

                <button type="button" onClick={() => this.Pay()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", }}>Pay</button>

            </div>







        );
    }

}


export default VendorPayment;