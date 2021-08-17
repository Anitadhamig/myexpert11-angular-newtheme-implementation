import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
// import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
import { Observable } from 'rxjs/Rx';
import { SocialUser } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { AuthService } from "angular4-social-login";
import {ViewChild, ElementRef} from '@angular/core';
import { UserData } from '../shared.objects';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
  public fcode:any;
  public getmainid:any;
  public otherotpsent:any;
  public testimonial:any;
  public getsocialmobile:any;
  public ourtopwinners:any; 
  public tokenid:any; 
  isCaptchaValid:boolean=false;
  isAuthenticated:boolean=false;
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
		this.fcode="";
    this.getmainid="";
		this.tokenid="";
    this.getsocialmobile="";	
		}

  ngOnInit() {

    this.forgetform = this.fb.group({
      'email' : ["", [Validators.required,Validators.pattern(this.emailPattern)]],
      'validate' : ""
      });
      this.entercodeform = this.fb.group({
      'code' : ["", [Validators.required]],
      'validate' : ""
      }); 
      this.resetform = this.fb.group({
      'repassword' : ["", [Validators.required]],
      'reconfirmpassword' : ["", [Validators.required]],
      'validate' : ""
      });
 this.login_data = {"email": "","password": ""};
 this.ourtopwinners=[];
  this.lForm = this.fb.group({
      'email' : ["", [Validators.required,Validators.pattern(this.emailPattern)]],
      'password' : ["", [Validators.required]],
      'validate' : ""
      }); 
  
    $(".modal-backdrop").removeClass("show");
      $(".modal-backdrop").removeClass("fade");
      $(".modal-backdrop").removeClass("modal-backdrop");
	  if (this.auth.isLoggedIn()) {
           this.router.navigate(['home']);
        }
	    
	   this.getcsrftoken = localStorage.getItem('csrftoken');
	
  }
    
  

	login(values){
		this.loader.start();  
		if(values.email == "" || values.password == ""){
			this.toastr.error("Please fill Fields.");
			this.loader.stop();
			return false;
    }
    //check for captcha 
    // if(!this.isCaptchaValid){
    //   this.toastr.error('Please check the captch field');
    //   this.loader.stop();
    //   return false;
    // }
		else {
      let body = {
        "email": values.email,
        "password": values.password
      }
			return this.http.post('users/login', body)
            .subscribe(
            (res:any) => {
              console.log(res)
              this.loader.stop();
              let data = JSON.parse(res._body)
              if(data.access_token){
              	 localStorage.setItem('gettoken', data.access_token);
              	 this.headerService.updateHeader('login');
                 this.lForm.reset();
                 this.isAuthenticated=true;
                 this.router.navigate(['/home']);
                // $("#verifCaptca").modal('show');
              }
              else {
                this.toastr.error('Invalid Username or password.');
                this.isAuthenticated=false;
                this.isCaptchaValid=false;
              }
             
            },
            err => {
              console.log(err)
                this.loader.stop();
                this.toastr.error('Invalid Username or password.');
            }); 
		}
	} 
 

  resolved(captchaResponse: string) {
    let captchaPayload={
      "captchaKey":captchaResponse,
      "token":localStorage.getItem('gettoken')
    }
    this.authttp.post('api/verifyCaptchaWeb',captchaPayload).subscribe(
      
        (responseData)=>{
          console.log(responseData);

         if(responseData.success){
            this.isCaptchaValid=true;
            $("#verifCaptca").modal('hide');
            this.router.navigate(['/home']);
          }else{
            this.isCaptchaValid=false;
            this.toastr.error(responseData.message);
            this.isAuthenticated=false;
            localStorage.removeItem('gettoken');
            localStorage.removeItem('token');
            $("#verifCaptca").modal('hide');
          }
          
        },
        error=>{
         
        }
      
    )
}


  signInWithGoogle(){  
      console.log('check 1');
		  this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => { 
        console.log('check 2');
        console.log(userData);
		  this.socialauthService.authState.subscribe((getdetailsfromlogin) => {
        console.log('check 3');
        console.log(getdetailsfromlogin);
		  this.authttp.get('api/socialauthentication?email='+getdetailsfromlogin.email+'&name='+getdetailsfromlogin.name+'&image='+getdetailsfromlogin.photoUrl)
		            .subscribe(
		            res => { 
		                if(res[0].status==0) {
		              	  this.getmainid = res[0].userid;  
		                }
		                else if(res[0].status==1){ 
		                 localStorage.setItem('gettoken', res[0].token);
		              	 localStorage.setItem('token', res[0].userid);
		              	 this.headerService.updateHeader('login');
                    //  this.router.navigate(['/home']);
                    this.isAuthenticated=true;
                    //  this.router.navigate(['/home']);
                    $("#verifCaptca").modal('show');
		              }else{
                    this.isAuthenticated=false;
                    this.isCaptchaValid=false;
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
      

        this.authttp.get('api/socialauthentication?email='+getdetailsfromlogin.email+'&name='+getdetailsfromlogin.name+'&image='+getdetailsfromlogin.photoUrl)
              .subscribe(
              res => { 
                if(res[0].status==0) {
            this.getmainid = res[0].userid; 
          }
          else if(res[0].status==1){
            localStorage.setItem('gettoken', res[0].token);
            localStorage.setItem('token', res[0].userid);
            this.headerService.updateHeader('login');
            // this.router.navigate(['/home']);
            this.isAuthenticated=true;
             $("#verifCaptca").modal('show');
          }else{
            this.isAuthenticated=false;
            this.isCaptchaValid=false;
          }

              },
              err => {
                  this.toastr.error('Something went wrong. Please try again.');
                  this.loader.stop();
              });
      }); 
    });  
    
    }  




  forgotpassword(values){ 
    this.loader.start();
    if(values.email!==''){

    let formData = new FormData();
    formData.append('username', values.email);
    this.getforgetemail = values.email;
    this.authttp.post('forgotpassword',formData)
        .subscribe(
        res => {
          console.log(res)
          this.loader.stop();
			if(res[0].status==1){
			   this.forgetform.reset();
			   this.toastr.success('We have sent you a OTP on registered email address to reset your password. Please check Your mail.');
			   $("#forgotPassword").modal('hide'); 
			   $("#entercodemodal").modal('show');
			   this.forgetform.reset();
			}
			if(res[0].status==2){
				this.toastr.error(res[0].msg);
			}
			if(res[0].status==0){
				this.toastr.error(res[0].msg);
			}
        },
        err => {
          console.log(err)
          this.toastr.error('Something went wrong. Please try again.');
          this.loader.stop();
		});    
    }
    else{
          this.toastr.error('Please fill all field');
    }
    }
    matchcode(values){

    if(values.code!==''){
    this.loader.start();
    let formData = new FormData();
    formData.append('code', values.code);
    formData.append('username', this.getforgetemail);
    this.fcode = values.code;
    this.authttp.post('api/matchCodeForReset',formData).subscribe( res => {
      this.loader.stop();
      // console.log(res);
      if(res[0].status==1){ 
          this.tokenid = res[0].token;
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
    else{
          this.toastr.error('Please fill all field');
    }
    }

    resetpassword(values){
     var pass=values.repassword;
    var repass=values.reconfirmpassword;
    if(pass!=repass){
      this.toastr.error('Password does not match. Please check again');
    }
    else if(pass=='' || repass==''){      
      this.toastr.error('fill password details first');
    }
    else{ 
      this.loader.start();
      let formData = new FormData();
      formData.append('password', values.repassword);
      formData.append('code', this.fcode);
      formData.append('token', this.tokenid);
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
}
