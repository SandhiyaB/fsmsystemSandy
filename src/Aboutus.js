
import React,{Component} from 'react';
import $ from 'jquery';
import './Aboutus.css';
import CryptoJS from 'crypto-js' ;
class Aboutus extends Component{

	constructor() {
    super()
    this.state = {
      emailId:'',
      feedBack:'',
		}
	}
	handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value
      },
    );
  }

	feedBackFunc() {
		this.setState({
			feedBack: this.state.feedBack,
			
			//emailId:CryptoJS.AES.decrypt(localStorage.getItem('emailL'),"shinchanbaby"),

		});
       

		
	   this.state.emailId = CryptoJS.AES.decrypt(localStorage.getItem('emailL').toString(),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	/* 		
	   alert(this.state.emailId);
       alert(this.state.feedBack);
       alert(JSON.stringify(this.state));
	    */
	   var self = this;
			
		$.ajax({

			
			
				type: 'POST',
				data: JSON.stringify(this.state),
				url: "http://localhost:8080/RestAPI/feedBackMail/sendFeedBack",
				contentType: "application/json",
				dataType: 'json',
				async: false,

				success: function(data, textStatus, jqXHR)

				{
					console.log(data);
          alert("feed back sent successfully");
					
					},


					error: function(data) {
						console.log('#####################error:################################' + data);
						alert('Server Error' + data);

					},
				});
		}


	render(){
		return(

	<div className="container">
			<h2>Neer</h2>
		<div className="jumbotron" >
			<p>
			“
			Water is the most critical resource issue of our lifetime and our childrens lifetime. The health of our waters is the principal measure of how we live on the land.
Luna Leopold

“	</p>
		</div>

	{ /* <form>
<div id="messagebox" className="form-group">

	<h5>Message:</h5>
	<label htmlFor="message" className="col-sm-1 control-label"></label>
		<div className="col-sm-12">
			<textarea className="form-control" rows="3" id="message" name="message"></textarea>
		</div>
		<button type="button" id="sendmessage" className="btn btn-primary">Send</button>

		{/* <div id="feedback-tab"></div>

	</div>
</form>	 */}

	<div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label htmlFor="form_message">FeedBack *</label>
                    <textarea id="form_message" name="feedBack" value = {this.state.feedBack}
						        onChange = {this.handleUserInput}
										class="form-control" placeholder="feeback *" rows="4" required="required" data-error="Please,leave us a message."></textarea>
                    <div class="help-block with-errors"></div>
                </div>
            </div>
            <div class="col-md-12">
                <input type="submit" onClick = {() => this.feedBackFunc()} class="btn btn-success btn-send" value="Send" />
            </div>
        </div>
		<hr/>
	<div class="row">
		<div class="border col-sm-6">
			<div className="jumbotron">

			<div className="text-center header">Our Office</div>
                    <div className="panel-body text-center">
                        <h4>Address</h4>
                        <div>
                        Line 1<br />
                        Line 1<br />
                        Phone no<br />
                        eMail@company.com<br />
                        </div>

					</div>
				</div>
			</div>

  <div class="border col-sm-6">
  <div className="jumbotron">
		<div className="text-center header">Our Office</div>
                <div className="panel-body text-center">
                        <h4>office Timing</h4>
                      <div>
                        Line 1<br />
                        Line 1<br />
                        Phone no<br />
                        eMail@company.com<br />
                        </div>
				</div>
			</div>
		</div>
		</div>

		<div class="row">
		<div class="border col-sm-10">
		<div className="jumbotron">
		<div> location</div>
	</div>
	</div>
</div>

			{/* <table className="table table-equal">
			<tfoot>
				<tr>
				<th>
				<div className="jumbotron">
				<div className="panel-footer">
			<div className="text-center header">Our Office</div>
                    <div className="panel-body text-center">
                        <h4>Address</h4>
                        <div>
                        Line 1<br />
                        Line 1<br />
                        Phone no<br />
                        eMail@company.com<br />
                        </div>
			</div>
			</div>
			</div>
			</th>

			<th>
				<div className="jumbotron">
			<p>
			office Timing
			</p>
			</div></th>


			<th>
			<div className="jumbotron">
			<p>
			Location
			</p>
			<div id="map1" className="map">
            </div>
			</div></th>
				</tr>
			</tfoot>
	</table> */}
			
		</div>




		);
	}

}
export default Aboutus;
