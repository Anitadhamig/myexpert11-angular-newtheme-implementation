import {    Component, OnInit}from '@angular/core';
import {    Router, ActivatedRoute}from '@angular/router';
import {    ElementRef, Renderer2}from '@angular/core';
import {    API}from '../config';
import {    FormBuilder, FormGroup, Validators, ReactiveFormsModule}from '@angular/forms';
import {    HttpClientService, HeaderService, LoaderService, CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService}from '../app.service';
import {    ToastrService}from 'ngx-toastr';
import {Globals}from '../global';
import { resetFakeAsyncZone } from '@angular/core/testing';
declare let $: any;
// declare var grecaptcha: ReCAPTCHA;
@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

    public mypopularoffers: any;
    checkcode: any;
    public loginid: any;
    public userdatass: any;
    public userbalance: any;
    public alloffer: any;
    public allofferbonus: any;
    public MobileNumber: any;
	  public newnyum:any="";
    public allofferbonusfind: any;
    public ptype: any;
    public allofferbonusone: any;
    public allofferbonustwo: any;
    public allofferbonusthree: any;
    public finaladdamount: any;
    public ourreward: any;
    public partners: any;
    public paytmno: any;
    public allreward: any; 
    public MobileNumberek: any; 
    public allusersreward: any;
    public balance: any;
    public amountb: any;
    public rewaid: any;
    public paycommision: any;
    public igst: any;
    public ntepayble: any;
    public myrefer: any;
    public verified: any;
    public cashadded: any;
    user: any;
	
    public withdraw: any;
    public numbernew: any;
    public withnew: any;
    public otpdone: any;
    public userdatassw: any;
    public getallawards: any;
    public getallofr: any;
    token: string;
    isCaptchaVerified=false;
    captchaVerifyToken:string=null;
    constructor(private router: Router,private authSer:AuthService, private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader: LoaderService, private activatedRoute: ActivatedRoute, private commons: CommonService, private toastr: ToastrService, private fb: FormBuilder, private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notdata: Globals, private notification: NotificationService) {
       this.notification.getHeaderText('My Account');
        this.user = {
            "balance": 0,
            'payfrom': 'payu'
        };
        this.amountb = ""; 
        this.withdraw = {
            "balance": 200
        };


      this.allofferbonus={ 
        'balance': 0
      }
	  
      this.activatedRoute.queryParams.subscribe(params => {
              this.amountb = params['amountb']; 
        });
		
		if(this.amountb == 1){		
			$('#addmoney').modal('show');
		}
        this.ntepayble = [];
        this.getallofr = [];
        this.userdatass = [];
        this.paycommision = [];
        this.userbalance = [];
        this.ptype = [];
        this.alloffer = [];
        this.getallawards = [];
        this.MobileNumberek = "";
        this.numbernew = "";
        this.withnew = "";
        this.otpdone = "";
        this.allofferbonusfind = [];
        this.ourreward = [];
        this.partners = [];
        this.allofferbonusone = [];
        this.paytmno = [];
        this.allofferbonustwo = [];
        this.allofferbonusthree = [];
        this.finaladdamount = [];
        this.igst = [];
        this.balance = []; 
        this.allreward = [];
        this.allusersreward = [];
        this.checkcode = {
            "couponcode": false,
            "couponcodevalue": ''
        };
        this.mypopularoffers = [];
        this.loginid = "";
        this.rewaid = ""; 
        this.myrefer = "";
        this.verified = "";
        this.cashadded = "";
        this.userdatassw = "";

        if (!(localStorage.getItem('token'))) {
            this.router.navigate(['']);
        } else {
            this.loginid = localStorage.getItem('token');
            this.token = localStorage.getItem('gettoken');
        }
        this.notification.getFirstMenu('profile');
        this.notification.getSecondMenu('referfriend');
        this.accountdata();
        this.fulldetails();
        this.partenerscall();
        this.alloffers();
        // this.staticbonusone();
        // this.staticbonustwo();
        // this.staticbonusthree(); 
        this.rewards(); 
        this.allrewards(); 
        this.alluserrewards();  
		this.paytoptm();
		this.allawards();
		this.allofr();
    }
    ngOnInit() {
		 
	}

    AddAmount(amt) {  
		var a = Number(this.user.balance || 0);
		var b = Number(amt || 0);
		this.user.balance = a + b; 
    }
    AddAmountwith(amt) { 
		// if(this.userdatassw <= this.withdraw.balance){		
			// this.toastr.error("You can't withdraw amount more then winning amount");
		// }else{
			var a = Number(this.withdraw.balance || 0);
			var b = Number(amt || 0);
			this.withdraw.balance = a + b;
		// }
    }

    isNumber(evt) {
        var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;

        return true;
    }
 

    accountdata() { 
        return this.http.get('api/mywalletdetails?userid='+this.loginid+'&token='+this.token)
            .subscribe(
                res => {
                  //goto
                    this.userdatass = res[0];  
                    this.userdatassw = res[0].winning;  
                },
                err => {});
    }

    alloffers() { 
        return this.http.get('api/alloffers?userid='+this.loginid+'&token='+this.token)
            .subscribe(
                res => {
                    this.alloffer = res;  
                },
                err => {});
    }

    alluserrewards() { 
        return this.http.get('api/getAllRewards'+'?token='+this.token)
            .subscribe(
                res => {
                    this.allusersreward = res;    
                },
                err => {});
    }
    allawards() { 
        return this.http.get('api/getallamtoffer'+'?token='+this.token)
            .subscribe(
                res => {
                    this.getallawards = res;    
                },
                err => {});
    }
    allofr() { 
        return this.http.get('api/getalluseroffers?userid='+this.loginid+'&token='+this.token)
            .subscribe(
                res => {
                    this.getallofr = res;   
					console.log(this.getallofr); 
                },
                err => {});
    }
    AddAmountnew(amt,id) {  
		this.user.balance="";	
        $('#getofr'+id).addClass('active'); 
		$('#getofr'+id).parents().siblings().removeClass('active');
		this.user.balance = amt; 
    }

    withdrawableamount() {   
    //goto
        if (this.userdatass.winning<200) {
            $('#notwithdrawmoney').modal('show');
        }     
        else{
            $('#withdrawmoney').modal('show');
              this.accountdata();
        }
        // $('#withdrawmoney').modal('show');
        // this.accountdata();
     }
    mytransaction() {
        this.router.navigate(['/my-transcations']);
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
              this.isCaptchaVerified=true;
              this.captchaVerifyToken=responseData.captchaVerifyToken;
              $("#verifCaptca").modal('hide');
              //payment withdraw code
              var bal = this.withdraw.balance;
              this.paycommision = ((bal*2)/100);
              this.igst = ((this.paycommision*18)/100);
              this.ntepayble = (bal-(this.paycommision+this.igst));
              if(this.ptype==''){
                  this.toastr.error('Please select a method for withdraw'); 
                  return;
              }else if(this.ptype=='Paytm'){
                this.paytoptmnext();
              }
              else{
                this.withdrawbalance(this.ptype);
              }
              //resetting the captcha
              setTimeout(()=>{
                grecaptcha.reset();
              },10000)
             
            }else{
              this.isCaptchaVerified=false;
              this.toastr.error(responseData.message);
              $("#verifCaptca").modal('hide');
             }
            
          },
          error=>{
            if(error.status === 400){
              this.authSer.logout();
            }
          }
        
      )
  }
 
    // checkaddcash(){
    //     if (this.alloffer.length!=0) {
    //         $('#addcashfirsttime').modal('show');
    //     }
    //     else{            
    //         $('#addmoney').modal('show');
    //     }
    // }

 

  setbonus(event: any){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount='+this.allofferbonus.balance+'&token='+this.token)
            .subscribe(
                res => {
                    if(res.length>0){
                        this.allofferbonusfind = res;
                    }
                       
                },
                err => {});
  }
  // staticbonusone(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=25')
  //           .subscribe(
  //               res => {
  //                   if(res.length>0){
  //                       this.allofferbonusone = res;
  //                   }
                       
  //               },
  //               err => {});
  // }
  // staticbonustwo(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=100')
  //           .subscribe(
  //               res => {
  //                   if(res.length>0){
  //                       this.allofferbonustwo = res;   
  //                   }
                    
  //               },
  //               err => {});
  // }
  // staticbonusthree(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=1000')
  //           .subscribe(
  //               res => {
  //                   this.allofferbonusthree = res;   
  //               },
  //               err => {});
  // }

  addmoneybybonus(amountforbonus){ 
    if(amountforbonus!='0'){
        this.finaladdamount = amountforbonus;
        // console.log(this.finaladdamount);
        $('#addcashfirsttime').modal('hide')
        $('#paytype').modal('show')
    }
    else{
      this.toastr.error("Please enter valid amount");        
    }
  }

    payumoneyadd(paytype) {
		if(this.user.balance!='0'){  
         if(this.user.balance < 10 && this.alloffer.length!=0){  
			this.toastr.error("Minimum 1st Deposit amount is Rs 10."); 
			return false;
		   } else{ 
				var bal = Number(this.user.balance || 0);
				if (bal <= 0) {
					this.toastr.error("Please enter valid amount");
				} else {
					window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype+'&token='+this.token;
				}  
		   } 
       }
       else{        
            var bal = Number(this.finaladdamount || 0);
            if (bal <= 0) {
                this.toastr.error("Please enter valid amount");
            } else {
                window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype+'&token='+this.token;
            }
       }

    }
    withdrawbalance(withdrawtype) {  
        var bal = this.withdraw.balance; 
            this.loader.start();
            let formData = new FormData();
            formData.append('amount', bal); 
            // formData.append('user_id', this.loginid); 
            formData.append('type', withdrawtype); 
            // formData.append('paytm_number', ""); 
            formData.append('withdrawfrom', 'wining');  
            formData.append('captchaVerifyToken', this.captchaVerifyToken);  
            this.authttp.post('api/request_withdrow'+'?token='+this.token,formData)
         .subscribe(
        res => { 
         this.loader.stop();
		 // console.log(res);
            if(res[0].status=='3'){     
              this.toastr.error(res[0].msg);
               $('#withdrawmoney').modal('hide');	 	   
				this.router.navigate(['verify-account']);
              return false;
            }
            else if(res[0].status=='2'){
                this.toastr.error(res[0].msg);
                $('#withdrawmoney').modal('hide'); 
            }
            else if(res[0].status=='1'){
              this.toastr.success('Your request has been sent successfully.You will be get info about it in between 24 to 48 Hours.');
              $('#withdrawmoney').modal('hide'); 	

            }
			else if(res[0].status=='-1'){
              this.toastr.error(res[0].msg);
            }
            else if(res[0].status=='0'){
              this.toastr.error(res[0].msg);
            }
        },
        err => {if(err.stats === 400){this.authSer.logout()} }); 
    }
	
	 getreward(id){	 
		this.rewaid = id; 
		$('#rewardget').modal('show');
	 }
	 
	  claimbalance(){  
		let formData = new FormData();
		formData.append('userid', this.loginid); 
		formData.append('rewardid', this.rewaid);  
		this.authttp.post('api/updatestatus'+'?token='+this.token,formData) 
		.subscribe(
		res => { 
				if(res[0].status=='1'){     
				  this.toastr.success(res[0].msg);
					this.rewards();		  
					$('#rewardget').modal('hide');
					
				}
				else if(res[0].status=='0'){     
				  this.toastr.error(res[0].msg); 
				}
		},
		err => {});
	  }

  
  
  rewards(){ 
    return this.http.get('api/getNumberOfReferUser?userid='+this.loginid+'&token='+this.token)
    .subscribe(
    res => {
        this.ourreward = res;   

 		
    },
    err => {});
  }

  partenerscall(){ 
    return this.http.get('api/mypartnerstats?userid='+this.loginid+'&token='+this.token)
    .subscribe(
    res => {
		 
            if(res[0].status=='1'){      
				this.partners = res[0];  
            }
			else{
				this.partners = [];  
			}

 		
    },
    err => {});
  }

  allrewards(){ 
    return this.http.get('api/getallmyrewards?userid='+this.loginid+'&token='+this.token)
    .subscribe(
    res => {
        this.allreward = res;   
    },
    err => {});
  }
  
  
  fulldetails(){ 
    return this.http.get('api/userfulldetails?token='+this.token)
    .subscribe(
    res => { 
	 
        this.myrefer = res[0].totalrefer;   
        this.verified = res[0].totalreferverified;   
        this.cashadded = res[0].totalreferuserdonetransaction;   
		
		 		
    },
    err => {if(err.status===400){
					this.authSer.logout();
				}});
  }
  
  
  paytoptm(){ 
    return this.http.get('api/userfulldetails?token='+this.token)
    .subscribe(
    res => {
		this.paytmno = res;   
        this.MobileNumber = this.paytmno[0].paytm_number;   
        this.MobileNumberek = this.paytmno[0].paytm_number;   
		if(this.MobileNumber == ""){
			this.MobileNumber = this.paytmno[0].mobile;  
		}
		else{
			this.MobileNumber == this.paytmno[0].paytm_number;
		} 	
    },
    err => {if(err.status===400){
					this.authSer.logout();
				}});
  }
  paytoptmnext(){ 
    return this.http.get('api/userfulldetails?token='+this.token)
    .subscribe(
    res => {
		console.log("mobile number"+JSON.stringify(res));
		this.paytmno = res;   
        this.MobileNumber = this.paytmno[0].paytm_number;   
        this.MobileNumberek = this.paytmno[0].paytm_number;   
		if(this.MobileNumber == ""){
			this.MobileNumber = this.paytmno[0].mobile;  
		}
		else{
			this.MobileNumber == this.paytmno[0].paytm_number;
		}
		
		console.log(res[0]);
		
			
        $('#withdrawmoney').modal('hide');	
        $('#Paytmno').modal('show');			
    },
    err => {if(err.status===400){
					this.authSer.logout();
				}});
  }
  
  goback(){   
        $('#Paytmno').modal('hide'); 
        $('#withdrawmoney').modal('show');
  }
  
   
	
	
    withdrawbalancepaytmb(withdrawtype,number) {  
      console.log(`the no is ${number}`);
      console.log(this.MobileNumberek);
		if(this.MobileNumberek != ""){
			this.withdrawbalancepaytm(withdrawtype,number)
		}
		else{ 
			if($('#code-in-box').is(":checked")){ 
			if(this.MobileNumber==""){
				 this.toastr.error('Please enter mobile number');
				return true; 
			} 
			var mobpattern = /^[7-9]{1}[0-9]{9}$/; 
			if(mobpattern.test(this.MobileNumber) == false)
			{
				 this.toastr.error('Please enter valid mobile number');
				return true; 
			} 
				var bal = this.withdraw.balance; 
					this.loader.start();
					let formData = new FormData(); 
					// formData.append('userid', this.loginid); 
					formData.append('mobile', number);  
					this.authttp.post('api/getpaytmverifyotp'+'?token='+this.token,formData)
				 .subscribe(
				res => { 
				 this.loader.stop();
				 // console.log(res);
					if(res[0].status=='1'){     
					  this.toastr.success(res[0].msg); 
						this.withnew = withdrawtype;
						this.numbernew = number;
						$('#Paytmno').modal('hide');			    
						$('#Paytmnootp').modal('show');			    
					  return false;
					} 
					else{     
					  this.toastr.error(res[0].msg);  		    
					  return false;
					} 
				},
				err => { }); 
			}
			else{ 
				this.toastr.error('Please Accept Term & Conditions');
			}
		}

	}
	
    otpdoneh(otpdone) {    
			if(this.otpdone==""){
				 this.toastr.error('Please enter OTP');
				return true; 
			}
			else{			
				var bal = this.withdraw.balance; 
					this.loader.start();
					let formData = new FormData(); 
					// formData.append('userid', this.loginid); 
					formData.append('mobile', this.numbernew);  
					formData.append('otp', otpdone);  
					this.authttp.post('api/paytmverifyotp'+'?token='+this.token,formData)
				 .subscribe(
				res => { 
				 this.loader.stop();
				 // console.log(res);
					if(res[0].status=='1'){     
					  this.toastr.success(res[0].msg);  
						$('#Paytmnootp').modal('hide');			    
						this.withdrawbalancepaytma(this.withnew,this.numbernew) 
					  return false;
					} 
					else{     
					  this.toastr.error(res[0].msg);  		    
					  return false;
					} 
				},
				err => { });  
			}

	}
	
    withdrawbalancepaytm(withdrawtype,number) {  

		if($('#code-in-box').is(":checked")){ 
		if(this.MobileNumber==""){
			 this.toastr.error('Please enter mobile number');
			return true; 
		} 
		var mobpattern = /^[7-9]{1}[0-9]{9}$/; 
		if(mobpattern.test(this.MobileNumber) == false)
		{
			 this.toastr.error('Please enter valid mobile number');
			return true; 
		} 
			var bal = this.withdraw.balance; 
				this.loader.start();
				let formData = new FormData();
				formData.append('amount', bal); 
				// formData.append('user_id', this.loginid); 
				formData.append('type', withdrawtype); 
				// formData.append('paytm_number', number); 
        formData.append('withdrawfrom', 'wining'); 
        formData.append('captchaVerifyToken', this.captchaVerifyToken);  
          
				this.authttp.post('api/request_withdrow'+'?token='+this.token,formData)
			 .subscribe(
			res => { 
			 this.loader.stop();
			 // console.log(res);
				if(res[0].status=='3'){     
				  this.toastr.error(res[0].msg); 
					$('#Paytmno').modal('hide');			   
					this.router.navigate(['verify-account']);
				  return false;
				}
				else if(res[0].status=='2'){
					this.toastr.error(res[0].msg); 
					$('#Paytmno').modal('hide');		
				}
				else if(res[0].status=='1'){
				  this.toastr.success('Withdrawal request submitted successfully!'); 
					$('#Paytmno').modal('hide');		

				}
				else if(res[0].status=='-1'){
				  this.toastr.error(res[0].msg);
				}
				else if(res[0].status=='0'){
				  this.toastr.error(res[0].msg);
				}
			},
			err => { if(err.status === 400)this.authSer.logout()}); 
		}
		else{ 
			this.toastr.error('Please Accept Term & Conditions');
		}
	}
    withdrawbalancepaytma(withdrawtype,number) {  
			var bal = this.withdraw.balance; 
				this.loader.start();
				let formData = new FormData();
				formData.append('amount', bal); 
				// formData.append('user_id', this.loginid); 
				formData.append('type', withdrawtype); 
				// formData.append('paytm_number', number); 
        formData.append('withdrawfrom', 'wining');  
        formData.append('captchaVerifyToken', this.captchaVerifyToken);  
       	this.authttp.post('api/request_withdrow'+'?token='+this.token,formData)
			 .subscribe(
			res => { 
			 this.loader.stop();
			 // console.log(res);
				if(res[0].status=='3'){     
				  this.toastr.error(res[0].msg); 
					$('#Paytmno').modal('hide');			   
					this.router.navigate(['verify-account']);
				  return false;
				}
				else if(res[0].status=='2'){
					this.toastr.error(res[0].msg); 
					$('#Paytmno').modal('hide');		
				}
				else if(res[0].status=='1'){
				  this.toastr.success('Withdrawal request submitted successfully!'); 
					$('#Paytmno').modal('hide');		

				}
				else if(res[0].status=='-1'){
				  this.toastr.error(res[0].msg);
				}
				else if(res[0].status=='0'){
				  this.toastr.error(res[0].msg);
				}
			},
			err => { if(err.status === 400){
        this.authSer.logout();
      }});  
	}
	
	proceedtowithdrawpay(type){
		this.ptype = type; 
		
	}
	proceedtowithdraw(){ 
    //goto
    if(this.ptype==''){
				  this.toastr.error('Please select a method for withdraw'); 
				  return;
      }
      
    if(this.userdatass.winning < this.withdraw.balance){
      this.toastr.error('Withdrawl amount can not be more than winning amount');
      return;
    }
		if(this.ptype=='Paytm' && this.withdraw.balance<300){	
			this.toastr.error("Minimum amount to withdrawal to Paytm is Rs. 300");  
			return;
		}else if(this.ptype=='Paytm' && this.withdraw.balance % 10 != 0){	
			this.toastr.error('Please enter the amount in multiple of Rs 10   Like Rs.310, 320, 330'); 
			this.withdraw.balance = 0; 
			return;
		}
		if(this.ptype=='Bank' && this.withdraw.balance<200){			
			this.toastr.error("Minimum amount to withdrawal to Bank is Rs. 200");  
			return;
		}else if(this.ptype=='Bank' && this.withdraw.balance % 10 != 0){			
			this.toastr.error('Please enter the amount in multiple of Rs 10   Like Rs.210, 220, 230'); 
			this.withdraw.balance = 0; 
			return;
		}
		
		
		if(this.withdraw.balance == 0){			
				  this.toastr.error('Please add amount for withdraw'); 
		}else{
      $("#verifCaptca").modal('show');
			// var bal = this.withdraw.balance;
			// this.paycommision = ((bal*2)/100);
			// this.igst = ((this.paycommision*18)/100);
			// this.ntepayble = (bal-(this.paycommision+this.igst));
			// if(this.ptype==''){
			// 	  this.toastr.error('Please select a method for withdraw'); 
			// 	  return;
			// }else if(this.ptype=='Paytm'){
			// 	this.paytoptmnext();
			// }
			// else{
			// 	this.withdrawbalance(this.ptype);
			// }
		}
		
	}

}