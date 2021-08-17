import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr'; 

declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
	validteamname:any;  
  public upcomingmatches:any;
  public livematches:any;
  public completedmatches:any;
  public loginid:any;
  public varif:any; 
  public moreupcomingmatches:any;
  public allupcomingmatches:any;
  public fulluserdata:any;
  public allseriesmatch:any;
  public matchFilterOption:any;
  public fullload:boolean;
  public banners:any;
	token: string;
  constructor(private router:Router,private http: HttpClientService, 
	private headerService: HeaderService, private loader:LoaderService, 
	private activatedRoute: ActivatedRoute,private commons:CommonService,
	private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService,
	 private authttp: HttpIntercepter,private notification:NotificationService,
	 private authSer:AuthService) {
    this.upcomingmatches = [];
    this.livematches = [];
    this.completedmatches = []; 
    this.moreupcomingmatches = []; 
    this.fulluserdata = []; 
    this.allupcomingmatches = []; 
    this.allseriesmatch = []; 
	this.banners = [];
    this.matchFilterOption = ''; 
      this.varif= {
		  "state":"",
		  "country":"India",
		  "DayOfBirth":"",
		  "MonthOfBirth":"",
		  "YearOfBirth":"",
	  };
    this.loginid="";
	this.fullload = false;
	this.token = localStorage.getItem('gettoken');
	  this.getmatchlist();
     this.notification.getHeaderText('Cricket home');
     this.notification.getSecondMenu('Referfriend');
     this.notification.getFirstMenu('profile');
	//  this.userfulldata();
	//  this.getallseries();
	// this.getallbanners();
	
  }

  ngOnInit() {   
	  if(!(localStorage.getItem('gettoken'))){
		  this.router.navigate(['/login']);
		}
		else{
		  this.loginid = localStorage.getItem('token');
		  this.token = localStorage.getItem('gettoken');
			} 
		
		
		$(".modal-backdrop").removeClass("show");
     	$(".modal-backdrop").removeClass("fade");
	    $(".modal-backdrop").removeClass("modal-backdrop");
	
  }
  
  nodatarightnow(){ 
	this.toastr.error('Contects for this match will be open soon, stay tunes!');
  }
  getallseries(){  
  	this.loader.start(); 
		return this.http.get('api/getallseries'+'?token='+this.token) 
		.subscribe(
		res => { 
		this.loader.stop();  
		if(res[0].status!=0){
		  this.allseriesmatch = res; 
		}else{
		  this.allseriesmatch=[]; 
		}

	  },
	err => {
	   
	});
  }
  getallbanners(){
	   return this.http.get('api/webslider'+'?token='+this.token) 
            .subscribe(
            res => { 
             this.banners = res; 
		
          },
            err => {
               
            });
  }
  logout(){ 
    localStorage.removeItem('token');
    localStorage.removeItem('gettoken');
    localStorage.removeItem('me');
    this.headerService.updateHeader('signup');
    this.router.navigate(['/login']);
  }
  getmatchlist(){ 
  	this.loader.start();
		return this.http.get('getmatchlist')
            .subscribe(
            res => {
				console.log(res)
             this.loader.stop(); 
             this.fullload = true;
             if(res[0].status!=0){
		        this.upcomingmatches = res.filter(function (e) {
		            return e.matchopenstatus == 'opened';
		        });
		        this.allupcomingmatches = res.filter(function (e) {
		            return e.matchopenstatus == 'opened';
		        });
		        this.moreupcomingmatches = res.filter(function (e) {
		            return e.matchopenstatus == 'opened';
		        });
		        this.livematches = res.filter(function (e) {
		            if(e.matchopenstatus=='closed' && (e.winnerstatus=='pending' || e.winnerstatus=='IsReviewed'))
		            {
		              return true;
		            }
		        });
		        this.livematches.sort(function(a,b){
		          var c = new Date(a.time_start);
		          var d = new Date(b.time_start);
		          return (d.getTime() - c.getTime());
		        });
		        this.completedmatches = res.filter(function (e) {
		            if(e.matchopenstatus=='closed' && (e.winnerstatus=='winnerdeclared' || e.winnerstatus=='IsAbandoned' || e.winnerstatus=='IsCanceled'))
		            {
		              return true;
		            }
		        });
		         this.completedmatches.sort(function(a,b){
		          var c = new Date(a.time_start);
		          var d = new Date(b.time_start);
		           return (d.getTime() -c.getTime());
		        });
		      }
	              
            },
            err => {
				console.log(err)
				this.loader.stop();
            });
  }

   matchsort(filtertype){   
     $("#seriessearch").removeClass('bottom-sheet--active'); 
   if(filtertype==""){
	   this.upcomingmatches = this.moreupcomingmatches;
   }else{ 
		this.upcomingmatches = this.allupcomingmatches.filter(function (el) {
		  return el.seriesname == filtertype;
		});
	}
   }
   redirecttochallenge(matchkey,seriesid){  
	 var getmatchkey = btoa(matchkey);
     this.router.navigate(['/join-contest'], { queryParams: { matchkey: getmatchkey}});
  }
  
   redirecttomychallenge(matchkey,seriesid){ 
     var getmatchkey = btoa(matchkey);
     var allcontests = 2;
     this.router.navigate(['/all-contests'], { queryParams: { matchkey: getmatchkey, contest: allcontests}});
  } 
   
  rewardsfun(){	  
	var amountb = 1;
    this.router.navigate(['/my-account'], { queryParams: { amountb: amountb}});
  }
   
	userfulldata(){ 
		this.loginid = localStorage.getItem('token');
		return this.http.get('api/userfulldetails?token='+this.token)
		  .subscribe(
			res => { 
			  this.fulluserdata = res[0];       
			  if (this.fulluserdata.team == '' || this.fulluserdata.state == '' || this.fulluserdata.DayOfBirth == ''|| this.fulluserdata.MonthOfBirth == ''|| this.fulluserdata.YearOfBirth == '') {
					
					$('#check_valid_for_join').modal({					
						backdrop: 'static' 
					});
				 $("#check_valid_for_join").modal('show');
			 
			   }
			},
			err => { 
				if(err.status===400){
					this.authSer.logout();
				}
			}); 
	  }  
	  
  save_valid_for_join(){
	    if(this.varif.country=='India'){		  
			 if(this.varif.state=="" || this.varif.state==undefined){
			  this.toastr.error('State is required');			  
			 }
		else{
			 if(this.varif.DayOfBirth=="" || this.varif.MonthOfBirth=="" || this.varif.YearOfBirth==""){
			  this.toastr.error('Please fill your valid date of birth');
			 }
			 else if(this.varif.team=="" || this.varif.team==undefined){
			  this.toastr.error('Team name is required');
			  return false;
			 }
			 else{
				var teampattern = /^[A-Za-z0-9_]*$/;
				if(this.varif.teamfreeze==0){
				if(!this.varif.team.match(teampattern)){
				  this.toastr.error('Team name can only contain alphanumeric values and team name should be in between 3 to 9 in length.');
				  return false;
				}
				else{
				  if (/[A-Za-z]/.test(this.varif.team) === false){
					this.toastr.error('Team name should contain letters.');
					return false;
				  }
				}
			  if(this.varif.team.length>9){
				this.toastr.error('Team name must be 3 to 9 characters long');
					return false;
			  }
			  if(this.varif.team.length<3){
				this.toastr.error('Team name must be 3 to 9 characters long');
					return false;
			  }
			}
			if(this.validteamname==false){
			  return false;
			}
		  var getDayOfBirth= this.varif.YearOfBirth+"-"+this.varif.MonthOfBirth+"-"+this.varif.DayOfBirth;
		  let formData = new FormData();
		  formData.append('username', this.fulluserdata.username); 
		  formData.append('id', this.loginid); 
		  formData.append('dob', getDayOfBirth); 
		  formData.append('gender', this.fulluserdata.gender); 
		  formData.append('state', this.varif.state); 
		  formData.append('team', this.varif.team); 
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
			  this.toastr.success('Profile has been updated successfully!');
			  this.fulluserdata.teamfreeze = 1;  
			  $("#check_valid_for_join").modal('hide');               
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
		  }
		  else{	 
			
			this.toastr.error('We Will Start Operation In this Country. Now Oprating In India Only.');
		  }
  }
 
   
   seriessearch(){ 
     $("#seriessearch").addClass('bottom-sheet--active'); 
   }  
   resetsearch(){ 
	   this.upcomingmatches = this.moreupcomingmatches;
     $("#seriessearch").removeClass('bottom-sheet--active'); 
   }  
	 
}
