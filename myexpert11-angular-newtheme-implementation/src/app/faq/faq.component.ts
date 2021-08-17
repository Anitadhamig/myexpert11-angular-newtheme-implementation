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
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

     constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notification:NotificationService) {

      this.notification.getHeaderText('FAQ');
	   

   }

  ngOnInit() {
  }

}
