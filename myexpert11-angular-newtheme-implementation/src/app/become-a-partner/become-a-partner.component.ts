 
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.css']
})
export class BecomeAPartnerComponent implements OnInit {

  public loginid:any;
  public fulluserdata:any;
  token: string;

   constructor(private router:Router,private authSer:AuthService,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {

      this.loginid="";
      this.fulluserdata = [];
      this.notification.getHeaderText('Become a Partner');
	    this.notification.getSecondMenu('Referfriend');
      this.notification.getFirstMenu('profile');
      // if(!(localStorage.getItem('token'))){
      //   this.router.navigate(['/login']);
      // }
      // else{
      //  this.loginid = localStorage.getItem('token');
      //  this.token = localStorage.getItem('gettoken');
      // } 
      //  this.userfulldata();
     
   }

  ngOnInit() {
  }

 userfulldata()
  {
        this.loginid = localStorage.getItem('token');
        return this.http.get('api/userfulldetails?&token='+this.token)
          .subscribe(
            res => { 
              this.fulluserdata = res[0];
            },
            err => { if(err.status===400){
					this.authSer.logout();
				}}); 
  } 

  partnerform(){ 
   	  if(this.fulluserdata.DayOfBirth=="" || this.fulluserdata.MonthOfBirth=="" || this.fulluserdata.DayOfBirth==""){
   	    this.toastr.error('Date of birth is required');
   	  }
	  var getDayOfBirth= this.fulluserdata.YearOfBirth+"-"+this.fulluserdata.MonthOfBirth+"-"+this.fulluserdata.DayOfBirth;
      let formData = new FormData();
      formData.append('companyname', this.fulluserdata.company);  
      formData.append('address', this.fulluserdata.address); 
      formData.append('city', this.fulluserdata.city); 
      formData.append('state', this.fulluserdata.state); 
      formData.append('pincode', this.fulluserdata.pincode); 
      formData.append('country', this.fulluserdata.country);  
      formData.append('dob', getDayOfBirth); 
      formData.append('description', this.fulluserdata.discription); 
      formData.append('website', this.fulluserdata.website); 
      formData.append('facebook', this.fulluserdata.facebook); 
      formData.append('twitter', this.fulluserdata.twitter); 
      formData.append('youtube', this.fulluserdata.youtube); 
      formData.append('instagram', this.fulluserdata.instagram);  
      formData.append('userid', this.loginid);  
      this.loader.start();
      return this.authttp.post('api/becomeapartner'+'?token='+this.token,formData)
      .subscribe(
      res => { 
        this.loader.stop();  
        if(res[0].status==1){
          this.toastr.success(res[0].msg); 
		      this.fulluserdata.website = "";
			  this.fulluserdata.facebook = "";
			  this.fulluserdata.youtube = "";
			  this.fulluserdata.twitter = "";
			  this.fulluserdata.instagram = "";
			  this.fulluserdata.address = "";
			  this.fulluserdata.company = "";
			  this.fulluserdata.city = "";
			  this.fulluserdata.state = "";
			  this.fulluserdata.pincode = "";
			  this.fulluserdata.country = "";
			  this.fulluserdata.YearOfBirth = "";
			  this.fulluserdata.MonthOfBirth = "";
			  this.fulluserdata.DayOfBirth = "";
			  this.fulluserdata.discription = "";
        }  
        if(res[0].status==2){
          this.toastr.success(res[0].msg); 
		      this.fulluserdata.website = "";
			  this.fulluserdata.facebook = "";
			  this.fulluserdata.youtube = "";
			  this.fulluserdata.twitter = "";
			  this.fulluserdata.instagram = "";
			  this.fulluserdata.address = "";
			  this.fulluserdata.company = "";
			  this.fulluserdata.city = "";
			  this.fulluserdata.state = "";
			  this.fulluserdata.pincode = "";
			  this.fulluserdata.country = "";
			  this.fulluserdata.YearOfBirth = "";
			  this.fulluserdata.MonthOfBirth = "";
			  this.fulluserdata.DayOfBirth = "";
			  this.fulluserdata.discription = "";
        }
		
        else  if(res[0].status==0){
          this.toastr.success(res[0].msg);  
		      this.fulluserdata.website = "";
			  this.fulluserdata.facebook = "";
			  this.fulluserdata.youtube = "";
			  this.fulluserdata.twitter = "";
			  this.fulluserdata.instagram = "";
			  this.fulluserdata.address = "";
			  this.fulluserdata.company = "";
			  this.fulluserdata.city = "";
			  this.fulluserdata.state = "";
			  this.fulluserdata.pincode = "";
			  this.fulluserdata.country = "";
			  this.fulluserdata.YearOfBirth = "";
			  this.fulluserdata.MonthOfBirth = "";
			  this.fulluserdata.DayOfBirth = "";
			  this.fulluserdata.discription = "";
        }
        
      },
      err => {      
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
    } 
   
}