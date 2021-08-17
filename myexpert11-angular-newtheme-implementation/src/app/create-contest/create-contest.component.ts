import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent implements OnInit {
 
  public getmatchkey:any;   
  public loginid:any; 
  public getseriesid:any;  
  public matchdetails:any;  
  public challengeid:any; 
  public getteamnumber:any; 
  public entryfee:any;   
  public getinvitecode:any;
  public privatechallenge:any;
  public challengeidstore:any;
  public myleaugeslength:any;
  public getchallengeid:any;
  public findchallenges:any;
  privateerror:any;
  customizewining:boolean;
  setwinnerspricecard:any;
  getwinnersamount:any;
  token: string;
  constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notification:NotificationService) {
      this.getmatchkey=""; 
      this.loginid="";
      this.myleaugeslength="";
      this.getchallengeid=""; 
      this.matchdetails=[]; 
      this.findchallenges=[];  
      this.challengeidstore=[];
      // for private challenge//
      this.getinvitecode="";
      this.privatechallenge={
        setentryfee:0,
        setchallengesize:"",
        setwiningamount:"",
        setchallengename:"",
        setwinners:""
      }
      this.privateerror="";
      this.getwinnersamount="";
      this.customizewining=false;
      this.setwinnerspricecard=[];
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
              this.getchallengeid = params['getchallengeid']; 
        });


      
       
      this.notification.getHeaderText('Make Our Own Contest');
      this.notification.getFirstMenu('myteams');
      this.notification.getSecondMenu('');  
      this.machdetail();




      
}

  ngOnInit() {  
  }
     
  
   machdetail(){
    let formData = new FormData();
    formData.append('matchkey', this.getmatchkey);  
    this.authttp.post('api/getmatchdetails?token='+this.token,formData) 
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
   // for private chllenge//
  joinchallengebycode(){
     var getcode = this.getinvitecode;
     let formData = new FormData();
      formData.append('matchkey', this.getmatchkey);  
      formData.append('getcode', this.getinvitecode); 
      formData.append('userid', this.loginid);  
     if(getcode!=""){
        this.loader.start();
        this.authttp.post('api/joinbycode&token='+this.token,formData) .subscribe(res => {
          if(res[0].message=='Contest opened'){
            $("#joincodemodal").modal('hide');
            var getchallengeid = res[0].challengeid;
            var getentryfee = res[0].entryfee; 
          }
          else if(res[0].message=='Contest closed'){
           this.toastr.error("This Contest is closed now. you cannot join this Contest");
          }
          else if(res[0].message=='invalid code'){
            this.toastr.error("You are using invalid code for this match");
          }
          else if(res[0].message=='already used'){
              this.toastr.error("You are already a part of this Contest");
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
          this.privateerror= "Please enter valid wining amount and Contest size. Entry fees should be greater than 1.";
          this.privatechallenge.setwiningamount="";
          this.privatechallenge.setentryfee=0;
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
          this.privateerror="Winners can't be greater than Challenge size.";
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
/*    console.log(JSON.stringify(this.setwinnerspricecard));*/
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

 
 
}