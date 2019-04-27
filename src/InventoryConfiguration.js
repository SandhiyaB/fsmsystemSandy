import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import MainPageHeader from './MainPageHeader';
import MainPage from './MainPage';


class InventoryConfiguration extends Component {

    constructor() {
        super()
        this.state = {

            fillingStationId: '',
            inventoryName: '',
            newInventoryName:'',
            oldInventoryName:''


        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }




    componentDidMount() {


        this.InventoryFunc();
        var self = this;
        $(document).ready(function () {
        alert("hi");
            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.UpdateSelect', function () {
                // get the current row
                var currentRow = $(this).closest("tr");
                

                var inventoryName = currentRow.find("td:eq(0)").text(); // get current row 1st TD value

                var fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


                self.state.fillingStationId = fillingStationId;

                self.setState({
                    fillingStationId: self.state.fillingStationId,
                    inventoryName: self.state.inventoryName,
                    oldInventoryName: inventoryName,
                    newInventoryName: inventoryName,
                })
               /*  confirmAlert({
                    title: 'Update',                        // Title dialog
                    message: 'Do you Want to Update the Inventory Name For ' + self.state.inventoryName + ' ? ',               // Message dialog
                    confirmLabel: 'Yes',                           // Text button confirm
                    cancelLabel: 'No',                             // Text button cancel
                    onConfirm: () => { self.UpdateConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel

                }) */


            });
        });


        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.DeleteSelect', function () {
                // get the current row
                var currentRow = $(this).closest("tr");

                self.state.inventoryName = currentRow.find("td:eq(0)").text(); // get current row 1st TD value

                var fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


                self.state.fillingStationId = fillingStationId;

                self.setState({
                    fillingStationId: self.state.fillingStationId,
                    inventoryName: self.state.inventoryName,
                })

                confirmAlert({
                    title: 'Delete',                        // Title dialog
                    message: 'Do  You Want to Delete the ' + self.state.inventoryName + ' Inventory ? ',               // Message dialog
                    confirmLabel: 'Delete',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.DeleteConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel

                })

            });
        });

    }







    InventoryFunc() {

        this.state.fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        this.setState({
            fillingStationId: this.state.fillingStationId,
        });

        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                fillingStationId: this.state.fillingStationId,
            }),
            url: "http://localhost:8080/RestAPI/configuration/InventoryList",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);

                if (data.inventoryList != null) {
                    var tab ;

                    $.each(data.inventoryList, function (i, item) {
                       /*  <tbody>
                        <tr>
                            <td>1</td>
                            <td>500ml bottle</td>
                            <td><button type="button" class="btn-xs btn-info" onClick={() => this.UpdateInventoryfunc()}>Update</button></td>
                            <td><button type="button" class="btn-xs btn-danger" onClick={() => this.DeleteInventoryfunc()}>Delete</button></td>

                        </tr>
                    </tbody> */

                        tab += ' <tbody><tr class="success" style={{fontSize: "19px"}}> <td>' + item + '</td> <td> <button data-toggle="modal" data-target="#myModal" type ="button" class=" UpdateSelect  btn-xs btn-info"> Update </button></td><td><button type ="button"class= " DeleteSelect   btn-xs btn-danger"> Delete</button></td></tr></tbody>';

                    });
                    $("#tableHeadings").append(tab);

                } else {

                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path="/" component={MainPageHeader} />
                                <Route path="/" component={MainPage} />

                                <Route path="/" component={InventoryConfiguration} />								 		 </div>
                        </Router>,

                        document.getElementById('root'));
                    registerServiceWorker();

                }

            }



        });
    }
     UpdateConfirm() {

        this.state.fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        this.setState({
            fillingStationId: this.state.fillingStationId,
        });

        var self = this;
        alert(JSON.stringify(this.state));

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                fillingStationId: this.state.fillingStationId,
                oldInventoryName: this.state.oldInventoryName,
                newInventoryName: this.state.newInventoryName,
            }),
            url: "http://localhost:8080/RestAPI/configuration/UpdateInventoryName",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);

                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Successfully Updated the Inventory Name',               // Message dialog
                    confirmLabel: 'Ok',

                });
            },


            error: function (data) {

                confirmAlert({
                    title: 'Server Error',                        // Title dialog
                    message: 'Server Error Try Again Later',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                });
            }

        });
    }



    DeleteConfirm() {

        this.state.fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        this.setState({
            fillingStationId: this.state.fillingStationId,
        });

        var self = this;
        alert(JSON.stringify(this.state));
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                fillingStationId: this.state.fillingStationId,
                inventoryName: this.state.inventoryName,
            }),
            url: "http://localhost:8080/RestAPI/configuration/DeleteInventory",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);

                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Successfully Deleted the Inventory ' + self.state.inventoryName,               // Message dialog
                    

                });

            }



        });
    }



    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={MainPageHeader} />
                    <Route path="/" component={MainPage} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }
    AddInventoryListfunc() {


        this.state.fillingStationId = CryptoJS.AES.decrypt(localStorage.getItem('fillingStationIdL').toString(), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        this.setState({
            fillingStationId: this.state.fillingStationId,

        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify(this.state),

            url: "http://localhost:8080/RestAPI/configuration/AddNewInventory",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                /*   alert("Period Report"); */

                if(data==0){
                    confirmAlert({
                        title: 'Already Exist',                        // Title dialog
                        message: 'Already Exist ' + self.state.inventoryName,               // Message dialog
                        confirmLabel: 'Ok',
    
                    });
                }

            },

        });

    }





    render() {
        return (


            <div className="container">

                <div className="panel panel-default" style={{ marginBottom: '10%' }}>
                    <div class="panel-heading"> Inventory</div>
                    <div class="panel-body">

                        <label htmlFor="inventoryName">Add Inventory List</label>

                        <input type="text"
                            value={this.state.inventoryName}
                            required
                            name="inventoryName"
                            onChange={this.handleUserInput}
                            className="form-control"
                            id="inventoryName"
                            placeholder="Enter " />
                    </div>
                    <button type="submit" style={{ marginBottom: '2%', marginTop: '0%', color: 'blac#f5f5f5k', backgroundColor: '#35c742' }} className="btn btn-default" onClick={() => this.AddInventoryListfunc()}>ADD</button>
                </div >


                <div class="table-responsive">
                    <table class="table" id="tableHeadings">
                        <thead style={{fontSize:"20px"}} >
                            <tr>
                              
                                <th>Name</th>
                                <th colspan="2" style={{textAlign:"centre"}} >Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                             
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Inventory Name</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label htmlFor="newInventoryNameid">Enter the Inventory Name</label>
                                    <input type="text"
                                        name="newInventoryName"
                                        value={this.state.newInventoryName}
                                        onChange={this.handleUserInput}
                                        class="form-control"
                                        id="newInventoryName" />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" ref="disablefunc" class="btn btn-default" onClick={() => this.UpdateConfirm()} data-dismiss="modal">pay</button>
                            </div>
                        </div>
                    </div>
                </div>



                <div style={{ paddingBottom: "10%" }}>



                </div>




            </div>
        );
    }
}

export default InventoryConfiguration;