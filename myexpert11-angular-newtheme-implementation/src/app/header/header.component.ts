import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Renderer} from '@angular/core';
import {Globals} from '../global';
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href:any;
  public loginid:any;
  public userdatass:any;
  public notification_data:any;
  public issidebar:boolean;
  constructor(private render:Renderer,private authSer:AuthService,private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private notification:NotificationService,public notdata:Globals,) { 
      this.href="";
      this.userdatass="";
      this.loginid="";
  		this.notification_data=[];
      this.issidebar = false;
      if(localStorage.getItem('token'))
      this.accountdata(); 
 
  }

  ngOnInit() {
		if(!(localStorage.getItem('token'))){
			this.loginid="";
		}else{
			this.loginid = localStorage.getItem('token');
		}
  }
	
	sidebarMenu(){ 
		if(this.issidebar ==false){
			this.issidebar = true;
		}else{
			this.issidebar = false;
		}
	}
	
	logout(){
	this.sidebarMenu();	 
    localStorage.removeItem('token');
    localStorage.removeItem('gettoken');
    localStorage.removeItem('me');
    this.headerService.updateHeader('signup');
    this.router.navigate(['']);
	}
	redirecttopage(pagename){
		this.sidebarMenu();
		this.router.navigate([pagename]);
	}
	
	back_button(){ 
		window.history.back();
	}

   accountdata()  {
    var self=this;
      this.loginid = localStorage.getItem('token');
      let token = localStorage.getItem('gettoken');
      return this.http.get('api/userfulldetails?token='+token)
    .subscribe(
    res => {
      this.userdatass = res[0];  
    },
    err => {if(err.status===400){
					this.authSer.logout();
				} });
  }
}
