import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  public loginid:any;

   constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {

      this.loginid="";
      this.notification.getHeaderText('Me');
	     this.notification.getSecondMenu('Referfriend');
      this.notification.getFirstMenu('profile');
   

   }

  ngOnInit() {
  }

	logout(){ 
    localStorage.removeItem('token');
    localStorage.removeItem('gettoken');
    localStorage.removeItem('me');
    this.headerService.updateHeader('signup');
    this.router.navigate(['/login']);
	}
}