import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config'; 
 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NotificationService, HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
import {DeviceDetectorService} from 'ngx-device-detector';
declare let $: any;

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {
  public getmatchkey:any;
  public loginid:any;
  public jointeamnumbers:any;
  public jointeamlists:any;
  public matchdetails:any; 
  public getteamnumberex:any;
  public getteamnumber:any;
  public teamdetails:any;
  public jointeampreview:any;
  public myteamnumberget:any; 
  public showteamnumber:any;
  public teamid:any; 
  public teamnumber:any;
  public playerlist:any;
  public team1player:any;
  public team2player:any;
  public batl:any;
  public wkl:any;
  public boll:any;
  public alll:any;
  public vicecapname:any;
  public capname:any;
  public played:any;
  public notplayed:any;
  public vicecapimage:any;
  public capimage:any;
  token: string;
  isMobMode:boolean=false;
  constructor(private notification:NotificationService, 
    private router:Router,private http: HttpClientService, 
    private headerService: HeaderService, private loader:LoaderService,
     private activatedRoute: ActivatedRoute,private commons:CommonService,
     private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService,
      private elementRef: ElementRef, private renderer: Renderer2, 
      private authttp: HttpIntercepter, 
      private ddService:DeviceDetectorService
      ) { 
     this.team1player=[];
     this.team2player=[];
     this.batl=[];
     this.wkl=[];
     this.boll=[];
     this.alll=[];
     this.jointeamnumbers=[];
    this.jointeamlists = [];
    this.playerlist = [];
    this.teamid = [];
    this.teamnumber = [];
  	this.matchdetails = [];
  	this.getteamnumber = ""; 
	this.showteamnumber="";
	this.capname="";
	this.vicecapname="";
	this.played="";
	this.notplayed="";
	this.vicecapimage="";
	this.capimage="";
    this.jointeampreview = [];
    this.teamdetails = [];
	if(!(localStorage.getItem('token'))){
	  this.router.navigate(['']);
	}
	else{
    this.loginid = localStorage.getItem('token');
    this.token = localStorage.getItem('gettoken');
	} 
	this.activatedRoute.queryParams.subscribe(params => { 
            this.getmatchkey = atob(params['getmatchkey']); 
          this.findjointeam(this.loginid,this.getmatchkey); 
      });
	  
      this.notification.getHeaderText('My Teams');
      this.notification.getFirstMenu('leauges');
      this.notification.getSecondMenu('');
      this.isMobMode=this.ddService.isMobile();
      this.machdetail();       
	} 

  ngOnInit() {  
	  $(".modal-backdrop").removeClass("show");
	  $(".modal-backdrop").removeClass("fade");
	  $(".modal-backdrop").removeClass("modal-backdrop");
  }
    findjointeam(userid,matchkey){
	  this.loader.start();
      this.http.get('api/viewmyteams?userid='+this.loginid+'&matchkey='+matchkey+'&token='+this.token) 
	   .subscribe(res => {
           this.loader.stop();
           this.jointeamlists=res;
           
        // if(res[0].status!=0){
           // this.jointeamlists=res;
		   // console.log();
		   // this.playerlist = this.jointeamlists[0].player;
		    
			// this.team1player = this.playerlist.filter(function (e) {
				// return e.team == 'team1';
			// });
			// this.team2player = this.playerlist.filter(function (e) {
				// return e.team == 'team2';
			// });
			// this.wkl = this.playerlist.filter(function (e) {
				// return e.role == 'keeper';
			// });
		   
			// this.alll = this.playerlist.filter(function (e) {
				// return e.role == 'allrounder';
			// });
			   
			// this.boll = this.playerlist.filter(function (e) {
				// return e.role == 'bowler';
			// });
			// this.batl = this.playerlist.filter(function (e) {
				// return e.role == 'batsman';
			// });
		   // for(var i = 0; i<=this.playerlist.length; i++){
			   // if(this.playerlist[i].captain == 1){
				   // this.capname = this.playerlist[i].name;
				   // this.capimage = this.playerlist[i].image;
			   // }
			   // if(this.playerlist[i].vicecaptain == 1){
				   // this.vicecapname = this.playerlist[i].name;
				   // this.vicecapimage = this.playerlist[i].image;
			   // } 
			   // if(this.playerlist[i].playingstatus == 0){
				   // this.notplayed = this.playerlist[i].playingstatus;
			   // } 
			   // if(this.playerlist[i].playingstatus == 1){
				   // this.played = this.playerlist[i].playingstatus;
			   // } 
		 // }
		   
		   
           // console.log(this.playerlist);
           // this.getteamnumber= res.length+1;
        // }else{
        // this.matchdetails=[];
        // }
       },err => {});
  
  }
   
  myteamSingle(teamid,teamnumber){
	   this.showteamnumber = teamnumber;
	   this.loader.start();
       this.http.get('api/viewteamweb?userid='+this.loginid+'&teamnumber='+teamnumber+'&matchkey='+this.getmatchkey+'&token='+this.token) 
	   .subscribe(
	   res => { 
	    this.loader.stop();
		this.teamdetails=res.bowler; 
       console.log(this.teamdetails);
	  $("#team-preview").toggleClass('slide_left');
    this.teamid=teamid;
    this.teamnumber=teamnumber;
       },err => {});
  }
	editteam(teamid){   
		this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(teamid),editteam:1}});
	
  }  
  closeteampreview(){
    $("#team-preview").toggleClass('slide_left'); 
  }
  cloneteam(teamid,teamnumber){
    this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey), uteamid:btoa(teamid), cloneid:teamnumber}});
  }
  back_button(){ 
    window.history.back();
  }
	create_team(){ 
            this.getteamnumberex = this.jointeamlists.length + 1;
         	this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumberex)}});
	} 
  machdetail(){
    let formData = new FormData();
    formData.append('matchkey', this.getmatchkey);  
    this.authttp.post('api/getmatchdetails'+'?token='+this.token,formData) 
  .subscribe(
    res => { 
        if(res[0].status!=0){
        this.matchdetails = res[0];
        }else{
        this.matchdetails=[];
        }
       this.loader.stop();
      }, err => {});
  }


}
