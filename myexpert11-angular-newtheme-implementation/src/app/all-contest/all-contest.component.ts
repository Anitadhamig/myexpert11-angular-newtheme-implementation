import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
// import { timeStamp } from 'console';
declare let $: any;
@Component({
  selector: 'app-all-contest',
  templateUrl: './all-contest.component.html',
  styleUrls: ['./all-contest.component.css']
})
export class AllContestComponent implements OnInit {
 
  rForm: FormGroup;
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
 validteamname:any;  
  public loginid:any;
  public allcontests:any; 
  public scorecard:any; 
  public getteamnumberex:any;  
  public jointeamlists:any; 
  public matchdetails:any; 
  public allmychallenges:any; 
  public getmatchkey:any; 
  public joinedcontest:any; 
  public getseriesid:any;  
  public getchallengeid:any;  
  public entryfee:any;   
  public challengesFilterOption: any;
  public getchallenges:any;   
  public reamincontest:any;   
  public usablebalance:any;   
  public balance:any;   
  public getteamnumber:any;  
	public alloffer: any;
	public allofferbonus: any;
	public allofferbonusfind: any;
	public allofferbonusone: any;
	public allofferbonustwo: any;
	public allofferbonusthree: any;
	public finaladdamount: any; 
	public user: any; 
	public category: any; 
	public selectedteam: any; 
	public invitecode: any; 
	public inviteid: any; 
  public entryfeefilter:any;
  public winningsfilter:any;
  public teamsfilter:any;
  public winnersfilter:any;
  public ordertype:any;
  public current_score:any;
  token: string;
  constructor(private router:Router,private http: HttpClientService,
     private headerService: HeaderService, private authttp: HttpIntercepter, 
     private loader:LoaderService, private activatedRoute: ActivatedRoute,
     private commons:CommonService,private toastr: ToastrService,
     private fb: FormBuilder,private auth: ManualAuthService, 
     private elementRef: ElementRef, private renderer: Renderer2,
      private notification:NotificationService) {
      this.ordertype='asc';
      this.loginid="";  
      this.allcontests=""; 
      this.getmatchkey=""; 
      this.getteamnumberex="";
      this.getseriesid=""; 
      this.jointeamlists=[];
      this.matchdetails=[]; 
      this.getchallengeid=[]; 
      this.entryfee=[]; 
      this.getchallenges=[]; 
      this.getteamnumber=[]; 
      this.scorecard=[]; 
      this.reamincontest=[];  
      this.allmychallenges=[];
      this.joinedcontest=[];
      this.usablebalance=[];
      this.balance=[];
      this.selectedteam=[];
      this.current_score=[];
      this.entryfeefilter= ''; 
      this.winningsfilter= '';
      this.teamsfilter= '';
      this.winnersfilter= '';  
    this.challengesFilterOption = {
      entryfee:"",
      maximum_user:"",
      win_amount:""
    };
      this.user = {
          "balance": 0,
          'payfrom': 'payu' 
      };
      this.allofferbonus={ 
        'balance': 0
      }
        this.allofferbonusfind = [];
        this.allofferbonusone = [];
        this.allofferbonustwo = [];
        this.allofferbonusthree = [];
        this.finaladdamount = [];
        this.category = [];
        this.selectedteam = [];
        this.invitecode = [];
        this.inviteid = [];
      if(!(localStorage.getItem('token'))){
        this.router.navigate(['']);
      }
      else{
       this.loginid = localStorage.getItem('token');
       this.token = localStorage.getItem('gettoken');
       } 
      this.activatedRoute.queryParams.subscribe(params => {
              this.getmatchkey = atob(params['matchkey']);
              this.getseriesid = params['series'];
              this.allcontests = params['contest'];
              this.category = params['category'];
              this.getchallengeid = params['getchallengeid'];
              this.findchallenges();
        });
   
      this.rForm = fb.group({
          'email' : ["", [Validators.required]],
          'invitetext':[""]
      });

      
      this.findjointeam(this.loginid,this.getmatchkey);  
      localStorage.setItem('currentmatch',this.getmatchkey);
      this.machdetail();  
      this.findchallenges();
      if(this.allcontests=='1'){
        this.notification.getHeaderText('All Contests');        
      }
      if(this.allcontests=='2'){
        this.notification.getHeaderText('My contests');      
      }
      if(this.allcontests=='3'){
        this.notification.getHeaderText('Contests');
      }  

      this.alloffers();
      this.staticbonusone();
      this.staticbonustwo();
      this.staticbonusthree(); 
      this.scorecardshow(); 
      this.scoreshow(); 



      
}

  ngOnInit() {  
    if((localStorage.getItem('getchallengeid')) && (localStorage.getItem('entryfee'))){
        this.getchallengeid = localStorage.getItem('getchallengeid');
        this.entryfee = localStorage.getItem('entryfee'); 
        if (this.getchallengeid != '' || this.entryfee != '') { 
            this.firstcheckprofle(this.entryfee,this.getchallengeid)          
            localStorage.removeItem('getchallengeid');
            localStorage.removeItem('entryfee');
        } 
      }
  }
   
  back_button(){ 
		window.history.back();
	}
    
   sortoptions(filtertype){
      if(filtertype=='entryfee'){
        if(this.ordertype=='asc'){
          this.getchallenges.sort(function(a, b) {
            return a.entryfee - b.entryfee;
          });
          this.ordertype= 'desc';
        this.entryfeefilter = '1';
        this.winningsfilter = '';
        this.winnersfilter = '';
        this.teamsfilter = '';
        }
        else{
          this.getchallenges.sort(function(a, b) {
            return b.entryfee - a.entryfee;
          });
          this.ordertype= 'asc';
        this.entryfeefilter = '0';
        this.winningsfilter = '';
        this.winnersfilter = '';
        this.teamsfilter = '';
        }
      }
      if(filtertype=='win_amount'){
         if(this.ordertype=='asc'){
            this.getchallenges.sort(function(a, b) {
                return a.win_amount - b.win_amount;
            });
            this.ordertype= 'desc';
            this.entryfeefilter = '';
            this.winningsfilter = '1';
            this.winnersfilter = '';
            this.teamsfilter = '';
          }else{
            this.getchallenges.sort(function(a, b) {
                return b.win_amount - a.win_amount;
            });
            this.ordertype= 'asc';
            this.entryfeefilter = '';
            this.winningsfilter = '0';
            this.winnersfilter = '';
            this.teamsfilter = '';
          }
      }
      if(filtertype=='totalwinners'){
        if(this.ordertype=='asc'){
          this.getchallenges.sort(function(a, b) {
              return a.totalwinners - b.totalwinners;
          }); 
          this.ordertype= 'desc';
          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '1';
          this.teamsfilter = '';
        }else{
            this.getchallenges.sort(function(a, b) {
              return b.totalwinners - a.totalwinners;
            }); 
          this.ordertype= 'asc';
          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '0';
          this.teamsfilter = '';
        }
      }
      if(filtertype=='maximum_user'){
        if(this.ordertype=='asc'){
          this.getchallenges.sort(function(a, b) {
              return a.maximum_user - b.maximum_user;
          }); 
          this.ordertype= 'desc';

          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '';
          this.teamsfilter = '1';
        }else{
          this.getchallenges.sort(function(a, b) {
              return b.maximum_user - a.maximum_user;
          }); 
          this.ordertype= 'asc';

          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '';
          this.teamsfilter = '0';
        }
      }
          
   }
   sortoptions1(filtertype){
      if(filtertype=='entryfee'){
        if(this.ordertype=='asc'){
          this.reamincontest.sort(function(a, b) {
            return a.entryfee - b.entryfee;
          });
          this.ordertype= 'desc';
        this.entryfeefilter = '1';
        this.winningsfilter = '';
        this.winnersfilter = '';
        this.teamsfilter = '';
        }
        else{
          this.reamincontest.sort(function(a, b) {
            return b.entryfee - a.entryfee;
          });
          this.ordertype= 'asc';
        this.entryfeefilter = '0';
        this.winningsfilter = '';
        this.winnersfilter = '';
        this.teamsfilter = '';
        }
      }
      if(filtertype=='win_amount'){
         if(this.ordertype=='asc'){
            this.reamincontest.sort(function(a, b) {
                return a.win_amount - b.win_amount;
            });
            this.ordertype= 'desc';
            this.entryfeefilter = '';
            this.winningsfilter = '1';
            this.winnersfilter = '';
            this.teamsfilter = '';
          }else{
            this.reamincontest.sort(function(a, b) {
                return b.win_amount - a.win_amount;
            });
            this.ordertype= 'asc';
            this.entryfeefilter = '';
            this.winningsfilter = '0';
            this.winnersfilter = '';
            this.teamsfilter = '';
          }
      }
      if(filtertype=='totalwinners'){
        if(this.ordertype=='asc'){
          this.reamincontest.sort(function(a, b) {
              return a.totalwinners - b.totalwinners;
          }); 
          this.ordertype= 'desc';
          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '1';
          this.teamsfilter = '';
        }else{
            this.reamincontest.sort(function(a, b) {
              return b.totalwinners - a.totalwinners;
            }); 
          this.ordertype= 'asc';
          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '0';
          this.teamsfilter = '';
        }
      }
      if(filtertype=='maximum_user'){
        if(this.ordertype=='asc'){
          this.reamincontest.sort(function(a, b) {
              return a.maximum_user - b.maximum_user;
          }); 
          this.ordertype= 'desc';

          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '';
          this.teamsfilter = '1';
        }else{
          this.reamincontest.sort(function(a, b) {
              return b.maximum_user - a.maximum_user;
          }); 
          this.ordertype= 'asc';

          this.entryfeefilter = '';
          this.winningsfilter = '';
          this.winnersfilter = '';
          this.teamsfilter = '0';
        }
      }
          
   }
   machdetail(){
    let formData = new FormData();
    formData.append('matchkey', this.getmatchkey);  
    this.authttp.post('api/getmatchdetails'+'?token='+this.token,formData) 
  .subscribe(
    res => { 
        if(res[0].status!=0){
        this.matchdetails = res;  
        // console.log(this.matchdetails);
        }else{
        this.matchdetails=[];
        }
       this.loader.stop();
      }, err => {});
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
  findchallenges(){ 
    if(this.allcontests==1){
        this.loader.start(); 
	    this.authttp.get('api/getAllContests?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&token='+this.token)
	    .subscribe(
	      res => { 
	        if(res[0].status!=0){
	        this.getchallenges = res; 
         // console.log(this.getchallenges);
	        }else{
	        this.getchallenges=[];
	        }
	       this.loader.stop();
	      },
	      err => { });
      }
    else if(this.allcontests==2){
        this.loader.start(); 
	    this.authttp.get('api/myjoinedleauges?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&token='+this.token)
	    .subscribe(
	      res => { 
	        if(res[0].status!=0){
	        this.joinedcontest = res;    
	        // console.log(this.joinedcontest);
	        }else{
	        this.joinedcontest=[];
	        }
	       this.loader.stop();
	      },
	      err => { });
      }
    else if(this.allcontests==3){
        this.loader.start(); 
	    this.authttp.get('api/getContestByCategory?matchkey='+this.getmatchkey+'&user_id='+this.loginid+'&category='+this.category+'&token='+this.token)
	    .subscribe(
	      res => { 
	        if(res[0].status!=0){
	        this.reamincontest = res[0].contest;   
	        // console.log(this.reamincontest); 
	        }else{
	        this.reamincontest=[];
	        }
	       this.loader.stop();
	      },
	      err => { });
      }
   }


  
  findjointeam(userid,matchkey,challengeid=""){  
      this.http.get('api/getMyTeams?userid='+this.loginid+'&matchkey='+matchkey+'&challengeid='+challengeid+'&token='+this.token) 
     .subscribe(res => { 
      if(res[0].status!=0){
        this.jointeamlists = res;  
        // new code //
        if((localStorage.getItem('getchallengeid')) && (localStorage.getItem('entryfee'))){ 
          this.getchallengeid = localStorage.getItem('getchallengeid');
          this.entryfee = localStorage.getItem('entryfee'); 
          if (this.getchallengeid != '' && this.entryfee != '') { 
              this.firstcheckprofle(this.entryfee,this.getchallengeid)          
              localStorage.removeItem('getchallengeid');
              localStorage.removeItem('entryfee');
          }
        } 
      }else{
        this.matchdetails=[];
      } 


  },err => {});
  
  }

firstcheckprofle(entryfee,getchallengeid)  {   
        this.entryfee = entryfee;
        this.getchallengeid = getchallengeid;   
    $('#teamselector').removeClass('display-none');
      $('#confirmwin_balance').addClass('display-none'); 
     if(this.jointeamlists.length<=0){   
         localStorage.setItem('getchallengeid', this.getchallengeid);
         localStorage.setItem('entryfee', this.entryfee);
        this.getteamnumber = 1;
        this.toastr.error("Please create your team first.");
        this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumber)}});
    } 
   else{ 
		  this.findjointeam(this.loginid,this.getmatchkey,this.getchallengeid); 
      this.http.get('api/getUsableBalance?user_id='+this.loginid+'&challengeid='+getchallengeid+'&token='+this.token) 
    .subscribe(
      res => { 
           this.loader.stop(); 
            this.balance=res; 
            this.usablebalance= this.balance[0].usablebalance;    
        if(this.entryfee<=this.usablebalance){
           $("#confirmation").modal('show');           
           this.joinleaugemodal(entryfee,getchallengeid);
        }
        else{
           // this.checkaddcash();

           $('#addmoney').modal('show');
           this.joinleaugemodal(entryfee,getchallengeid);
        }
     }, 
         err => {});
    }
  }  

 
  
newteamsect(id){
  this.selectedteam = id; 
}
  joinconteam(){
    if(this.selectedteam==""){
        this.toastr.error("Please select your team first.");      
    }
    else{
      $('#teamselector').addClass('display-none');
      $('#confirmwin_balance').removeClass('display-none');
    }
  }
   joinleaugemodal(entryfee,getchallengeid){
    this.loader.start();
    this.http.get('api/getUsableBalance?user_id='+this.loginid+'&challengeid='+getchallengeid+'&token='+this.token) 
    .subscribe(
      res => { 
           this.loader.stop(); 
            this.balance=res; 
            this.usablebalance= this.balance.usablebalance;  
            this.entryfee = entryfee;
            this.getchallengeid = getchallengeid;
     },
         err => {});
    }




  joinleaguematch(){

           if(this.jointeamlists.length<=0){ 
            this.getteamnumber = 1;
            this.toastr.error("Please create your team first.");
            this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumber)}});
            

               localStorage.setItem('getchallengeid', this.getchallengeid);
               localStorage.setItem('entryfee', this.entryfee);

           }
           else{
              if(this.selectedteam==""){
                this.toastr.error("Please select your team first.");
                return false;
              } 
              this.loader.start();
              let formData = new FormData();
              formData.append('matchkey', this.getmatchkey);  
              formData.append('challengeid', this.getchallengeid);  
              formData.append('teamid', this.selectedteam);  
              formData.append('userid', this.loginid);  

     this.authttp.post('api/joinleauge',formData) .subscribe(res => { 

       this.loader.stop();
      $("#confirmation").modal('hide');   
      $('#teamselector').removeClass('display-none');
      $('#confirmwin_balance').addClass('display-none');
      if(res[0].message=='match closed'){
        this.toastr.error("You can't join contest now in this match as the time to join contest is closed.");
        this.router.navigate(['/terms-conditions']);
      }
	  
      if(res[0].message=='You can’t join any contest before making first deposit of minimum Rs. 10/-'){
        this.toastr.error("You can’t join any contest before making first deposit of minimum Rs. 10/-");          
           $('#addmoney').modal('show');
      }
      if(res[0].message=='ineligible'){
        this.toastr.error("You are ineligible to join any contest. Please read terms of use carefully.");
        this.router.navigate(['/terms-conditions']);
      }
      if(res[0].message=='already joined'){
        this.toastr.error("You are already a part of this contest. Please join other contests.");
      }
      if(res[0].message=='team already joined'){
        this.toastr.error("You are already a part of this contest with this team. Please join this contests with other team.");
      }
      if(res[0].message=='Contest closed'){
        this.toastr.error("Contest Closed Now. Please join other contests");
      }
      if(res[0].message=='insufficient balance'){
        this.toastr.error("You don't have sufficient balance to join this contest.");
        this.router.navigate(['/wallet']);
       }
      if(res[0].message=='Contest joined'){
        this.toastr.success("Contest joined successfully.");  
		
		this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(this.getchallengeid)}}); 
      }
      else if(res[0].status==false){
        this.toastr.error("Oops something went wrong.");
      }

       this.loader.stop();
       this.findchallenges();
      },
      err => { });
              
           } 

  }

	AddAmount(amt) {
        var a = Number(this.user.balance || 0);
        var b = Number(amt || 0);
        this.user.balance = a + b;
    } 
    alloffers() { 
        return this.http.get('api/alloffers?userid='+this.loginid+'&token='+this.token)
          .subscribe(
          res => {
              this.alloffer = res;  
          },
          err => {});
    }
    // checkaddcash(){
 
    //     if (this.alloffer.length!=0) {
    //         $('#addcashfirsttime').modal('show');
    //     }
    //     else{            
    //         $('#addmoney').modal('show');
    //     }
    // }

  joinwithnewteam(){ 
         localStorage.setItem('getchallengeid', this.getchallengeid);
         localStorage.setItem('entryfee', this.entryfee);
            this.getteamnumberex = this.jointeamlists.length + 1; 
          this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumberex)}});
  }

  setbonus(event: any){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount='+this.allofferbonus.balance+'&token='+this.token)
            .subscribe(
                res => {
                    this.allofferbonusfind = res[0];   
                },
                err => {});
  }
  staticbonusone(){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=25'+'&token='+this.token)
            .subscribe(
                res => {
                    this.allofferbonusone = res;   
                },
                err => {});
  }
  staticbonustwo(){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=100'+'&token='+this.token)
            .subscribe(
                res => {
                    this.allofferbonustwo = res;   
                },
                err => {});
  }
  staticbonusthree(){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=1000'+'&token='+this.token)
            .subscribe(
                res => {
                    this.allofferbonusthree = res;   
                },
                err => {});
  }
  addmoneybybonus(amountforbonus){ 
    if(amountforbonus!='0'){
        this.finaladdamount = amountforbonus; 
        $('#addcashfirsttime').modal('hide')
        $('#paytype').modal('show')
    }
    else{
      this.toastr.error("Please enter valid amount");        
    }
  }
 isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;
        return true;
    }

    payumoneyadd(paytype) {   
         if(this.user.balance!='0'){ 
            var bal = Number(this.user.balance || 0);
            if (bal <= 0) {
                this.toastr.error("Please enter valid amount");
            } else {
                window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype+'&token='+this.token;
            }
       }
       else{        
            var bal = Number(this.finaladdamount || 0);
            if (bal <= 0) {
                this.toastr.error("Please enter valid amount");
            } else {
                window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype+'&token='+this.token;
            }
       }

    }

invitethischallenge(challengeid,matchkey){
    
    this.loader.start();
    this.http.get('api/refercodechallenege?matchkey='+matchkey+'&userid='+this.loginid+'&challengeid='+challengeid+'&token='+this.token) .subscribe(res => {
      if(res[0].refercode!=0){
            this.invitecode = res[0].refercode;
            this.inviteid = res[0].id;
            $("#sharemodal").modal('show');
         }else{
           this.invitecode="";
         }
         this.loader.stop();
      },
      err => { });
    
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
        this.http.get('api/sendinvite?email='+value.email+'&invitetext='+value.invitetext+'&id='+this.inviteid+'&token='+this.token) .subscribe(res => {
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

  singlechallenge(cid){
	// alert(cid);
    this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(cid)}});  
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
   
  completescore(){ 
		$("#pointSystem").addClass('active'); 
  }
  closecompletescore(){
		$("#pointSystem").removeClass('active'); 
  }
  
  scorecardshow(){ 
    this.authttp.get('api/fantasyscorecards?matchkey='+this.getmatchkey+'&token='+this.token)
    .subscribe(
      res => { 
        this.scorecard = res;   
		console.log(this.scorecard);
      },
      err => { });
  }
  

}