import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { API } from '../config'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService} from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;
 
@Component({
  selector: 'app-varifyaccount',
  templateUrl: './varifyaccount.component.html',
  styleUrls: ['./varifyaccount.component.css']
})
export class VarifyaccountComponent implements OnInit {
	idtypedata:any;
	bankdetails:any;
MobileNumber:any;
email:any;
emailotp:any;
	url:any;
	userdetails:any;
	loginid:any;
	public otp:any;
	public type:any;
	public YearOfBirth:any;
	public MonthOfBirth:any;
	public DayOfBirth:any;
public otprequired:boolean;
	panname:any;
	pannumber:any;
	public validpanname:boolean;
	public validpannumber:boolean;
	public validaccno:boolean;
	public validecnaccno:boolean;
	public validbankname:boolean;
	public validbankbranch:boolean;
	public validifsccode:boolean;
	public validmobilenumber:boolean;
	accno:any;
	caccno:any;
	ifsc:any;
	bankname:any;
	bankbranch:any;
	state:any;
	public panimagege:any;
	public bankimageget:any;
	public pancarddetails:any;
	public checkdata:any;
	token: string;

  constructor(private authttp: HttpIntercepter,private authSer:AuthService,private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2,private notification:NotificationService) {
       this.notification.getHeaderText('Account Verification'); 
		this.loginid="";
		this.userdetails=[];
		this.validpanname=true;
		this.validpannumber=true;
		this.validaccno=true;
		this.validecnaccno=true;
		this.otprequired = false;
		this.validbankname=true;
		this.validbankbranch=true;
	this.otp="";
	this.type="";
	this.MobileNumber="";
	this.email="";
	this.emailotp="";
		this.validifsccode=true;
		this.validmobilenumber=true;
		this.DayOfBirth="";
		this.MonthOfBirth="";
		this.YearOfBirth="";
		this.panname="";
		this.panname="";
		this.pannumber="";
		this.accno="";
		this.caccno="";
		this.ifsc="";
		this.bankname="";
		this.bankbranch="";
		this.state="";
		this.idtypedata = {"panname": "","panno": "","dob": "","panfile": ""};
		this.bankdetails = {"accname": "","accno": "","bankname": "","ifsccode": "","bankfile": ""};
		if(!(localStorage.getItem('token'))){
	      this.router.navigate(['']);
	    }
	    else{
		  this.loginid = localStorage.getItem('token');
		  this.token = localStorage.getItem('gettoken');
	    } 
		this.userfulldata(); 
		this.checkverify();
		this.panimagege=[]; 
		this.bankimageget = [];
        this.pancarddetails=[];
        this.bankdetails=[];
        this.checkdata=[];
      this.notification.getFirstMenu('profile'); 
	}

  ngOnInit() {
  }
	userfulldata(){
		return this.http.get('api/userfulldetails?token='+this.token)
	        .subscribe(
            res => { 
            	this.userdetails = res[0];
            },
            err => { if(err.status===400){
					this.authSer.logout();
				}
            }); 
	}
	idtype(){
		var datacardtype = this.idtypedata.idtype;

	}
   PreviewImagepan(event:any) {			
		$("#uploadPreviewpan").removeClass("hidden");
		$("#uploadPreviewaadhar").addClass("hidden");
		$("#uploadPreviewbank").addClass("hidden");
	    if (event.target.files && event.target.files[0]) {
	    	this.panimagege = event.target.files[0];
			var reader = new FileReader();
			reader.onload = (event:any) => {
			this.url = event.target.result; 
		}
		reader.readAsDataURL(event.target.files[0]);
	  }
	}
	
	PreviewImagebank(event:any) {			
		$("#uploadPreviewpan").addClass("hidden");
		$("#uploadPreviewaadhar").addClass("hidden");
		$("#uploadPreviewbank").removeClass("hidden");
	  if (event.target.files && event.target.files[0]) {
	  	    this.bankimageget = event.target.files[0];
			var reader = new FileReader();
			reader.onload = (event:any) => {
			this.url = event.target.result; 
		}
		reader.readAsDataURL(event.target.files[0]);
	  }
	}
	checkAlphaOnly(value){
    var pannamepattern = /^[A-Za-z ]*$/;
	if(pannamepattern.test(value) == false)
		{
			this.validpanname=false;
			this.panname = value.substr(0, value.length - 1);

		}else{
			this.validpanname=true;
		}
   }
   checkNoSpecial(value){
   	    var pannumberpattern = /^[A-Za-z0-9]*$/;
	    if(pannumberpattern.test(value) == false)
		{
			this.validpannumber=false;
			this.pannumber = value.substr(0, value.length - 1);
		 
		}else{
			this.validpannumber=true;
		}
   		
   }
   checkForNumbers(value){
   	 var bankaccpattern = /^[0-9]*$/;
	    if(bankaccpattern.test(value) == false)
		{
			this.validaccno=false;
			this.accno = value.substr(0, value.length - 1);


		}else{
			this.validaccno=true;
		}
   		
   }
   checkForIfscCode(value){
   	 var ifscpattern = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
	    if(ifscpattern.test(value) == false)
		{
			this.validifsccode=false;
			this.ifsc = value.substr(0, value.length - 1);

		}else{
			this.validifsccode=true;
		}
   	
   }
   checkForBankName(value){
   		var banknamepattern = /^[A-Za-z& ]*$/;
		if(banknamepattern.test(value) == false)
		{
			this.validbankname=false;
			this.bankname = value.substr(0, value.length - 1);
		
		}else{
			this.validbankname=true;
		}
   }
   checkForBankBranch(value){
   		var bankbranchpattern = /^[A-Za-z ]*$/;
		if(bankbranchpattern.test(value) == false)
		{
			this.validbankbranch=false;
			this.bankbranch = value.substr(0, value.length - 1);
			

		}
		else{
			this.validbankbranch=true;
		}
   }
   checkForNumbers1(value){
   	 var bankaccpattern = /^[0-9]*$/;
	    if(bankaccpattern.test(value) == false)
		{
			this.validecnaccno=false;
			this.caccno = value.substr(0, value.length - 1);
		

		}else{
			this.validecnaccno=true;
		}
   		
   }
	
	submit_pan_details(){   
		var panpattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
		var pannamepattern = /^[A-Za-z ]*$/;
		if(this.panname=="" || this.pannumber=="" || this.YearOfBirth=="" || this.MonthOfBirth=="" || this.DayOfBirth==""){
			this.toastr.error('Please Enter all the fields to verify your pan card.');
			return false;
		}
		else if(this.panimagege.length==0){
			this.toastr.error('Please Enter all the fields to verify your pan card.');
			return false;
		}
		if(panpattern.test(this.pannumber) == false)
			{
			 this.validpannumber=false;
			}else{ 
				this.validpannumber=true;
			}
			if(this.validpannumber==false || this.validpanname==false){
			}
			else {
				var getDayOfBirth= this.YearOfBirth+"-"+this.MonthOfBirth+"-"+this.DayOfBirth;
				this.loader.start();
				let formData = new FormData();
				formData.append('panname', this.panname); 
				formData.append('id', this.loginid); 
				formData.append('dob', getDayOfBirth); 
				formData.append('pannumber', this.pannumber); 
				formData.append('file', this.panimagege); 
				return this.authttp.post('api/panrequest'+'?token='+this.token,formData)
					.subscribe(
					res => {
						this.loader.stop();
						if(res[0].status==1){
							this.toastr.success(res[0].msg);
							this.checkverify();				
							this.panname="";
							this.pannumber="";
						}
						if(res[0].status==0)
						{ 
							this.toastr.error('This PAN card number is already exist. You cannot not use this pan card number again.');
							
						}
						if(res[0].status==2)
						{ 
							this.toastr.error('PAN card image is too big. Unable to upload.');
							
						}
						if(res[0].status==3)
						{ 
							this.toastr.error('Invalid PAN card image.');
							
						}
					},
					err => {
						this.toastr.error('Something went wrong. Please try again.');
						this.loader.stop();
					});
			}
		
	}
	checkverify(){
	    this.loginid = localStorage.getItem('token');
  		return this.http.get('api/allverify?id='+this.loginid+'&token='+this.token)
        .subscribe(
            res => {
				// console.log(res[0]);
				this.checkdata = res[0];
				if(this.checkdata.pan_verify!=-1){
					return this.http.get('api/seepandetails?id='+this.loginid+'&token='+this.token).subscribe(respan => {
					this.pancarddetails = respan[0];
						if(this.checkdata.bank_verify!=-1){
						// alert('hi');
							return this.http.get('api/seebankdetails?id='+this.loginid+'&token='+this.token)
							.subscribe(resbank => {
								this.bankdetails = resbank[0];
								// console.log(this.bankdetails);
								
							},
							err => {

							});
						}
				 },
				err => { });
				}
					
					localStorage.setItem('checkdata', this.checkdata);
	            },
	            err => { });
  }
	
	
  emailvarifys()
  {			
  			
  			if(this.email==""){
  				 this.toastr.error('Please enter email address');
  			} 
			var emailpattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(emailpattern.test(this.email) == false)
			{
				document.getElementById("emailm").innerHTML = "Please Enter Valid email address."; 
				return false; 
			}else{
				document.getElementById("emailm").innerHTML = "";
			}
			this.loader.start();
			return this.http.get('api/verifyEmail?email='+this.email+'&userid='+this.loginid+'&token='+this.token) 
            .subscribe(
            res => {
            	this.loader.stop();
            	    if(res[0].msg=="This email address is already exist."){
            	    	 this.email="";
            	    	 this.toastr.error(res[0].msg);
            			 return false;
            	    }
            		else if(res[0].msg=="Verify Mobile First"){
            			 this.toastr.error('You need to verify your mobile number first.');
            			 return false;
            		}
					else if(res[0].otp !="0")
					{
						document.getElementById('emailvarify').style.display="none";
						document.getElementById('emailotpvarify').style.display="block";
						this.otprequired = true;
						this.toastr.success('We have sent you an OTP on your email address. Please use that OTP to verify your email.');
					 
					}
					else if(res[0].msg=="Otp is Not matched"){
						this.otprequired = false;
						this.toastr.error('Invalid OTP');
					}
					else if(res[0].msg =="Email-id Verified successfully" )
					{
						document.getElementById('emailotpvarify').style.display="none";
						this.checkverify();	
						this.otprequired = false;
						this.toastr.success(' Successfully verified your email address.');
					}
					else if(res[0].msg=="Invalid Email-id" )
					{
						this.toastr.success('Your Email Invalid, Please Try Again');

					}
            },
            err => {

                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            }); 
  }
	
	
	
	
	emailvarifysconfirm(){     
		this.loader.start();  
				let formData = new FormData();
				formData.append('email', this.email); 
				formData.append('code', this.emailotp); 
				formData.append('userid', this.loginid);  
				return this.authttp.post('api/verifyCode'+'?token='+this.token,formData)    
            .subscribe(
            res => {
              this.loader.stop(); 
			  if(res[0].status==0){
              	 this.toastr.error('Wrong OTP');
              	 return false;
              } 
              if(res[0].status==1){           
				 this.toastr.success('your email verify succussfull.'); 
				this.checkverify();
				this.userfulldata();	
				document.getElementById('emailotpvarify').style.display="none";
				document.getElementById('succssemailvarify').style.display="block";
              }              
            },
            err => {
                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            }); 
	} 
	
	
	
  mobilevarify()
  {			
  			
  			if(this.MobileNumber==""){
  				 this.toastr.error('Please enter mobile number');
  			} 
			var mobpattern = /^[7-9]{1}[0-9]{9}$/; 
			if(mobpattern.test(this.MobileNumber) == false)
			{
  				 this.toastr.error('Please enter valid mobile number');
				return true; 
			} 
			this.loader.start();
			return this.http.get('api/verifyMobileNumber?mobile='+this.MobileNumber+'&userid='+this.loginid+'&token='+this.token) 
            .subscribe(
            res => {
            	this.loader.stop(); 
				if(res[0].status==0){
				  this.toastr.error(res[0].msg);  
				}
				else if(res[0].status==1){					
					this.toastr.success('We have sent you an OTP on your mobile number. Please use that OTP to verify your mobile number.');
					document.getElementById('mobileenter').style.display="none";
					document.getElementById('otpenter').style.display="block";
				}
            },
            err => {

                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            }); 
  }
	mobilevarifysconfirm(){     
		this.loader.start();  
			let formData = new FormData();
			formData.append('number', this.MobileNumber); 
			formData.append('code', this.otp); 
			formData.append('userid', this.loginid);  
			return this.authttp.post('api/verifyCode'+'?token='+this.token,formData)    
            .subscribe( 
            res => {
              this.loader.stop(); 
			  if(res[0].status==0){
              	 this.toastr.error('Wrong OTP');
              	 return false;
              } 
              if(res[0].status==1){           
				 this.toastr.success('your mobile number verify  succussfull.'); 
				this.checkverify();
				this.userfulldata();				
				document.getElementById('otpenter').style.display="none";
				document.getElementById('succssmobilevarify').style.display="block";
              }              
            },
            err => {
                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            }); 
	} 



	submit_bank_details(){  
	  if(this.accno ==""|| this.caccno =="" || this.accno =="" || this.ifsc =="" || this.accno =="" || this.bankname =="" || this.bankbranch =="" || this.state =="") {
		   this.toastr.error("Please Enter All compulsory Fields"); 
		   return false;
      }
      if(this.bankimageget.length==0){
      	   this.toastr.error("Please Upload your Cheque/Statement"); 
		   return false;
      }
	  else 
	  {
	  	  if(this.caccno==this.accno) {
		  	var accntpattern = /^[0-9]+$/;
			if(!this.accno.match(accntpattern))  
			{
				 this.toastr.error("Please Enter Correct Account Number");
				 return false;
			}
			else {
			var ifscpattern = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
			if(ifscpattern.test(this.ifsc) == false)
			{
				 this.toastr.error("Please Enter Correct IFSC code"); 
				 return false;
			}
			if(this.validaccno==false || this.validecnaccno==false || this.validifsccode==false || this.validbankname==false || this.validbankbranch==false){

			}
			else {
			// console.log(this.bankimageget);
				     this.loader.start();
				     let formData = new FormData();
				     formData.append('accno', this.accno);
				     formData.append('id', this.loginid);
				     formData.append('ifsc', this.ifsc);
				     formData.append('bankname', this.bankname);
				     formData.append('bankbranch', this.bankbranch);
				     formData.append('state', this.state);
				     formData.append('file', this.bankimageget);
					 return this.authttp.post('api/bankrequest'+'?token='+this.token,formData)
					.subscribe(
					res => {
						this.loader.stop();
					    if(res[0].status =="1"){	
								this.toastr.success(res[0].msg);	
						  this.checkverify();					
					      this.accno="";this.caccno="";this.ifsc="";this.bankname="";this.bankbranch=""; 
					    }
						else if(res[0].status !="0")
							{ 
								this.toastr.error('Account no. did not match to confirm account no.');				}
							},
					err => {
						this.toastr.error('Something went wrong. Please try again.');
						this.loader.stop();
					});
				}
			}
		  }
		  else {
			  	this.toastr.error('Account no. & confirm account no. doesnot match. Please check again!');
				return true;
		  }
		}	}
  back_button(){ 
    window.history.back();
  }
}
