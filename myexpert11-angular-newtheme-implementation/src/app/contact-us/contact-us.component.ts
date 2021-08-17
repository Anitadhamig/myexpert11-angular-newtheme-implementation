import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {  
  public feedbackform:any;
  public emailpattern:any;
  public mobpattern:any;
   constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {
 
    this.emailpattern = [];
    this.mobpattern = [];
    this.feedbackform = {
		'name': '',
		'email': '',
		'mobile': '',
		'subject': '',
		'message': '',
		'region': '',
		'teamname': '',  
	};
	
	
      this.notification.getHeaderText('Contact Us'); 
   

   }

  ngOnInit() {
  }
  
  submitForm(){
	
			this.emailpattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
  			console.log(this.feedbackform);
  			if(this.feedbackform.name==""){
					return this.toastr.error('Please Fill Username');
				} 
  			else if(this.feedbackform.email==""){ 
				this.toastr.error('Please Fill Email Address');
				return false; 
  			} 
			 else if(this.emailpattern.test(this.feedbackform.email) == false){ 
					this.toastr.error('Please enter valid Email Address'); 
					return false;  
  			} 
  			else if(this.feedbackform.subject==""){
				this.toastr.error('Please Fill Subject');
				return false; 
  			} 
  			else if(this.feedbackform.region==""){
				this.toastr.error('Please Select What are you contacting us about?');
				return false; 
  			}  
			else{ 
					let formData = new FormData();
					formData.append('name', this.feedbackform.name);  
					formData.append('email', this.feedbackform.email); 
					formData.append('mobile', this.feedbackform.mobile); 
					formData.append('subject', this.feedbackform.subject); 
					formData.append('message', this.feedbackform.message); 
					formData.append('region', this.feedbackform.region);  
					formData.append('teamname', this.feedbackform.teamname);   
					  this.loader.start();
						let token = localStorage.getItem('gettoken');
					  return this.authttp.post('api/contact'+'?token='+token,formData)
					  .subscribe(
					  res => {
						this.loader.stop();  
						console.log(res);
						if(res[0].status==1){
							$('#feedbackform').modal('hide');
							this.toastr.success(res[0].message); 
							this.feedbackform.name = '';
							this.feedbackform.email = '';
							this.feedbackform.mobile = '';
							this.feedbackform.subject = ''; 
							this.feedbackform.message = ''; 
							this.feedbackform.region = ''; 
							this.feedbackform.teamname = '';  
						}
						else  if(res[0].status==0){
						  this.toastr.error(res[0].message);
						}
						
					  },
					  err => {      
						this.toastr.error('Something went wrong. Please try again.');
						this.loader.stop();
					  }); 
			  
			}
	  
  }

}