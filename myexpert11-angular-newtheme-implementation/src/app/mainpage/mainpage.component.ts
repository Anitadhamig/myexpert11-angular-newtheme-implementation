import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
import { Observable } from 'rxjs/Rx';
import { SocialUser } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { AuthService } from "angular4-social-login";
import {ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  public login_data:any;
  public register_data:any;
  loginid:any;       
  registerData:any;	
  emailAlert:string = 'Invalid email';
  passAlert:string = 'password is required';
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
  numberPattern  = /([0-9]{10})/; 
  rForm: FormGroup;
  verifyform: FormGroup;
  lForm: FormGroup;
  forgetform: FormGroup;
  entercodeform: FormGroup;
  resetform: FormGroup;
  verifynumberform: FormGroup;
  verifynumberotpform: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';	
  getdetailsfromlogin:any;
  public getcsrftoken:any;
  // registration fields//
  public getusername: string;
  public getemail:string;
  public getmobile:any;
  public otpsent:boolean;
  public getpassword:any;
  public mailsent:boolean;
  public getforgetemail:any;
  public getmainid:any;
  public otherotpsent:any;
  public testimonial:any;
  public getsocialmobile:any;
  public ourtopwinners:any;
	token: string;
  constructor(private router:Router,  private http: HttpClientService, private authttp: HttpIntercepter, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute, private commons:CommonService, private toastr: ToastrService, private fb: FormBuilder, private auth: ManualAuthService, public socialauthService: AuthService) {   
        this.getcsrftoken="";
		this.getusername="";
		this.otherotpsent="";
		this.testimonial="";
		this.getemail="";
		this.getmobile="";
		this.otpsent=false;
		this.mailsent=false;
		this.getpassword="";
		this.getforgetemail="";
		this.getmainid="";
		this.getsocialmobile="";
		this.login_data = {"email": "","password": ""};
		this.ourtopwinners=[];
		 this.lForm = fb.group({
         'email' : ["", [Validators.required,Validators.pattern(this.emailPattern)]],
         'password' : ["", [Validators.required]],
         'validate' : ""
         });
        this.forgetform = fb.group({
         'email' : ["", [Validators.required,Validators.pattern(this.emailPattern)]],
         'validate' : ""
         });
         this.entercodeform = fb.group({
         'code' : ["", [Validators.required]],
         'validate' : ""
         });
         this.verifynumberotpform = fb.group({
         	'otp' : ["", [Validators.required]],
         	'refercode' : [""],
         	'validate' : ""
         });
         this.verifynumberform = fb.group({
         'mobilenumber' : ["", [Validators.required]],
         'validate' : ""
         });
         this.resetform = fb.group({
         'repassword' : ["", [Validators.required]],
         'reconfirmpassword' : ["", [Validators.required]],
         'validate' : ""
         });
		 this.verifyform = fb.group({
         'otp' : ["", [Validators.required]],
         'refercode' : [""],
         'validate' : ""
         });
         this.rForm = fb.group({
		     'email' : ["", [Validators.required,Validators.pattern(this.emailPattern)]],
		      'password' : ["", [Validators.required]],
		      'name' : ["", [Validators.required]],
		      'number' : ["", [Validators.required,Validators.pattern(this.numberPattern)]],
		    }, 
		);
         this.testimonials();
         this.getourtopwinners();
		
		}

  ngOnInit() { 
   
	  if(!(localStorage.getItem('token'))){
		  this.router.navigate(['/login']);
		}
		else{
		  this.loginid = localStorage.getItem('token');
		  this.token = localStorage.getItem('gettoken');
		} 
		
	  if (this.auth.isLoggedIn()) {
           this.router.navigate(['home']);
        }
	   this.loginWindow();
	   this.getcsrftoken = localStorage.getItem('csrftoken');
	
  }
     loginWindow(){
        const signupButton = document.getElementById("signup-button"),
          loginButton = document.getElementById("login-button"),
          userForms = document.getElementById("user_options-forms"); 
        signupButton.addEventListener(
          "click",
          () => {
            userForms.classList.remove("bounceRight");
            userForms.classList.add("bounceLeft");
          },
          false
        );

        loginButton.addEventListener(
          "click",
          () => {
            userForms.classList.remove("bounceLeft");
            userForms.classList.add("bounceRight");
          },
          false
        );
    
        $("#register_btn").click(function(){
       		$("#user_options-forms").removeClass("bounceRight");
       		$("#user_options-forms").addClass("bounceLeft");
	 		$(".user_forms-signup").removeClass("display_none");
	  		$(".user_forms-login").addClass("display_none"); 
	       $(".user_forms-signup").addClass("display_block"); 
        });

        $("#login_btn").click(function(){
           $("#user_options-forms").removeClass("bounceLeft");
       		$("#user_options-forms").addClass("bounceRight");
	 	   $(".user_forms-signup").addClass("display_none");
	 		$(".user_forms-login").removeClass("display_none");
	       $(".user_forms-login").addClass("display_block"); 
        });

 
         $('a.howtoplay[href^="#"]').on('click', function(event) {
               var target = $(this.getAttribute('href'));
               if( target.length ) {
                   event.preventDefault();
                   $('html, body').stop().animate({
                       scrollTop: target.offset().top
                   }, 1000);
               }
           });

	}
	login(values){    		 
		this.loader.start();
		let formData = new FormData();
		formData.append('password', values.password);
		formData.append('email', values.email);
		this.authttp.post('api/loginuser',formData)
            .subscribe(
            res => {
              this.loader.stop();
              if(res[0].status==0){
              	 this.toastr.error('Invalid Username or password.');
              	 return false;
              }
			  if(res[0].status==2){
              	 this.toastr.error('You have not verified your email yet. Please verify your email first before login into your account.');
              	 return false;
              }
              if(res[0].status==3){
              	 this.getmainid = res[0].userid;
              	 $("#firstverifymobile").modal('show');
              }
              if(res[0].status==1){
              	 localStorage.setItem('gettoken', res[0].token);
              	 localStorage.setItem('token', res[0].userid);
              	 this.headerService.updateHeader('login');
              	 this.lForm.reset();
                 this.router.navigate(['/home']);
              }
              this.closeBtn.nativeElement.click();
             
            },
            err => {
                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            });
	}
	verifynumber(values){
		this.loader.start();
		let formData = new FormData();
		formData.append('mobile', values.mobilenumber);

		this.authttp.post('api/sendotptonumber',formData)
            .subscribe( 
            res => {
            	if(res[0].message=='OTP sent'){
					this.otherotpsent = true;
					this.getsocialmobile = values.mobilenumber;
					this.toastr.success('OTP sent. Please verify your mobile number.');
				}
				else{
					this.toastr.error(res[0].message);
				}
				this.loader.stop();
            },
            err => {
				this.loader.stop();
                this.toastr.error('Something went wrong. Please try again.');
                
            }); 
	}
	register(values){    
		this.loader.start();
		let formData = new FormData();
		formData.append('mobile', values.number);
		formData.append('email', values.email);
		this.authttp.post('api/sendotptonumber',formData)
            .subscribe( 
            res => {
            	if(res[0].message=='OTP sent'){
					this.otpsent = true;
					this.mailsent = false;
					this.getusername = values.name;
					this.getemail = values.email;
					this.getmobile = values.number;
					this.getpassword = values.password;
					this.toastr.success('OTP sent. Please verify your mobile number.');
				}else{
					this.toastr.error(res[0].message);
				}
				this.loader.stop();
            },
            err => {
				this.loader.stop();
                this.toastr.error('Something went wrong. Please try again.');
                
            });  
			
	} 
	verifymobile(values){
		this.loader.start();
		let formData = new FormData();
		formData.append('otp', values.otp);
		formData.append('name', this.getusername);
		formData.append('email', this.getemail);
		formData.append('mobile', this.getmobile);
		formData.append('password', this.getpassword);
		if($('#filled-in-box').is(":checked")){
			if(values.refercode!=""){
				formData.append('code', values.refercode);
			}else{
				this.toastr.error('Please enter your refer code.');
				return false;
			}
		}
		formData.append('password', this.getpassword);
		this.authttp.post('api/registeruser',formData)
            .subscribe( 
            res => {

			if(res[0].message=='email sent'){
				this.otpsent = false;
				this.mailsent = true; 
				this.rForm.reset();
				var emailtimer = Observable.timer(10000); // Call after 10 second.. Please set your time
				emailtimer.subscribe(x =>{
				  this.mailsent = false;
				});
				
				
			}else{
				this.toastr.error(res[0].message);
			}
			this.loader.stop();
		},
		err => {
			this.loader.stop();
			this.toastr.error('Something went wrong. Please try again.');
			
		});
	}
	verifynumberbyotp(values){

		this.loader.start();
		let formData = new FormData();
		formData.append('otp', values.otp);
		formData.append('id', this.getmainid);
		formData.append('mobile', this.getsocialmobile);
		if($('#filled-in-box').is(":checked")){
			if(values.refercode!=""){
				formData.append('code', values.refercode);
			}else{
				this.toastr.error('Please enter your refer code.');
				return false;
			}
		}
		this.authttp.post('api/registeruser',formData)
            .subscribe( 
            res => {
            	if(res[0].message=='success'){
            		localStorage.setItem('gettoken', res[0].token);
	              	 localStorage.setItem('token', res[0].userid);
	              	 $("#firstverifymobile").modal('hide');
	              	 this.headerService.updateHeader('login');
	              	 this.verifynumberotpform.reset();
	                 this.router.navigate(['/home']);
            	}
			this.loader.stop();
		},
		err => {
			this.loader.stop();
			this.toastr.error('Something went wrong. Please try again.');
			
		});
	}
	forgotpassword(values){	
		this.loader.start();
		let formData = new FormData();
		formData.append('email', values.email);
		this.getforgetemail = values.email;
		this.authttp.post('api/forgetuser',formData)
				.subscribe(
				res => {
				  this.loader.stop();
				  if(res[0].status==1){
					 this.forgetform.reset();
					 this.toastr.success('We have sent you a OTP on registered email address to reset your password. Please check Your mail.');
					 $("#forgotPassword").modal('hide');
					 $("#login_modal").modal('hide');
					 $("#entercodemodal").modal('show');
					 this.forgetform.reset();
				  }
				  if(res[0].status==2){
					this.toastr.error('Sorry! you are not registered with us.');
				  }
				  if(res[0].status==0){
					this.toastr.error('Your account is not activated. you have to activate your account first.');
				  }
				},
				err => {
					this.toastr.error('Something went wrong. Please try again.');
					this.loader.stop();
		});
	  }
	  matchcode(values){
		this.loader.start();
		let formData = new FormData();
		formData.append('code', values.code);
		formData.append('email', this.getforgetemail);
		this.authttp.post('api/matchcodeforreset',formData).subscribe( res => {
			this.loader.stop();
			if(res[0].status==1){	
			   $("#entercodemodal").modal('hide');
			   $("#resetpasswordmodal").modal('show');
			}
			if(res[0].token==0){
			  this.toastr.error('Invalid Code.');
			}
		  },
		  err => {
			  this.toastr.error('Something went wrong. Please try again.');
			  this.loader.stop();
		});
	  }
	  resetpassword(values){
	   var pass=values.repassword;
		var repass=values.reconfirmpassword;
		if(pass!=repass){
		  this.toastr.error('Password does not match. Please check again');
		}
		else{
			this.loader.start();
			let formData = new FormData();
			formData.append('password', values.repassword);
			formData.append('email', this.getforgetemail);
			this.authttp.post('api/resetpassword',formData)
				.subscribe(
				res => {
				  this.loader.stop();
				  if(res[0].status==1){
					$("#resetpasswordmodal").modal('hide');
					 this.resetform.reset();
					 this.toastr.success('Your password has been successfully reset.');
				  }
				  if(res[0].status==0){
					this.toastr.error('Invalid action performs.');
				  }
				},
				err => {
					this.toastr.error('Something went wrong. Please try again.');
					this.loader.stop();
		});
		}
	  }
	  signInWithGoogle(){
		  this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => { 
		  this.socialauthService.authState.subscribe((getdetailsfromlogin) => {
		  this.authttp.get('api/sociallogin?email='+getdetailsfromlogin.email+'&name='+getdetailsfromlogin.name+'&image='+getdetailsfromlogin.photoUrl+'&provider=google')
		            .subscribe(
		            res => {
		            	this.closeBtn.nativeElement.click();
		                if(res[0].loginstatus==0) {
		              	  this.getmainid = res[0].userid;
		              	  $("#firstverifymobile").modal('show');
		                }
		                else if(res[0].loginstatus==1){

		                 localStorage.setItem('gettoken', res[0].token);
		              	 localStorage.setItem('token', res[0].userid);
		              	 this.headerService.updateHeader('login');
		                 this.router.navigate(['/home']);
		              }
		            },
		            err => {
		                this.toastr.error('Something went wrong. Please try again.');
		                this.loader.stop();
		            });
		    }); 
		    
		   });
	   }
 signInWithFB(){
	 this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => { 
		this.socialauthService.authState.subscribe((getdetailsfromlogin) => { 
		

			this.authttp.get('api/sociallogin?email='+getdetailsfromlogin.email+'&name='+getdetailsfromlogin.name+'&image='+getdetailsfromlogin.photoUrl+'&provider=facebook')
            .subscribe(
            res => {
            	this.closeBtn.nativeElement.click();
            	if(res[0].loginstatus==0) {
		              	  this.getmainid = res[0].userid;
		              	  $("#firstverifymobile").modal('show');
		                }
		                else if(res[0].loginstatus==1){

		                 localStorage.setItem('gettoken', res[0].token);
		              	 localStorage.setItem('token', res[0].userid);
		              	 this.headerService.updateHeader('login');
		                 this.router.navigate(['/home']);
		              }

            },
            err => {
                this.toastr.error('Something went wrong. Please try again.');
                this.loader.stop();
            });
		}); 
	 });
	
  }
	openregister(){  
	 	$(".user_forms-signup").removeClass("display_none");
	  	$(".user_forms-signup").addClass("display_block");  
	  	$(".user_forms-login").addClass("display_none");  
    }
	openlogin(){  
	 	$(".user_forms-login").removeClass("display_none");
	  	$(".user_forms-login").addClass("display_block");  
	  	$(".user_forms-signup").addClass("display_none"); 
    } 

    testimonials()  { 
    	 return this.http.get('api/testimonials')
    	.subscribe(
   		 res => {
     	 	this.testimonial = res;  
   		 },
    	err => { });
 	}
 	getourtopwinners(){
 		 return this.http.get('api/ourtopwinners')
    	.subscribe(
   		 res => {
     	 	this.ourtopwinners = res; 
     	 	// console.log(this.ourtopwinners);
   		 },
    	err => { });
 	}
}
