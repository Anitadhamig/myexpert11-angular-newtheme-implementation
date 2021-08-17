import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientService, HttpIntercepter, HeaderService, LoaderService, CommonService, ManualAuthService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any;
import { Observable } from 'rxjs/Rx';
import { SocialUser } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { AuthService } from "angular4-social-login";
import { ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	@ViewChild('closeBtn') closeBtn: ElementRef;
	public login_data: any;
	public register_data: any;
	loginid: any;
	registerData: any;
	emailAlert: string = 'Invalid email';
	passAlert: string = 'password is required';
	emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	numberPattern = /([0-9]{10})/;
	rForm: FormGroup;
	codeForm: FormGroup;
	verifyform: FormGroup;
	lForm: FormGroup;
	forgetform: FormGroup;
	entercodeform: FormGroup;
	resetform: FormGroup;
	verifynumberform: FormGroup;
	verifynumberotpform: FormGroup;
	post: any;                     // A property for our submitted form
	description: string = '';
	name: string = '';
	getdetailsfromlogin: any;
	public getcsrftoken: any;
	// registration fields//
	public getusername: string;
	public getemail: string;
	public getmobile: any;
	public otpsent: boolean;
	public getpassword: any;
	public codevalue: any;
	public refercodeadd: any;
	public refercodeearn: any;
	public mailsent: boolean;
	public getforgetemail: any;
	public getmainid: any;
	public otherotpsent: any;
	public testimonial: any;
	public refercodeadsocial: any;
	public referral: any;
	public getsocialmobile: any;
	public ourtopwinners: any;
	public rcode: any;
	public tokancode: any;
	public usrid: any;
	constructor(private router: Router, private http: HttpClientService, private authttp: HttpIntercepter, private headerService: HeaderService, private loader: LoaderService, private activatedRoute: ActivatedRoute, private commons: CommonService, private toastr: ToastrService, private fb: FormBuilder, private auth: ManualAuthService, public socialauthService: AuthService) {
		this.getcsrftoken = "";
		this.getusername = "";
		this.refercodeearn = "";
		this.otherotpsent = "";
		this.testimonial = "";
		this.getemail = "";
		this.getmobile = "";
		this.codevalue = "";
		this.otpsent = false;
		this.mailsent = false;
		this.getpassword = "";
		this.refercodeadd = "";
		this.refercodeadsocial = '';
		this.getforgetemail = "";
		this.getmainid = "";
		this.getsocialmobile = "";
		this.referral = "";
		this.tokancode = "";
		this.usrid = "";
		this.ourtopwinners = [];

		this.activatedRoute.queryParams.subscribe(params => {
			this.tokancode = params['getuserid'];
		});
		this.rForm = fb.group({
			'email': ["", [Validators.required, Validators.pattern(this.emailPattern)]],
			'refercode': [""],
			'password': ["", [Validators.required]],
			'cpassword': ["", [Validators.required]],
		});

		this.verifyform = fb.group({
			'otp': ["", [Validators.required]],
		});
		this.codeForm = fb.group({
			'refercodeadsocial': ["", [Validators.required]],
		});
		// this.myreferl();

		if (localStorage.getItem('sessionrefercode')) {
			this.refercodeearn = localStorage.getItem('sessionrefercode');
			this.codevalue = localStorage.getItem('sessionrefercode');
			this.usrid = localStorage.getItem('sessionreferuserid');
		}
	}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.router.navigate(['home']);
		}
		this.getcsrftoken = localStorage.getItem('csrftoken');


	}
	refercodeSec() {
		$('#refercodeSec').toggleClass('hidden');
	}



	register(values) {
		if ($('#code-in-box').is(":checked")) {
			if (values.refercode != "") {
				this.refercodeearn = values.refercode;
			}
			else if (values.refercode == undefined) {
				this.refercodeearn = "";
			}
			else {
				this.toastr.error('Please enter your refer code.');
			}
		}
		if (values.password != values.cpassword) {
			this.toastr.error("Confirm Password Doesn't match");
			this.loader.stop();
			return false;
		}
		else if (values.email == "" || values.password == "" || values.cpassword == "" || values.password.length < 6) {
			if(values.password.length < 6){
				this.toastr.error('The password must be at least 6 characters')
				return
			}
			this.toastr.error("Please fill Fields");
			this.loader.stop();
			return false;
		}
		else {
			this.loader.start();
			let body = {
				"email": values.email,
				"password": values.password,
				"referralCode": values.refercode
			  }
			return this.http.post("registerNew",body)
				.subscribe(
					(res:any) => {
						console.log(res)
						this.loader.stop();
						let data = JSON.parse(res._body)
						if (data[0].status == 1 ) {
							localStorage.setItem('gettoken', data[0].token)
							// this.getemail = values.email;
							// this.getpassword = values.password;
							// if (this.refercodeearn != "") {
							// 	this.refercodeadd = this.refercodeearn;
							// }
							// else if (this.refercodeearn == undefined) {
							// 	this.refercodeadd = "";
							// }
							this.toastr.success("OTP sent to" + values.email);
							$("#regitrationotp").modal('show');
						} 
						else {
							// console.log(res.error.email)
							// this.toastr.error(res.error.email[0]);
							this.loader.stop();
						}
					},
					err => {
						console.log( err)
						this.loader.stop();
						this.toastr.error(JSON.parse(err._body).error.email[0]);
					}
					);
		}

	}
	myreferl() {
		return this.http.get("api/myreferal?tokancode=" + this.tokancode)
			.subscribe(
				res => {
					console.log(res.success);
					if (res.success) {
						localStorage.setItem('sessionrefercode', res.refercode);
						localStorage.setItem('sessionreferuserid', res.userid);
						this.refercodeearn = res.refercode;
						this.codevalue = res.refercode;
						this.usrid = res.userid;
						return false;
					} else {
						this.refercodeearn = "";
						this.codevalue = "";
						this.usrid = "";
						return false;
					}

				},
				err => {
					this.toastr.error('Something went wrong. Please try again.');
				});
	}
	registerverify(values) {
		this.loader.start();
		let token = localStorage.getItem('gettoken');
		let body = {
			"token": token,
			"otp":values.otp
		  }
		// return this.http.get("api/registeruser?username=" + this.getemail + "&otp=" + values.otp + "&password=" + this.getpassword + "&refercode=" + this.refercodeadd + "&fromuserid=" + this.usrid)
		return this.http.post("userVerify", body)
			.subscribe(
				(res:any) => {
					console.log(res)
					this.loader.stop();
					// if (res[0].status == 0) {
					// 	this.toastr.error('Wrong OTP');
					// 	return false;
					// }
					// if (res[0].status == 1) {

					// 	this.verifyform.reset();
					// 	this.toastr.success('your account is activated successfully.');
					// 	$("#regitrationotp").modal('hide');
					// 	this.router.navigate(['/home']);

					// }
					localStorage.removeItem('gettoken');
					localStorage.setItem('gettoken', res.access_token)
					   this.verifyform.reset();
						this.toastr.success('your account is activated successfully.');
						$("#regitrationotp").modal('hide');
						this.router.navigate(['/home']);
					// this.closeBtn.nativeElement.click();

				},
				err => {
					this.toastr.error('Wrong OTP');
					this.loader.stop();
				});
	}

	referralcode() {
		$('#referralcodefb').modal('show');

	}
	codevarify(values) {
		if (values.refercodeadsocial != "") {
			this.codevalue = values.refercodeadsocial;
			this.toastr.success('For use this referral code please register social.');
			$('#referralcodefb').modal('hide');
		}
		else {
			this.toastr.error('Please use referral code');
		}

	}

	signInWithGoogle() {
		this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
			this.socialauthService.authState.subscribe((getdetailsfromlogin) => {
				this.authttp.get('api/socialauthentication?email=' + getdetailsfromlogin.email + '&name=' + getdetailsfromlogin.name + '&image=' + getdetailsfromlogin.photoUrl + "&refercode=" + this.codevalue + "&fromuserid=" + this.usrid)
					.subscribe(
						res => {
							if (res[0].status == 0) {
								this.getmainid = res[0].userid;
							}
							else if (res[0].status == 1) {
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
	signInWithFB() {
		this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
			this.socialauthService.authState.subscribe((getdetailsfromlogin) => {


				this.authttp.get('api/socialauthentication?email=' + getdetailsfromlogin.email + '&name=' + getdetailsfromlogin.name + '&image=' + getdetailsfromlogin.photoUrl + "&refercode=" + this.codevalue + "&fromuserid=" + this.usrid)
					.subscribe(
						res => {
							if (res[0].status == 0) {
								this.getmainid = res[0].userid;
							}
							else if (res[0].status == 1) {
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

}
