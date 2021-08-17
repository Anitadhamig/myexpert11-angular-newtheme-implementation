import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config'; 
 import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService,HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})


export class FooterComponent implements OnInit {
 public getmatchkey:any;
 public loginid:any;
 constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2,public notdata:Globals, private notification:NotificationService) {
   /* console.log('Globals:-'+JSON.stringify(this.notdata));*/
    this.getmatchkey="";
 }

  ngOnInit() {
	
	
		if(!(localStorage.getItem('gettoken'))){
			this.loginid="";
		}else{
			this.loginid = localStorage.getItem('gettoken');
		}
  }

  localpages(){
  	 $("#localpagesSec").modal('show'); 
  }
  myteamsF(){  
    this.getmatchkey = localStorage.getItem('currentmatch'); 
    this.router.navigate(['/myteams'], { queryParams: {getmatchkey: btoa(this.getmatchkey)}}); 
  }
  homepage(){ 
    this.router.navigate(['/home']); 
  }
  invite_friend(){ 
    this.router.navigate(['/invite-friends']); 
  }
  profile(){ 
    this.router.navigate(['/profile']); 
  }
  leaugesf(){ 
    this.getmatchkey = localStorage.getItem('currentmatch'); 
    this.router.navigate(['/joinleauges'], { queryParams: { matchkey: btoa(this.getmatchkey)}});
  }
 
}
