import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public notification_data:any; 

  constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) { 
      this.notification_data=[];
 	
 	this.Allnotifications();
      this.notification.getHeaderText('Notifications');
    this.notification.getSecondMenu('Referfriend');
      this.notification.getFirstMenu('profile');

	 }

  ngOnInit() {
  }
 


  Allnotifications(){  
    this.loader.start();
    let token=localStorage.getItem('gettoken'); 
    this.authttp.get('api/notifications'+'?token='+token)
    .subscribe(
      res => { 
        if(res[0].status==1){
         this.notification_data = res;  
        }else{
          this.notification_data=[];
        }
       this.loader.stop();
      },
      err => { }); 
   }
 
}
