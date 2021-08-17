import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-pointsystem',
  templateUrl: './pointsystem.component.html',
  styleUrls: ['./pointsystem.component.css']
})
export class PointsystemComponent implements OnInit {

  constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) { 
 	 this.notification.getHeaderText('Fantasy Point Stytem');
	   
      $("#localpagesSec").modal('hide'); 

     }

  ngOnInit() {
  }

}
