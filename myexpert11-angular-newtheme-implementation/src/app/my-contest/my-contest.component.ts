import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr'; 

declare let $: any;
@Component({
  selector: 'app-my-contest',
  templateUrl: './my-contest.component.html',
  styleUrls: ['./my-contest.component.css']
})
export class MyContestComponent implements OnInit {
 
   validteamname:any;  
  public upcomingmatches:any;
  public livematches:any;
  public completedmatches:any;
  public loginid:any;
  public varif:any;  
  public fullload:boolean;
  constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService) {
    this.upcomingmatches = [];
    this.livematches = [];
    this.completedmatches = [];  
      this.varif=[];
    this.loginid="";
    this.fullload = false;
	  this.getmatchlist();
     this.notification.getHeaderText('My contests');
     this.notification.getSecondMenu('Referfriend');
     this.notification.getFirstMenu('profile'); 
	
  }

  ngOnInit() {   
	  if(!(localStorage.getItem('token'))){
		  // this.router.navigate(['/login']);
        this.router.navigate(['/index']);
		}
		else{
		  this.loginid = localStorage.getItem('token');
		} 
		 
  }
  getmatchlist(){ 
    this.loginid = localStorage.getItem('token');
    let token = localStorage.getItem('gettoken');
  	this.loader.start(); 
		return this.http.get('api/joinedmatches?userid='+this.loginid+'&token='+token) 
            .subscribe(
            res => {
             this.loader.stop();
			 // console.log(res);
             this.fullload = true;
             if(res[0].available_status!=0){ 
		        this.upcomingmatches = res.filter(function (e) {
		        	return e.status == 'opened'; 
		        });  
		        this.upcomingmatches.sort(function(a,b){
		          var c = new Date(a.start_date);
		          var d = new Date(b.start_date);
		          return (c.getTime() - d.getTime());
		        }); 
		        this.livematches = res.filter(function (e) {
		            if(e.status=='closed' && (e.final_status=='pending' || e.final_status=='IsReviewed'))
		            { 
		           	   return true;
		            }
		        }); 
		        this.completedmatches = res.filter(function (e) {
		            if(e.status=='closed' && (e.final_status=='winnerdeclared' || e.final_status=='IsAbandoned' || e.winnerstatus=='IsCanceled'))
		            {
		              return true;
		            }
		        });
		      }
	              
            },
            err => {
               
            });
  }

   redirecttoallchallenge(matchkey,seriesid){ 
     var getmatchkey = btoa(matchkey);
     var allcontests = 2;
     this.router.navigate(['/all-contests'], { queryParams: { matchkey: getmatchkey, contest: allcontests}});
  } 
  redirecttomychallenge(matchkey,seriesid){ 
   var gmatchkey = btoa(matchkey);
   var gseriesid = btoa(seriesid);
    this.router.navigate(['/livematches'], { queryParams: { matchkey: gmatchkey,series:gseriesid}});
  } 
  
    
   
	 
}
