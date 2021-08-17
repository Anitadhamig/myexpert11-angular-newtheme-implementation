import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-auto-support',
  templateUrl: './auto-support.component.html',
  styleUrls: ['./auto-support.component.css']
})
export class AutoSupportComponent implements OnInit { 
  public loginid:any;
  public autosupport:any;
  token: string;
   constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {
 
      this.autosupport="";
      this.loginid="";
      this.notification.getHeaderText('Quick Support'); 
 
      if(!(localStorage.getItem('token'))){
        this.router.navigate(['']);
      }
      else{
       this.loginid = localStorage.getItem('token');
       this.token = localStorage.getItem('gettoken');
      } 
      $("#localpagesSec").modal('hide'); 
		this.auto_support();
   }

  ngOnInit() {
  }

   auto_support()  {  
      return this.http.get('api/auto_support'+'?token='+this.token)
    .subscribe(
    res => {
      this.autosupport = res[0].auto_support;  
    },
    err => { });
  }
}