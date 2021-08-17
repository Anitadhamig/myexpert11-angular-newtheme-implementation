import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NotificationService, HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;
@Component({
  selector: 'app-choose-captain',
  templateUrl: './choose-captain.component.html',
  styleUrls: ['./choose-captain.component.css']
})
export class ChooseCaptainComponent implements OnInit {

	resultplayer: any;  
	capplayers: any;  
	capback: any;  
	getresultplayer: any;  
	allplayers:any;
	matchid:any;
	public cptnname:any;
	public uteamid:any;
	public getmatchkey:any;
	public captain:any;
	public vicecaptain:any;
	public matchdetails:any;
	public getchallengeid:any;
	public playerfullinfo:any;
	team: object;
	public  loginid:any;
	public  entryfee:any;
	public  shortcapplayers:any;
  public getteamnumber:any;
	token: string;
  constructor(private notification:NotificationService, private router:Router,
	private http: HttpClientService, private headerService: HeaderService, 
	private loader:LoaderService, private activatedRoute: ActivatedRoute,
	private commons:CommonService,private toastr: ToastrService,
	private fb: FormBuilder,private auth: ManualAuthService, 
	private elementRef: ElementRef, private renderer: Renderer2,
	 private authttp: HttpIntercepter) { 
  
		this.shortcapplayers = [];  
		this.capplayers = [];  
		this.playerfullinfo = [];  
		this.allplayers=[];
		this.matchdetails=[];
		this.allplayers.captain=""; 
		this.allplayers.vicecaptain="";
		this.getchallengeid="";
		this.entryfee=""; 
  		this.getteamnumber = ""; 
		this.cptnname=""; 
      	this.notification.getHeaderText('Choose Captain');
	}


  ngOnInit() {
	    
	  if(!(localStorage.getItem('token'))){
		  this.router.navigate(['']);
		}
		else{
		  this.loginid = localStorage.getItem('token');
		  this.token = localStorage.getItem('gettoken');
		}
		 
		
		this.activatedRoute.queryParams.subscribe(params => {
			this.capback=atob(params['getresultplayer']||""); 
			this.getmatchkey = atob(params['matchid']);  
			this.uteamid = atob(params['uteamid']);  
		

		});  
		this.capplayers = JSON.parse(this.capback); 
		this.shortcapplayers = JSON.parse(this.capback); 
		this.machdetail();
		
		  this.shortcapplayers.sort(function(a, b) {
			return b.totalpoints - a.totalpoints;
		  }); 
			
		  this.getchallengeid = localStorage.getItem('getchallengeid');
		  this.entryfee = localStorage.getItem('entryfee'); 
		 
	  this.findjointeam();
  }

  back(){ 
		window.history.back();
 
  }   
  oneclick(){  
    $("#plrtype").addClass('active'); 
    $("#pointstype").removeClass('active'); 
    $("#firstone").removeClass('hide'); 
    $("#secondone").addClass('hide'); 
 
  }   
  secondclick(){  
    $("#plrtype").removeClass('active'); 
    $("#pointstype").addClass('active'); 
    $("#firstone").addClass('hide'); 
    $("#secondone").removeClass('hide'); 
 
  }   
	selectcaptain(playerid,playername){
		if(this.allplayers.vicecaptain==playerid){
			this.allplayers.vicecaptain="";
			$("input[name='vice-captain']").each(function(i) {
			       this.checked = false;
			});
		}
		this.allplayers.captain = playerid;
		this.cptnname = playername; 

	}
	selectvicecaptain(playerid,playername){
		if(this.allplayers.captain==playerid){
			this.allplayers.captain="";
			$("input[name='captain']").each(function(i) {
			       this.checked = false;
			});
		}
		this.allplayers.vicecaptain = playerid;
		this.allplayers.vicecaptnname = playername; 
	} 
	
	saveteam(){  
			var players = new Array() ; 
			var captain = this.allplayers.captain;  
			var vicecaptain = this.allplayers.vicecaptain;  
				if((captain!="" || captain!=undefined) || (vicecaptain!="" || vicecaptain!=undefined)){ 
					this.capplayers.map(function getPlayerId(item,index) {
						players.push(item.id);
					}); 
					var res_fnl=players.toString();
					this.loader.start(); 
					let formData = new FormData();
					formData.append('matchkey', this.getmatchkey); 
					formData.append('userid', this.loginid); 
					formData.append('teamnumber', this.uteamid); 
					formData.append('players', res_fnl); 
					formData.append('captain', captain);  
					formData.append('vicecaptain', vicecaptain);  
					this.authttp.post('api/createmyteam'+'?token='+this.token,formData) 
					.subscribe(
					res => {  

						if(res[0].status=='1'){
							this.toastr.success('Your Team Created');  
							  this.getchallengeid = localStorage.getItem('getchallengeid');
							  this.entryfee = localStorage.getItem('entryfee');
 
							if (this.getchallengeid == '' || this.entryfee == '' || this.getchallengeid == 'undefined' || this.entryfee == 'undefined' || this.getchallengeid == null || this.entryfee == null ) {  
									this.router.navigate(['/myteams'], { queryParams: { getmatchkey: btoa(this.getmatchkey)}});	
							
							}  
							else if (this.getchallengeid != '' && this.entryfee !='') { 
    							 this.router.navigate(['/join-contest'], { queryParams: { matchkey: btoa(this.getmatchkey)}});
							}
							
 
						}
						else if(res[0].status=='0'){
							this.toastr.error(res[0].msg);  
							this.loader.stop();		
 
						}
						this.loader.stop();	 					
						  
					},
					err => {});
				}
				else{
					this.toastr.error('Select Your Team Captain'); 
				}
				
			 }
 
	saveteamcaptain(){
		var captain = this.allplayers.captain; 
		var vicecaptain = this.allplayers.vicecaptain; 
		if(captain=="" || captain==undefined){
			this.toastr.error('Please choose captain');	
		} 
		else if(vicecaptain=="" || vicecaptain==undefined){
			this.toastr.error('Please choose vice-captain');	
		} 
		else{
			this.saveteam();
		} 
	}
	 findjointeam(){ 
	  this.loader.start();
      this.http.get('api/getMyTeams?userid='+this.loginid+'&token='+this.token+'&matchkey='+this.getmatchkey+'&token='+this.token) 
	   .subscribe(res => {
           this.loader.stop();
           
        if(res[0].status!=0){  
           this.getteamnumber= res.length+1;
        }else{ 
           this.getteamnumber= res.length+1;
        }
       },err => {});
  
  }
  machdetail(){ 
  	
    this.http.get('api/getmatchdetails?matchkey='+this.getmatchkey+'&token='+this.token) 
    .subscribe(
    res => { 
        if(res[0].status!=0){
        this.matchdetails = res; 
        }else{
        this.matchdetails=[];
        }
       this.loader.stop();
      }, err => {});
   }
   
  closeteampreview(){
    $("#team-preview").toggleClass('slide_left'); 
  }
  
  teampreview(){
    $("#team-preview").toggleClass('slide_left'); 
  }
   playerstate(i,playerid,matchkey){ 
		this.loader.start();
  		return this.http.get('api/playerfullinfo?playerid='+playerid+'&matchkey='+matchkey+'&token='+this.token)
	    .subscribe(
            res => {
            	this.loader.stop(); 
				this.playerfullinfo = res;   
	
				$("#palyerinfo"+i).addClass('bottom-sheet--active'); 
				$('.bottom-sheet-container').click( function(event){
					event.stopPropagation(); 
				});
				
            },
            err => { }
		);		
	}
	
   playerstateclose(i){
     $("#palyerinfo"+i).removeClass('bottom-sheet--active'); 
   }
   
}
