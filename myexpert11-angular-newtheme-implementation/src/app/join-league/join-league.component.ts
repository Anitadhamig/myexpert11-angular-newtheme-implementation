import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;
@Component({
  selector: 'app-join-league',
  templateUrl: './join-league.component.html',
  styleUrls: ['./join-league.component.css']
})
export class JoinLeagueComponent implements OnInit {
  rForm: FormGroup;
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  public getmatchkey:any;  
  validteamname:any;  
  public loginid:any;
  public getchallenges:any;
  public getseriesid:any; 
  public matchkey:any;  
  public getteamnumberex:any;  
  public matchdetails:any;  
  public challengeid:any; 
  public getteamnumber:any; 
  public entryfee:any; 
  public getchallengeid:any; 
  public allmychallenges:any; 
  public jointeamlists:any; 
  public getbalanceinfo:any;   
  public challengeidstore:any;   
  public firstchecklist:any; 
  public fulluserdata:any; 
  public varif:any; 
  public balance:any; 
  public usablebalance:any; 
  public findteamsofusers:any; 
  public myleauges:any;
  public selectedteam:any;
  public inviteid:any;
  public invitecode:any;
  public myleaugeslength:any; 
  // for private leauges//
  public getinvitecode:any;
  public privatechallenge:any;
  privateerror:any;
  customizewining:boolean;
  setwinnerspricecard:any;
  getwinnersamount:any;
    public userdatass: any;
    user: any;
    public mypopularoffers: any;
    checkcode: any;
    public alloffer: any;
    public allofferbonus: any;
    public allofferbonusfind: any;
    public cidid: any;
    public allofferbonusone: any;
    public matchsrt: any;
    public allofferbonustwo: any;
    public allofferbonusthree: any;
    public finaladdamount: any;
    public getallawards: any;
    public getallofr: any;
  token: string;
  constructor(private router:Router,private authSer:AuthService,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notification:NotificationService, public notdata:Globals) {
      this.getmatchkey="";
      this.selectedteam="";
      this.getteamnumberex="";
      this.loginid="";
      this.myleaugeslength="";
      this.getchallengeid="";
      this.getchallenges=[];
      this.myleauges=[];
      this.fulluserdata=[];
      this.varif=[];
      this.invitecode="";
      this.cidid="";
      this.matchsrt="";
      this.challengeidstore="";
      this.inviteid="";
        this.alloffer = [];
      this.jointeamlists=[];
      this.matchdetails=[]; 
      this.allmychallenges=[];
      this.balance=[];
      this.usablebalance=[];
      this.getallofr=[];
      // for private challenge//
      this.getinvitecode="";
      this.privatechallenge={
        setentryfee:0,
        setchallengesize:"",
        setwiningamount:"",
        setchallengestats:0,
        setchallengename:"",
        setwinners:""
      }
      this.user = {
          "balance": 0,
          'payfrom': 'payu' 
      };
      this.allofferbonus={ 
        'balance': ''
      }
        this.allofferbonusfind = [];
        this.allofferbonusone = [];
        this.allofferbonustwo = [];
        this.allofferbonusthree = [];
        this.finaladdamount = [];
      this.userdatass = [];
      this.privateerror="";
      this.getwinnersamount="";  
      this.setwinnerspricecard=[];
        this.checkcode = {
            "couponcode": false,
            "couponcodevalue": ''
        };
        this.getallawards = [];
        this.mypopularoffers = [];
      if(!(localStorage.getItem('token'))){
        this.router.navigate(['']);
      }
      else{
       this.loginid = localStorage.getItem('token');
       this.token = localStorage.getItem('gettoken');
      } 
      this.activatedRoute.queryParams.subscribe(params => {
              this.getmatchkey = atob(params['matchkey']);
              this.matchsrt =  params['matchsrt'];
              this.getseriesid = params['series'];
              this.getchallengeid = params['getchallengeid'];
              this.findchallenges();
        });

 
      
      this.alloffers();
      // this.staticbonusone();
      // this.staticbonustwo();
      // this.staticbonusthree(); 
 /*     localStorage.setItem('currentmatch',this.getmatchkey);*/
      this.notification.getHeaderText('Contest');
      this.notification.getFirstMenu('myteams');
      this.notification.getSecondMenu('');
      this.myjoinedleauges();
      this.userfulldata();
      this.mychallenges();
      this.allawards();
      this.rForm = fb.group({
          'email' : ["", [Validators.required]],
          'invitetext':[""]
      });
      this.findjointeam(this.loginid,this.getmatchkey);  
 
      
    



      
}

  ngOnInit() {     
		$(".modal-backdrop").removeClass("show");
     	$(".modal-backdrop").removeClass("fade");
	    $(".modal-backdrop").removeClass("modal-backdrop");
  }
  back_button(){ 
		window.history.back();
	}
	
    allofr() { 
        return this.http.get('api/getalluseroffers?userid='+this.loginid+'&token='+this.token)
            .subscribe(
                res => {
                    this.getallofr = res;   
					console.log(this.getallofr); 
                },
                err => {});
    }
    
    AddAmountnew(amt,id) {  
		this.user.balance="";	
        $('#getofr'+id).addClass('active'); 
		$('#getofr'+id).parents().siblings().removeClass('active');
		this.user.balance = amt; 
    }
    allawards() { 
        return this.http.get('api/getallamtoffer'+'?token='+this.token)
            .subscribe(
                res => {
                    this.getallawards = res;   
					console.log(this.getallawards);
                },
                err => {});
    }

  // getmatchlist(){  
  
  //   this.loader.start();
  //   let formData = new FormData();
  //   formData.append('matchkey', this.getmatchkey); 
  //   this.authttp.post('api/getmatchlist',formData)
  // .subscribe(
  //   res => {
  //       if(res[0].status!=0){
  //         this.matchdetails = res; 
  //     this.loader.stop();
  //       }else{
  //         this.matchdetails=[];
  //     this.loader.stop();
  //       }
  //      this.loader.stop();
  //     },
  //    err => { });
     
  //      this.loader.stop();
  //  }
   
   
    
   
  findchallenges(){ 
    this.loader.start(); 
    this.authttp.get('api/getContests?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&token='+this.token)
    .subscribe(
      res => { 
		this.machdetail();
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
 
   totalwins(i){ 
     $("#winnner-rank"+i).addClass('active'); 
   } 
   totalwinsclose(i){   
     $("#winnner-rank"+i).removeClass('active'); 
       $('.em_bottom_sheet').click( function(event){
        event.stopPropagation(); 
      });
   }


  mychallenges(){   
    this.authttp.get('api/myjoinedleauges?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&token='+this.token)
    .subscribe(
      res => { 
        if(res[0].status!=0){
         this.allmychallenges = res;
        }else{
          this.allmychallenges=[];
        } 
      },
      err => { });
   }
   
   joinleaugemodal(entryfee,getchallengeid){ 
    this.http.get('api/getUsableBalance?user_id='+this.loginid+'&challengeid='+getchallengeid+'&token='+this.token) 
    .subscribe(
      res => {  
            this.balance=res;  
            this.usablebalance= this.balance.usablebalance;  
            this.entryfee = entryfee;
            this.getchallengeid = getchallengeid;
     },
         err => {});
    }
   machdetail(){  
    this.http.get('api/getmatchdetails?matchkey='+this.getmatchkey+'&token='+this.token) 
  .subscribe(
    res => {  
        if(res[0].status!=0){
        this.matchdetails = res[0];  
			
			console.log(this.matchdetails);
 
        }else{
        this.matchdetails=[];
        } 
      }, err => {});
  }
 findObjIndexInArray(key, value, array) {
    var index = array.findIndex(function (elem) {
      return elem[key] == value;
    })
    return index
  }     

  findjointeam(userid,matchkey,challengeid=""){   
      this.http.get('api/getMyTeams?userid='+this.loginid+'&matchkey='+this.getmatchkey+'&challengeid='+challengeid+'&token='+this.token) 
     .subscribe(res => {  
      if(res[0].status!=0){
        this.jointeamlists = res;  
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
		if(this.matchsrt == 1){ 
			if((localStorage.getItem('getchallengeid')) && (localStorage.getItem('entryfee'))){ 
				
			  this.getchallengeid = localStorage.getItem('getchallengeid');
			  this.entryfee = localStorage.getItem('entryfee'); 
			 
			  
			  if (this.getchallengeid != '' && this.entryfee != '') { 
				  this.firstcheckprofle(this.entryfee,this.getchallengeid)  
			  }
			}
		}		
      } 


  },err => {});
  
  }
  add_funds(){ 
      this.router.navigate(['/wallet'], { queryParams: { matchid: btoa(this.getmatchkey)}});  
  } 
  myteams(){
     this.router.navigate(['/myteams'], { queryParams: { getmatchkey: btoa(this.getmatchkey)}});    
  } 

  joinleaguematch(){
		// alert(this.getmatchkey);
		// alert(this.getchallengeid);
		// alert(this.selectedteam);
		// alert(this.loginid);
      this.loader.start();
      let formData = new FormData();
      formData.append('matchkey', this.getmatchkey);  
      formData.append('challengeid', this.getchallengeid);  
      formData.append('teamid', this.selectedteam);  
      formData.append('userid', this.loginid);  

     this.authttp.post('api/joinleauge'+'?token='+this.token,formData) .subscribe(res => { 
      this.loader.stop();
      $("#confirmation").modal('hide');   
      $('#teamselector').removeClass('display-none');
      $('#confirmwin_balance').addClass('display-none');
      if(res[0].message=='match closed'){
        this.toastr.error("You can't join contest now in this match as the time to join contest is closed.");
        this.router.navigate(['/terms-conditions']);
      }
      if(res[0].message=='ineligible'){
        this.toastr.error("You are ineligible to join any contest. Please read terms of use carefully.");
        this.router.navigate(['/terms-conditions']);
      }
      if(res[0].message=='You can’t join any contest before making first deposit of minimum Rs. 10/-'){
        this.toastr.error("You can’t join any contest before making first deposit of minimum Rs. 10/-");          
           $('#addmoney').modal('show');
      }
      if(res[0].message=='already joined'){
        this.toastr.error("You are already a part of this contest. Please join other contests.");
			if(this.matchsrt == 1){		
				this.matchsrt = "";		
				this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(this.getchallengeid)}});
				
			}
      }
      if(res[0].message=='team already joined'){
        this.toastr.error("You are already a part of this contest with this team. Please join this contests with other team.");
			if(this.matchsrt == 1){		
				this.matchsrt = "";		
				this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(this.getchallengeid)}});
				
			}
      }
      if(res[0].message=='Contest closed'){
        this.toastr.error("Contest Closed Now. Please join other contests");
			if(this.matchsrt == 1){		
				this.matchsrt = "";		
				this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(this.getchallengeid)}});
				
			}
      }
      if(res[0].message=='insufficient balance'){
        this.toastr.error("You don't have sufficient balance to join this contest.");
        this.router.navigate(['/wallet']);
       }
      if(res[0].message=='Contest joined'){
        this.toastr.success("contest joined successfully.");  
        this.mychallenges();
        if (this.privatechallenge.setentryfee != '0') { 
            this.privatechallenge={
                setentryfee:0,
                setchallengestats:0,
                setchallengesize:"",
                setwiningamount:"",
                setchallengename:"",
                setwinners:""
              } 
             this.invitefriends(this.challengeidstore,this.getmatchkey);
			
        }else{  
		this.router.navigate(['/contest-info'], { queryParams: { match: btoa(this.getmatchkey) , lid: btoa(this.getchallengeid)}}); 
		}
      }
      else if(res[0].status==false){
        this.toastr.error("Oops something went wrong.");
      }

       this.loader.stop();
       this.findchallenges();
      },
      err => { });
                
  }
  joinwithnewteam(){ 
         localStorage.setItem('getchallengeid', this.getchallengeid);
         localStorage.setItem('entryfee', this.entryfee);
            this.getteamnumberex = this.jointeamlists.length + 1; 
          this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumberex)}});
  }
  myjoinedleauges(){
    this.loader.start();
       this.http.get('api/myjoinedleauges?matchkey='+this.getmatchkey+'&userid='+this.loginid+'&token='+this.token) .subscribe(res => {
        if(res[0].status!=0){
            this.myleauges = res;
            this.myleaugeslength = this.myleauges.length;
         }else{
          this.myleauges = [];
          this.myleaugeslength = 0;
         }

         this.loader.stop();
      },
      err => { });
  }
 
userfulldata()  {
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

    AddAmount(amt) {
        var a = Number(this.user.balance || 0);
        var b = Number(amt || 0);
        this.user.balance = a + b;
    } 
 createteam(){
        this.getteamnumber = 1; 
        this.router.navigate(['/create-team'], { queryParams: { matchid: btoa(this.getmatchkey),uteamid:btoa(this.getteamnumber)}});	 
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
   invitefriends(challengeid,matchkey){
    
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

   // for private chllenge//
  joinchallengebycode(){
     var getcode = this.getinvitecode;
     let formData = new FormData();
      formData.append('matchkey', this.getmatchkey);  
      formData.append('getcode', this.getinvitecode); 
      formData.append('userid', this.loginid);  
     if(getcode!=""){
        this.loader.start();
        this.authttp.post('api/joinbycode'+'?token='+this.token,formData) .subscribe(res => {
          if(res[0].message=='Challenge opened'){
            $("#joincodemodal").modal('hide');
            var getchallengeid = res[0].challengeid;
            var getentryfee = res[0].entryfee;
            this.firstcheckprofle(getentryfee,getchallengeid);
          }
          else if(res[0].message=='Challenge closed'){
           this.toastr.error("This Contest is closed now. you cannot join this contest");
          }
          else if(res[0].message=='invalid code'){
            this.toastr.error("You are using invalid code for this match");
          }
          else if(res[0].message=='already used'){
              this.toastr.error("You are already a part of this contest");
           }
          this.loader.stop();
          
      },
      err => { });
     }
  }
  // private challenge//
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;
        return true;
    }

  setentryfee(event: any){
    var getwinamount = this.privatechallenge.setwiningamount;
    var getsize = this.privatechallenge.setchallengesize; 
    this.setwinnerspricecard=[];
    if(getsize)
    if(getwinamount!="" && getsize!=""){
      var getusersamount = (parseFloat(getwinamount)/parseInt(getsize));
      var getentryfee = ((getusersamount*15)/100)+getusersamount;
      this.privatechallenge.setentryfee = getentryfee.toFixed(2);
      if(this.privatechallenge.setentryfee<1){
          this.privateerror= "Please enter valid wining amount and contest size. Entry fees should be greater than 1.";
          this.privatechallenge.setwiningamount="";
          this.privatechallenge.setentryfee=0;
          this.privatechallenge.setchallengestats=0;
          this.privatechallenge.setchallengesize="";
          return false;
      }
      else{
        this.privateerror="";
      }
    }
  }
  showcustomizewinings(event){
    if(event.target.checked==true){
        var getwinamount = this.privatechallenge.setwiningamount;
        var getsize = this.privatechallenge.setchallengesize;
        if(getwinamount==""){
          this.privateerror= "Please enter proper winning amount.";
        }
        else if(getsize==""){
          this.privateerror="You need to specify the number of teams participating.";
        }
        else if(getsize<2){
            this.privateerror="Number of teams should be greater than 1.";
        }else{
            this.customizewining = true;
            this.privateerror="";
        }
    }else{
      this.customizewining = false;
    }
  }
  setwinners(){
      var getwinners = this.privatechallenge.setwinners;
      if(getwinners<=1){
        this.privateerror="Winners must be greater than one.";
      }else{
        if(this.privatechallenge.setchallengesize<this.privatechallenge.setwinners){
          this.privateerror="Winners can't be greater than Contest size.";
        }else{
          this.setwinnerspricecard=[];
          var getamount = (this.privatechallenge.setwiningamount/this.privatechallenge.setwinners);
          var getpercent = ((getamount/this.privatechallenge.setwiningamount)*100);
          for(var i=1;  i<=this.privatechallenge.setwinners; i++){
            this.setwinnerspricecard.push({
                "winingamount": getamount.toFixed(2),
                "wining": getpercent.toFixed(0),
            });
            
          }
        }
      }
  }
  updatedistribution(rank){
    var getfullpercentage = 0;
    var next = rank+1;
    var getfirstper = $("#textwin"+rank).val();
    var nextrank = $("#textwin"+next).val(); 
    if(getfirstper<nextrank){
        this.privateerror="Invalid wining percent set.";
      }
      else if(getfirstper>=100){
        this.privateerror="Invalid wining percent set";
      }
      else{
         this.setwinnerspricecard[rank-1].wining = getfirstper;
         var getfirstamount = (getfirstper/100)*this.privatechallenge.setwiningamount;
         this.setwinnerspricecard[rank-1].winingamount = getfirstamount.toFixed(2);
         for(var i=1;i<=rank;i++){
             getfullpercentage = parseInt(this.setwinnerspricecard[i-1].wining) + getfullpercentage;
         }
         var getremainingpercentage = 100-getfullpercentage;
         var getremainingusers = this.setwinnerspricecard.length-rank;
         var dividedper = getremainingpercentage/getremainingusers;
         var divideamount = (dividedper/100)*this.privatechallenge.setwiningamount;
         for(var j=rank; j<this.setwinnerspricecard.length; j++){
         this.setwinnerspricecard[j].wining = dividedper.toFixed(0);
            this.setwinnerspricecard[j].winingamount = divideamount.toFixed(2);
         }
      }
    
  }
  updatedistributionlist(rank){
      var next = rank+1;
      var getfirstper = $("#textwin"+rank).val();
      var nextrank = $("#textwin"+next).val();
      if(getfirstper<nextrank){
        this.privateerror="Invalid wining percent set.";
      }
      else if(getfirstper>=100){
        this.privateerror="Invalid wining percent set";
      }
      else{
        var getwininglength = this.setwinnerspricecard.length;
        var getfirstamount = (getfirstper/100)*this.privatechallenge.setwiningamount;
        this.setwinnerspricecard[rank-1].winingamount=getfirstamount;
        this.setwinnerspricecard[rank-1].wining=getfirstper;
        

        var remainingwin = getwininglength-rank;
        var remainingper = 100-getfirstper;
        var remainig = remainingper/remainingwin;
        var ramount = (remainig/this.privatechallenge.setwiningamount)*100;
        this.chnageamount(rank);
      }
  }
  chnageamount(rank){
     var getwininglength = this.setwinnerspricecard.length;
     for(var i = rank-1; i<=getwininglength; i++){
        this.setwinnerspricecard[i].winingamount = 10;
        this.setwinnerspricecard[i].wining = 10;
     }
  }
  createchallenge(){    
    var getwinamount = this.privatechallenge.setwiningamount;
    var getname = this.privatechallenge.setchallengename;
    var getsize = this.privatechallenge.setchallengesize;
    var getentryfee = this.privatechallenge.setentryfee;
    var getsetchallengestats = this.privatechallenge.setchallengestats;  
    if (this.privatechallenge.setwiningamount !="" && this.privatechallenge.setchallengesize !="" ) { 
        if(getsetchallengestats == true){
           getsetchallengestats = '1';
        } 
        this.loader.start();
        let formData = new FormData();
        formData.append('matchkey', this.getmatchkey);  
        formData.append('userid', this.loginid);
        formData.append('win_amount', getwinamount); 
        formData.append('maximum_user', getsize); 
        formData.append('entryfee', getentryfee);   
        formData.append('name', getname); 
        formData.append('multi_entry', getsetchallengestats); 
        this.authttp.post('api/createchallenge'+'?token='+this.token,formData).subscribe(res => {
            if(res[0].status!=0){  
                // console.log(getsetchallengestats);
              // this.toastr.success(res[0].msg);
              this.challengeidstore = res[0].challengeid;
              $("#privatecontestmodal").modal('hide');
              this.privatechallenge.setwiningamount = "";
              this.privatechallenge.setchallengename = "";
              this.privatechallenge.setchallengesize = "";
              this.privatechallenge.setentryfee = "";
              this.privatechallenge.setchallengestats = "";
              this.firstcheckprofle(getentryfee,res[0].challengeid);
            }
            else if(res[0].status==0){
              this.toastr.error(res[0].msg);
            }
            this.loader.stop();
        },
        err => { }); 
     }  
   else{    
       this.toastr.error("please fill fields.");
   }

  }
  // createchallenge(){  
  //   var getwinamount = this.privatechallenge.setwiningamount;
  //   var getname = this.privatechallenge.setchallengename;
  //   var getsize = this.privatechallenge.setchallengesize;
  //   var getentryfee = this.privatechallenge.setentryfee;
  //   var getsetwinners = this.privatechallenge.setwinners;
  //   if (this.privatechallenge.setwiningamount !="" && this.privatechallenge.setchallengename!="" && this.privatechallenge.setchallengesize !="") {  

  //   if(this.privatechallenge.setwinners!="" && this.privatechallenge.setwinners!=0 && this.customizewining==true){
  //     this.privateerror="";
  //     var getwinnersamount = this.setwinnerspricecard.wining;
  //     var getwininglength = this.setwinnerspricecard.length;
  //     var pricecards=[];
  //   var countwinning = 0;
  //     this.setwinnerspricecard.map(function getWinnerAmount(item,index) {
  //        pricecards.push(item.winingamount);
  //        countwinning+= parseFloat(item.winingamount);
  //     });
  //  if(countwinning>getwinamount){
  //     this.toastr.error("Invalid price cards set. Total price cards amounts should not be greater then the winning amount.");
  //     return false;
  //   }
  //   else{
  //     this.loader.start();
  //     let formData = new FormData();
  //     formData.append('matchkey', this.getmatchkey);  
  //     formData.append('win_amount', getwinamount); 
  //     formData.append('maximum_user', getsize); 
  //     formData.append('entryfee', getentryfee); 
  //     //formData.append('pricecards', pricecards); 
  //     formData.append('name', getname); 
  //     formData.append('userid', this.loginid);
  //     this.authttp.post('api/createchallenge',formData).subscribe(res => {
  //         if(res[0].message==true){  
  //           this.challengeidstore = res[0].challengeid;
  //           $("#privatecontestmodal").modal('hide');
  //           this.firstcheckprofle(getentryfee,res[0].challengeid);
  //         }
  //         this.loader.stop();
  //     },
  //     err => { });
  //   }
  //   }
  //   else if(this.customizewining==false){
  //     this.privateerror="";
  //     this.loader.start();
  //     let formData = new FormData();
  //     formData.append('matchkey', this.getmatchkey);  
  //     formData.append('win_amount', getwinamount); 
  //     formData.append('maximum_user', getsize); 
  //     formData.append('entryfee', getentryfee);
  //     formData.append('name', getname); 
  //     formData.append('userid', this.loginid);
  //     this.authttp.post('api/createchallenge',formData).subscribe(res => {
  //         if(res[0].message==true){ 
  //           this.challengeidstore = res[0].challengeid;
  //           $("#privatecontestmodal").modal('hide');
  //           this.firstcheckprofle(getentryfee,res[0].challengeid);
  //         }
  //         this.loader.stop();
  //     },
  //     err => { });
  //   }
  //   else{
  //     this.privateerror="Enter wining amount and challenge size.";
  //   }
  // }
  // else{

  //       this.toastr.error('Please fill above values');
  // }
  // }

 
   redirecttoallchallenge(matchkey,seriesid){  
   var getmatchkey = btoa(matchkey);
   var allcontests = 1;
     this.router.navigate(['/all-contests'], { queryParams: { matchkey: btoa(this.getmatchkey), contest: allcontests}}); 
  }

	redirecttoremainingchallenge(matchkey,category){   
		var getmatchkey = btoa(matchkey);
		var allcontests = 3;
		this.router.navigate(['/all-contests'], { queryParams: { matchkey: btoa(this.getmatchkey), contest: allcontests, category: category}});
	}

   createownchallenge(matchkey){   
   var getmatchkey = btoa(matchkey);
     this.router.navigate(['/create-contest'], { queryParams: { matchkey: getmatchkey}});
  }



    // payumoneyadd(paytype) {
    //     if (this.checkcode.couponcode == true) {
    //         if (this.checkcode.couponcodevalue != '') {
    //            var bal = Number(this.user.balance || 0);
    //             if (bal >= 0) {
    //               this.loader.start();
    //                 this.authttp.get('api/checkforcode?amount='+bal+'&id='+this.loginid+'&code='+this.checkcode.couponcodevalue)
    //                     .subscribe(
    //                         res => {
    //                             this.loader.stop(); 
    //                             this.mypopularoffers = res[0];
    //                             if (res[0].status==4) {
    //                                 var valcode = this.checkcode.couponcodevalue; 
    //                                 window.location.href = 'https://www.fanplay365.com/fanplay-admin/api/addfund?id=' + this.loginid + '&amount=' + bal + '&code=' + valcode + '&paymentby=' + paytype;
                                    
    //                             } else {
    //                                 this.toastr.error(res[0].message);
    //                             } 
    //                         },
    //                         err => {});
    //             } else {               
    //                 this.toastr.error("Please enter valid amount"); }
                
    //         } else {

    //             this.toastr.error("Please enter coupon code");

    //         }

    //     } else {
    //         var bal = Number(this.user.balance || 0);
    //         if (bal <= 0) {
    //             this.toastr.error("Please enter valid amount");
    //         } else {
    //             window.location.href = 'https://www.fanplay365.com/fanplay-admin/api/addfund?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype;
    //         }
    //     }
    // }

 
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

 

  setbonus(event: any){ 
        return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount='+this.allofferbonus.balance+'&token='+this.token)
            .subscribe(
                res => {
                    this.allofferbonusfind = res;     

                },
                err => {});
  }
  // staticbonusone(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=25')
  //           .subscribe(
  //               res => {
  //                   this.allofferbonusone = res;   
  //               },
  //               err => {});
  // }
  // staticbonustwo(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=100')
  //           .subscribe(
  //               res => {
  //                   this.allofferbonustwo = res;  
  //               },
  //               err => {});
  // }
  // staticbonusthree(){ 
  //       return this.http.get('api/getOfferByAmount?userid='+this.loginid+'&amount=1000')
  //           .subscribe(
  //               res => {
  //                   this.allofferbonusthree = res;    
  //               },
  //               err => {});
  // }
  addmoneybybonus(amountforbonus){ 
    if(amountforbonus!='0'){
        this.finaladdamount = amountforbonus;
        // console.log(this.finaladdamount);
        $('#addcashfirsttime').modal('hide')
        $('#paytype').modal('show')
    }
    else{
      this.toastr.error("Please enter valid amount");        
    }
  }

    payumoneyadd(paytype) {   
	
		if(this.user.balance!='0'){  
         if(this.user.balance < 10 && this.alloffer.length!=0){  
			this.toastr.error("Minimum 1st Deposit amount is Rs 10."); 
			return false;
		   } else{ 
				var bal = Number(this.user.balance || 0);
				if (bal <= 0) {
					this.toastr.error("Please enter valid amount");
				} else {
					window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype;
				}  
		   } 
       }
       else{        
            var bal = Number(this.finaladdamount || 0);
            if (bal <= 0) {
                this.toastr.error("Please enter valid amount");
            } else {
                window.location.href = 'https://myexpert11.com/final/myexpert11/api/addcash?id=' + this.loginid + '&amount=' + bal + '&paymentby=' + paytype;
            }
       }

    }


  privatecontestmodal(){
    $('#private_contest').modal('hide');
    $('#privatecontestmodal').modal('show');
  }
  joincodemodal(){
    $('#private_contest').modal('hide');
    $('#joincodemodal').modal('show');
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

}
