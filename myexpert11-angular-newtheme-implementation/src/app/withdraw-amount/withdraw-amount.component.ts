import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-withdraw-amount',
  templateUrl: './withdraw-amount.component.html',
  styleUrls: ['./withdraw-amount.component.css']
})
export class WithdrawAmountComponent implements OnInit {

  public userdata:any;
  public userdatass:any;
  public loginid:any;
  public userwithdraw:any;
  public amount:any;
  user:any;
  token: string;
 constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2,private notdata:Globals, private notification:NotificationService) {
      this.notification.getHeaderText('Withdraw Amount');
	  this.withdrawtransaction();
	  this.userdatass=[];
	  this.userdata=[];
	  this.userwithdraw=[];
	  this.loginid="";
	  this.amount=0;
 	  this.user = {"balance":0};
	  
		if(!(localStorage.getItem('token'))){
		  this.router.navigate(['']);
		}
		else{
      this.loginid = localStorage.getItem('token');
      this.token = localStorage.getItem('gettoken');
		}
      this.notification.getFirstMenu('profile');
      this.notification.getSecondMenu('referfriend');
      this.accountdata();
	}
	ngOnInit() {
  }
accountdata(){ 
      return this.http.get('api/mybalance?user_id='+this.loginid+'&token='+this.token)
    .subscribe(
    res => {
      this.userdatass = res[0]; 
    },
    err => { });
  }
 
	AddAmount(amt) {
		var a = Number(this.user.balance || 0);
		var b = Number(amt || 0);
		this.user.balance = a+b;
	}

	isNumber(evt) {
		var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;

        return true;
    } 
 
    updatemoney(type){   
      this.loader.start();
    if(this.user.balance<100){
      this.loader.stop();
      this.toastr.error('Minimum amount to wihtdraw is 100.');
      return false;
              
    }
    else if(this.user.balance !='0')
     {      
        return this.http.get('api/request_withdrow?amount='+this.user.balance+'&type='+type+'&token='+this.token)
        .subscribe(
        res => { 
         this.loader.stop();
             this.loader.stop();

            if(res[0].status==3){              
              this.toastr.error(res[0].msg);
             }
            if(res[0].status==2){
                this.toastr.error(res[0].msg);
             }
            else if(res[0].status==1){
              this.toastr.success('Your request has been sent successfully.You will be get info about it in between 24 to 48 Hours.');
              this.withdrawtransaction();
            }
            else if(res[0].status==0){
              this.toastr.error(res[0].msg);
            }
        },
        err => { });
      
     }
     else  { 
        this.toastr.error('Withdrawl amount cannot be 0');
       this.loader.stop();
        return false;   
     }
  }
    withdrawtransaction()
  {
    this.loginid = localStorage.getItem('token');
      return this.http.get('api/mywithrawlist?user_id='+this.loginid+'&token='+this.token)
          .subscribe(
            res => {
        // alert('tttttttt'); 
              this.userwithdraw = res[0];

              localStorage.setItem('userwithdraw', this.userwithdraw);
            },
            err => { }); 
  }

}