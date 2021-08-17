import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

	 
  changeform: FormGroup;
 loginid:any; 
	token: string;
  constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {   
       
         this.changeform = fb.group({
         'oldpassword' : ["", [Validators.required]],
         'newpassword' : ["", [Validators.required]],
         'confirmpassword' : ["", [Validators.required]],
         'validate' : ""
         }); 


     this.notification.getFirstMenu('profile');
   if(!(localStorage.getItem('token'))){
      this.router.navigate(['']);
    }
    else{
	  this.loginid = localStorage.getItem('token');
	  this.token = localStorage.getItem('gettoken');
    } 
      this.notification.getHeaderText('Change Password');
		
		}

  ngOnInit() { 
	
  }


	  changepassword(values){

	   var oldpass=values.oldpassword;
		var newpass=values.newpassword;
		var changepass=values.confirmpassword;
		if(newpass!=changepass){
		  this.toastr.error('New Password or Confirm Password does not match. Please check again');
		}
		/*else if (newpass == " " || changepass == " " || confirmpassword == " ") {
		  this.toastr.error('Please fill all fields first');
		}  */
		else{ 
	 		this.loader.start(); 
			this.authttp.get('api/changepassword?loginid='+this.loginid+'&oldpassword='+oldpass+'&newpassword='+newpass+'&token='+this.token)
				.subscribe(
				res => {
				  this.loader.stop(); 
				  if(res==1){ 
					 this.changeform.reset();
					 this.toastr.success('Your password has been successfully Changed.');
		             this.router.navigate(['/profile']);
				  }
				  if(res==0){
					this.toastr.error('Old password does not match.');
				  }
				},
				err => {
					this.toastr.error('Something went wrong. Please try again.');
					this.loader.stop();
		});  
		}
	  }
}