import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
import {DeviceDetectorService} from 'ngx-device-detector';
declare let $: any;

@Component({
  selector: 'app-singleleauge',
  templateUrl: './singleleauge.component.html',
  styleUrls: ['./singleleauge.component.css']
})
export class SingleleaugeComponent implements OnInit {
   public loginid:any;
   public getmatchkey:any;
   public challengeid:any;
   public leaugesinfo:any;
   public joinedteams:any;
   public jointeamlists:any;
   public matchdetails:any;
   public showBtn:any;
   public teamdetails:any;
   public inviteid:any;
   public livescore:any;
   public mteamid:any;
  public invitecode:any; 
  public teamnumber:any; 
  public totalpoints:any; 
  public scorecard:any; 
  public teamname:any; 
  public showteamnumber:any;
  public getchallenges:any;
   rForm: FormGroup;
  public current_score:any;
  isMobMode:boolean=false;
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   constructor(private router:Router,private ddService:DeviceDetectorService,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notification:NotificationService) {
   		this.loginid="";
      this.getmatchkey=""; 
   		this.mteamid="";
   		this.challengeid="";
      this.leaugesinfo=[];
      this.livescore=[];
      this.getchallenges=[];
      this.scorecard=[];
      this.totalpoints=[];
      this.joinedteams="";
   		this.teamnumber=""; 
      this.matchdetails=[]; 
      this.jointeamlists=[];
      this.teamdetails="";
      this.inviteid="";
      this.current_score=[];
      this.teamname="";
      this.invitecode="";
      this.showBtn=-1;
      

      this.rForm = fb.group({
          'email' : ["", [Validators.required]],
          'invitetext':[""]
      });

   		if(!(localStorage.getItem('token'))){
	        this.router.navigate(['']);
	    }
	    else{
	       this.loginid = localStorage.getItem('token');
	    }
	    this.activatedRoute.queryParams.subscribe(params => {
              this.getmatchkey = atob(params['match']);
              this.challengeid = atob(params['lid']);

        });
        this.isMobMode=this.ddService.isMobile();
        localStorage.setItem('currentmatch',this.getmatchkey);
        this.notification.getHeaderText('Contest Info');
        this.notification.getFirstMenu('myteams');
        this.notification.getSecondMenu(''); 
        this.findjointeam(this.loginid,this.getmatchkey); 
        this.findchallenges();
        this.livescores();
        this.machdetail();
        this.aboutleauge();
        this.scorecardshow();
        this.scoreshow();
        // this.joinedteam();
    }

  ngOnInit() {  
  }

   scoreshow(){ 
	    this.authttp.get('api/getlivescores?matchkey='+this.getmatchkey)
  .subscribe(
    res => {   
        if(res[0].status!=0){
        this.current_score = res[0];  
        console.log(this.current_score);
        }else{
        this.current_score=[];
        }
       this.loader.stop();
      }, err => {});
  }
   
  back_button(){ 
		window.history.back();
	}
  findchallenges(){ 
    this.loader.start(); 
    this.authttp.get('api/getContests?matchkey='+this.getmatchkey+'&userid='+this.loginid)
    .subscribe(
      res => { 
        if(res[0].status!=0){
        this.getchallenges = res;  
        }else{
        this.getchallenges=[];
        }
       this.loader.stop();
      },
      err => { });
   }
  machdetail(){
    let formData = new FormData();
    formData.append('matchkey', this.getmatchkey);  
    this.authttp.post('api/getmatchdetails',formData) 
  .subscribe(
    res => { 
        this.matchdetails = res; 
        // console.log(this.matchdetails);
      }, err => {});
  }
  livescores(){  
    this.loader.start(); 
    this.authttp.get('api/livescores?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&challengeid='+this.challengeid)
    .subscribe(
      res => {  
        if(res[0].status!=0){
        this.livescore = res;  
        console.log(this.livescore); 
        }else{
        this.livescore=[];
        }
       this.loader.stop();
      },
      err => { });
   } 
   checkleaderboard(){	  
      this.toastr.error('Please wait.. Pdf is not created yet!');
   }
  aboutleauge(){
    this.loader.start(); 
    this.authttp.get('api/leaugesdetails?userid='+this.loginid+'&challengeid='+this.challengeid+'&matchkey='+this.getmatchkey)
    .subscribe(
      res => { 
        this.leaugesinfo = res;    
        // console.log(this.leaugesinfo);
        this.loader.stop();
      },
      err => { });
  }
  totalwins(i){ 
     $("#winnner-rank"+i).addClass('active'); 
   } 
   totalwinsclose(i){   
     $("#winnner-rank"+i).removeClass('active'); 
       $('.em_bottom_sheet').click( function(event){
        event.stopPropagation(); 
      });
   }
  // joinedteam(){
  //   this.loader.start();
  // 	let formData = new FormData();
  // 	formData.append('matchkey', this.getmatchkey);
  // 	formData.append('challengeid', this.challengeid);
  // 	formData.append('userid', this.loginid);
  // 	this.authttp.get('api/livescores?userid='+this.loginid+'&challengeid='+this.challengeid+'&matchkey='+this.getmatchkey)
  //   .subscribe(
  //     res => { 
  //     	this.joinedteams = res[0].jointeams;  
  //       this.loader.stop();
  //     },
  //     err => { });
  // }
    showUndoBtn(index){
      this.showBtn=index; 
	}
  findObjIndexInArray(key, value, array) {
    var index = array.findIndex(function (elem) {
      return elem[key] == value;
    })
    return index
  }   
   updateteam(teamid,challenge_id,joinid){  
      var getteamid = $("#teamselectedid"+teamid).val();
      this.loader.start();
      let formData = new FormData();
      formData.append('matchkey', this.getmatchkey);
      formData.append('challenge_id', challenge_id);
      formData.append('teamid', getteamid);
      formData.append('joinid', joinid);
      formData.append('userid', this.loginid);
      this.authttp.post('api/switchteams',formData) .subscribe(res => {
         this.loader.stop();
        if(res[0].status=='0'){

          this.toastr.error(res[0].msg);
          this.showBtn=-1;
        }
        else if(res[0].status=='1'){
          this.toastr.success(res[0].msg);
          this.showBtn=-1;
          this.aboutleauge();
          this.leaugesinfo[0].myjointeams[this.findObjIndexInArray('joinid', joinid, this.leaugesinfo[0].myjointeams)].teamid = getteamid;
          this.leaugesinfo[0].myjointeams[this.findObjIndexInArray('joinid', joinid, this.leaugesinfo[0].myjointeams)].teamnumber = res[0].teamnumber;
        
        }
      },
      err => { });
  }
  closeswitch(){
          this.showBtn=-1;	  
  }
   findjointeam(userid,matchkey){  
      this.http.get('api/getMyTeams?userid='+this.loginid+'&matchkey='+matchkey) 
     .subscribe(res => { 
           this.jointeamlists=res;  
       },err => {});
  
  } 
  editteams(teamid){   
    this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(teamid),editteam:1}});  
  } 


invitethischallenge(challengeid,matchkey){
    
    this.loader.start();
    this.http.get('api/refercodechallenege?matchkey='+matchkey+'&userid='+this.loginid+'&challengeid='+challengeid) .subscribe(res => {
		this.invitecode = res[0].refercode;
		this.inviteid = res[0].id;
		console.log('invite code'+this.invitecode);
		$("#sharemodal").modal('show');
        this.loader.stop();
      },
      err => { });
    
  }
  
	joincontest(entryfee,getchallengeid)  { 
        localStorage.setItem('getchallengeid', getchallengeid);
        localStorage.setItem('entryfee', entryfee); 
		var matchsrt = '1';
		this.router.navigate(['/join-contest'], { queryParams: { matchkey: btoa(this.getmatchkey), matchsrt: matchsrt}}); 
	}  

 sendinvite(value){
      var emailsuccess=0;
    var emailpattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if((value.email !="")){
      if((emailpattern.test(value.email) == false)){
        emailsuccess=0;
        this.toastr.error('Invalid email id.');
      }else{
        emailsuccess =1;
      }
    }else{
      emailsuccess =0;
    }
    if(emailsuccess==1){
        this.loader.start();
        this.http.get('api/sendinvite?email='+value.email+'&invitetext='+value.invitetext+'&id='+this.inviteid) .subscribe(res => {
          if(res[0].status==1){
               $("#shareviaemailmodal").modal('hide');
                 this.toastr.success("Your invitation has been sent successfully."); 
             }
             if(res[0].status==0){
               this.toastr.error("You cannot send invite to yourself.");
             }
             this.rForm.reset();
             this.loader.stop();
          },
          err => { });

      } 
  }

	 

  showteam(teamid,teamnumber,teamname,userid,points){ 
    if(this.matchdetails[0].matchstatus=='notstarted' && userid != this.loginid ){
       this.toastr.error("Please wait! Match has not started yet.");
        return false
    }
    else{ 
    this.totalpoints = points;
    this.mteamid = teamid;
    this.teamname = teamname;
     this.showteamnumber = teamnumber;
     this.loader.start();
       this.http.get('api/viewteamweb?userid='+userid+'&teamnumber='+teamnumber+'&matchkey='+this.getmatchkey) 
     .subscribe(
     res => { 
      this.loader.stop();
    this.teamdetails=res.bowler; 
    $("#team-preview").toggleClass('slide_left'); 
       },err => {});
   }
  }

  closeteampreview(){
    $("#team-preview").toggleClass('slide_left'); 
  }
  
  completescore(){ 
		$("#pointSystem").addClass('active'); 
  }
  closecompletescore(){
		$("#pointSystem").removeClass('active'); 
  }
  
  
  scorecardshow(){ 
    this.authttp.get('api/fantasyscorecards?matchkey='+this.getmatchkey)
    .subscribe(
      res => { 
        this.scorecard = res;   
		console.log(this.scorecard);
      },
      err => { });
  }
  
}
