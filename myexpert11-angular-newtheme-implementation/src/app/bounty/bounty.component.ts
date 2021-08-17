 
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-bounty',
  templateUrl: './bounty.component.html',
  styleUrls: ['./bounty.component.css']
})
export class BountyComponent implements OnInit {

  public userdata:any;
  public userdatass:any;
  public fulluserdatas:any;
  public repoUrl:string;
  loginid:any;
  url:any;
  logintoken:any;
  whatsapptext:any;
  getwidth:any;

   constructor(private router:Router,private authSer:AuthService,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {

    this.loginid="";
    this.fulluserdatas=[];
    this.logintoken=""; 
      this.notification.getHeaderText('Bounty');
	  this.getUserInfo();
	  this.whatsapptext="";
    this.getwidth = $(window).width(); 
   

   }

    ngOnInit() {}
  shareonwhatsapp(){
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
	    this.logintoken = localStorage.getItem('gettoken');
      this.repoUrl="https://www.myexpert11.com/final/sharethrough?userid="+this.loginid;
      this.userfulldata();
    
    }
  }
  fbshare(facebook){
	var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u='+this.repoUrl+'&type='+facebook,'mywindow','width=600,height=450');
  }
	twittershare(twitter){
		var newWindow = window.open('https://twitter.com/intent/tweet?url='+this.repoUrl+'&type='+twitter,'mywindow','width=600,height=450');
	}

	googleshare(){
		var newWindow = window.open('https://plus.google.com/share?url='+this.repoUrl,'mywindow','width=600,height=450');
	}
  userfulldata()
  {
	      this.loginid = localStorage.getItem('token');
	   		return this.http.get('api/userfulldetails?token='+this.logintoken)
	        .subscribe(
            res => {
            	this.fulluserdatas = res[0];
              this.whatsapptext="I Love MyExpert11! Ultimate Cricket Fantasy App. Use This Referral Code "+this.fulluserdatas.refercode+"  to Sign Up on http://www.myexpert11.com/register and get Rs. 111 Instant FREE CASH BONUS!. App Download link http://myexpert11.com/apk/myexpert11.apk";
              localStorage.setItem('me', this.fulluserdatas);
              // console.log(this.whatsapptext);
            },
            err => { 
if(err.status===400){
					this.authSer.logout();
				}}); 
  }
} 