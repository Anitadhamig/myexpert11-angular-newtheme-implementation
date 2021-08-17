import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html', 
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
 fulluserdata:any; 
 loginid:any; 
 validteamname:any;  
 imgcheck:any;  
 StateID:any;   
 imageview:any;   
  url:any;
  token: string;
 constructor(private router:Router,private authSer:AuthService,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {   
   this.fulluserdata =[];
   this.imageview =[];
   this.fulluserdata.state=""; 
     this.notification.getSecondMenu('Referfriend');
   if(!(localStorage.getItem('token'))){
      this.router.navigate(['']);
    }
    else{
      this.loginid = localStorage.getItem('token');
      this.token = localStorage.getItem('gettoken');
    } 
      this.notification.getHeaderText('My Profile');
   
  } 
  ngOnInit() { 
	  this.userfulldata();  
  }
  checkForTeam(value){
    var teampatterncode = /^[A-Za-z0-9]*$/;
    if(teampatterncode.test(value) == false)
    {
      this.validteamname=false;
      this.fulluserdata.team = value.substr(0, value.length - 1);
    }
    else{
      this.validteamname=true;
    }
  }
 userfulldata()
  {
	      this.loginid = localStorage.getItem('token');
	   		return this.http.get('api/userfulldetails?token='+this.token)
	        .subscribe(
            res => { 
            	this.fulluserdata = res[0];
            },
            err => { if(err.status===400){
					this.authSer.logout();
				}}); 
  } 

   uploadprofile(event:any) {      
      if (event.target.files && event.target.files[0]) {
        this.imageview = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event:any) => {
      this.url = event.target.result; 
    }
    reader.readAsDataURL(event.target.files[0]);
    this.uploadimages();
    }
  }
  uploadimages(){ 
  
	  console.log(this.imageview);

      this.loader.start();
        let formData = new FormData(); 
        formData.append('id', this.loginid);  
        formData.append('file', this.imageview); 
        return this.authttp.post('api/imageUploadUser'+'?token='+this.token,formData)
          .subscribe(
          res => {

           this.loader.stop();
              if(res[0].status=='1')
              { 
                this.toastr.success(res[0].msg);   
                this.userfulldata()             
              }
              else{
                this.toastr.error('Something went wrong');
              }
            },
          err => {
            this.toastr.error('Something went wrong. Please try again.');
            this.loader.stop();
          });
  }
   onKeyTeam(event) {
       var k = (event.which) ? event.which : event.keyCode;
       if (k == 32 || k > 32 && k <= 47 || k >= 58 && k <= 64 || k >= 123 && k <= 8482 || k >= 91 && k <= 95) return false;
       if(k==115) return true;

    }
    alphaOnly(event){
      var key =  (event.which) ? event.which : event.keyCode;
	  return ((key > 64 && key <= 91) || (key > 96 && key < 123) || key == 8 || key == 32);
   };
    onKeyPinNumber(event) {
       var k = (event.which) ? event.which : event.keyCode;
       if (k >= 48 &&  k <= 57){
       	return true;
       }else{
       	return false;
       }

    } 
   updatepro(){
   	     
			
   	     if(this.fulluserdata.DayOfBirth=="" || this.fulluserdata.MonthOfBirth=="" || this.fulluserdata.DayOfBirth==""){
   	     	this.toastr.error('Date of birth is required');
   	     }
   	     else if(this.fulluserdata.team==""){
   	     	this.toastr.error('Team name is required');
   	     }
   	     else if(this.fulluserdata.state==""){
   	     	this.toastr.error('State is required');
   	     }
   	     else{
     	     	var teampattern = /^[A-Za-z0-9_]*$/;
     	     	if(this.fulluserdata.teamfreeze==0){
            if(!this.fulluserdata.team.match(teampattern)) {
     	     		this.toastr.error('Team name can only contain alphanumeric values and team name should be in between 3 to 9 in length.');
     	     		return false;
     	     	}
            else{
     	     		if (/[A-Za-z]/.test(this.fulluserdata.team) === false){
  			        this.toastr.error('Team name should contain letters.');
  			        return false;
  			      }
		      	}
          if(this.fulluserdata.team.length>9){
            this.toastr.error('Team name must be 3 to 9 characters long');
                return false;
          }
          if(this.fulluserdata.team.length<3){
            this.toastr.error('Team name must be 3 to 9 characters long');
                return false;
          }
        }
   	    if(this.validteamname==false){
          return false;
        }
			var getDayOfBirth= this.fulluserdata.YearOfBirth+"-"+this.fulluserdata.MonthOfBirth+"-"+this.fulluserdata.DayOfBirth;
      let formData = new FormData();
      formData.append('username', this.fulluserdata.username); 
      formData.append('id', this.loginid); 
      formData.append('dob', getDayOfBirth); 
      formData.append('gender', this.fulluserdata.gender); 
      formData.append('state', this.fulluserdata.state); 
      formData.append('team', this.fulluserdata.team); 
      this.loader.start();
			return this.authttp.post('api/editprofile'+'?token='+this.token,formData)
			.subscribe(
			res => {
				this.loader.stop();
        if(res[0].status==3){
          this.toastr.error('You cannot use offensive/abusive words in your team name.');
          this.fulluserdata.team="";
        }
				else if(res[0].status==1){
					this.toastr.success(' Successfully Update Profile!');
					this.fulluserdata.teamfreeze = 1; 
				}
        else  if(res[0].status==2){
          this.toastr.error('This team name is already exist.');
        }
				
			},
			err => {			
				this.toastr.error('Something went wrong. Please try again.');
				this.loader.stop();
			});
		}
   }
   
   
	checkemailverify(){	   
		if(this.fulluserdata.email== "" || this.fulluserdata.email== undefined){
			this.router.navigate(['/verify-account']);
		}
	}
	checkemailmobile(){	   
		if(this.fulluserdata.mobile== "0" || this.fulluserdata.mobile== "" || this.fulluserdata.email== undefined){
			this.router.navigate(['/verify-account']);
		}
	}
  

}
