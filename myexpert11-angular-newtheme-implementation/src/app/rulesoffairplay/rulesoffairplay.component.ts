import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-rulesoffairplay',
  templateUrl: './rulesoffairplay.component.html',
  styleUrls: ['./rulesoffairplay.component.css']
})
export class RulesoffairplayComponent  implements OnInit {

     constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private notification:NotificationService) {

      this.notification.getHeaderText('Rules of FairPlay');
	   

   }

  ngOnInit() {
  }

}
