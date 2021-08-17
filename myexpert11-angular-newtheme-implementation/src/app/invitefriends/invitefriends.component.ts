import { Component, OnInit } from '@angular/core';
import { CeiboShare } from 'ng2-social-share';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config'; 
 import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NotificationService, HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService,HttpIntercepter, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-invitefriends',
  templateUrl: './invitefriends.component.html',
  styleUrls: ['./invitefriends.component.css'] 
})
export class InvitefriendsComponent implements OnInit {
  public userdata:any;
  public userdatass:any;
  public fulluserdatas:any;
  public repoUrl:string;
  loginid:any;
  url:any;
  logintoken:any;
  whatsapptext:any;
  getwidth:any;
  constructor(private notification:NotificationService,private authSer:AuthService, private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2,private notdata:Globals) { 
    this.loginid="";
    this.fulluserdatas=[];
    this.logintoken=""; 
      this.notification.getHeaderText('Invite Friends');
	  this.getUserInfo();
	  this.userfulldata();
    this.whatsapptext="";
    this.getwidth = $(window).width();
  }
    ngOnInit() {}
  shareonwhatsapp(){
    console.log(this.whatsapptext);
    if(this.getwidth<700){
      window.open('whatsapp://send?text=' + this.whatsapptext);
    }else{
      window.open('https://web.whatsapp.com/send?text=' + this.whatsapptext);
    }
  }
  getUserInfo()
	{
		if(!(localStorage.getItem('token'))){
  		this.router.navigate(['']);
  	}
  	else{
      var self=this;
      this.loginid = localStorage.getItem('token'); 
	    this.repoUrl="https://www.myexpert11.com/final/myexpert11/api/invitepage?token="+this.loginid;
     	return this.http.get('api/userinfo?token='+this.loginid)
	        .subscribe(
            res => {
            	this.userdata = res[0];
              localStorage.setItem('me', this.userdata);
            },
            err => { });
 	 }
  }
  fbshare(){
	var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u='+this.repoUrl,'mywindow','width=600,height=450');
  }
	twittershare(){
		var newWindow = window.open('https://twitter.com/intent/tweet?url='+this.repoUrl,'mywindow','width=600,height=450');
	}

	googleshare(){
		var newWindow = window.open('https://plus.google.com/share?url='+this.repoUrl,'mywindow','width=600,height=450');
	}
  userfulldata()
  {
        this.loginid = localStorage.getItem('token');
        let token = localStorage.getItem('gettoken');
	   		return this.http.get('api/userfulldetails?token='+token)
	        .subscribe(
            res => {
            	this.fulluserdatas = res[0];
             this.whatsapptext=`I Love MyExpert11! ${'%0D%0A'}Lowest Platform FEE. ${'%0D%0A'}${'%0D%0A'}Come, Play and  Win.${'%0D%0A'}👉Live Matches${'%0D%0A'}👉AI- Virtual Matches${'%0D%0A'}${'%0D%0A'}Sign Up Now${'%0D%0A'}👉Get Rs.51 Free${'%0D%0A'}👉Upto 100% Bonus On 1st Deposit${'%0D%0A'} 👉100% Bonus Contests.${'%0D%0A'}👉Instant Paytm Withdrawls${'%0D%0A'}👉Use this referral code ${'%0D%0A'}${'%0D%0A'}App Link ${'%0D%0A'}https://www.myexpert11.com/apk/myexpert11.apk${'%0D%0A'}${'%0D%0A'}Get Rs. 51 FREE ${'%0D%0A'}Use Refer Code: ${this.fulluserdatas.refercode}${'%0D%0A'}Telegram Support: https://t.me/MyExpert11Support `;
              localStorage.setItem('me', this.fulluserdatas);
            },
            err => { if(err.status===400){
					this.authSer.logout();
				}}); 
  } 


  copyInputMessage(inputElement){ 
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
