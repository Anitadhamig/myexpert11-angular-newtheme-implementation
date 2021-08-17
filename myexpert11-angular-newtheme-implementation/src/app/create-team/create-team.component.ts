import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { API } from '../config'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NotificationService, HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService,HttpIntercepter } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Globals} from '../global';
declare let $: any;
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})


export class CreateTeamComponent implements OnInit {
	credit: any;
	team: any;	
	cloneid:any;
	playerTypeCount: any;
	perteamsize: any; 
	batsman: any;
	bowler: any;
	allround: any;
	wicketkeepers: any; 
	playerslist: any;
	resultplayer: any;
	captainlistplayer: any;
	public  batsmanlist:any;
	public  playerfullinfo:any;
	playerFieldPosition: any[];
	public  getteamnumber:any;
	public  matchdetails:any;
	public  matchid:any; 
	public  getlists:any; 
	public  getmatchkey:any; 
	public  loginid:any;
	public  editteamdetails:any; 
	public  getchallengeid:any; 
	public  entryfee:any; 
	public  uteamid:any;  
	public selectcnvc:boolean;
	public editteam:any;
	public teamfilter:any;
	public playerfilter:any;
	public pointsfilter:any;
	public creditsfilter:any;
	token: string;
	isMobMode:boolean=false;
  constructor(private notification:NotificationService, 
	private ddService:DeviceDetectorService,private router:Router,private http: HttpClientService,
	 private headerService: HeaderService, private authttp: HttpIntercepter, 
	 private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2) {
	  
	  
		this.selectcnvc = false;

		this.playerTypeCount = {
			batsman: {
				min: 2,
				max: 6,
				selected: 0,
				color: 'redcolor',
			},
			bowler: {
				min: 2,
				max: 6,
				selected: 0,
				color: 'redcolor',
			},
			keeper: {
				min: 1,
				max: 3,
				selected: 0,
				color: 'redcolor',
			},
			allrounder: {
				min: 1,
				max: 6,
				selected: 0,
				color: 'redcolor',
			}
		};
		this.team = {
			totalSize: 11,
			currentSize: 0
		};
		this.credit = {
			max: 100,
			used: 0
		}
		this.perteamsize={
			team1:{
				max:7,
				selected:0
			},
			team2:{
				max:7,
				selected:0
			}
		}
		this.playerFieldPosition =  [{
						position: "batsmanplace1",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "batsmanplace2",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "batsmanplace3",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "batsmanplace4",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "batsmanplace5",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "batsmanplace6",
						positionFor: "batsman",
						placed: false
					},
					{
						position: "bowlerplace1",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "bowlerplace2",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "bowlerplace3",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "bowlerplace4",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "bowlerplace5",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "bowlerplace6",
						positionFor: "bowler",
						placed: false
					},
					{
						position: "keeperplace1",
						positionFor: "keeper",
						placed: false
					},
					{
						position: "keeperplace2",
						positionFor: "keeper",
						placed: false
					},
					{
						position: "keeperplace3",
						positionFor: "keeper",
						placed: false
					},
					{
						position: "allroplace1",
						positionFor: "allrounder",
						placed: false
					},
					{
						position: "allroplace2",
						positionFor: "allrounder",
						placed: false
					},
					{
						position: "allroplace3",
						positionFor: "allrounder",
						placed: false
					},
					{
						position: "allroplace4",
						positionFor: "allrounder",
						placed: false
					},
					{
						position: "allroplace5",
						positionFor: "allrounder",
						placed: false
					},
					{
						position: "allroplace6",
						positionFor: "allrounder",
						placed: false
					},
				]
		this.playerslist = []; 
		this.batsman = [];
		this.getlists = [];
		this.bowler = [];
		this.matchdetails = [];
		this.allround = [];
		this.wicketkeepers = [];
		this.editteamdetails = [];
		this.resultplayer = [];
		this.loginid="";
		this.cloneid="";
		this.teamfilter="";
		this.playerfilter="";
		this.pointsfilter="";
		this.creditsfilter="";
		this.getteamnumber="";
		this.getchallengeid="";
		this.entryfee="";
		this.editteam="";
		this.captainlistplayer = []; 
		if(!(localStorage.getItem('token'))){
		  this.router.navigate(['']);
		}
		else{
		  this.loginid = localStorage.getItem('token');
		  this.token = localStorage.getItem('gettoken');
		}
		this.isMobMode=this.ddService.isMobile();
      
		this.activatedRoute.queryParams.subscribe(params => {
			this.matchid = atob(params['matchid']);
			this.uteamid = atob(params['uteamid']);     
			this.editteam = params['editteam']; 			
			this.cloneid = params['cloneid']; 
 
			/*if(this.uteamid!=1 && this.uteamid!=2 && this.uteamid!=3 && this.uteamid!=4 && this.uteamid!=5 && this.uteamid!=6){
				this.router.navigate(['']);
			}
			if(this.cloneid!="" && this.cloneid!=undefined){
				if(this.cloneid!=1 && this.cloneid!=2 && this.cloneid!=3 && this.cloneid!=4 && this.cloneid!=5){
					this.router.navigate(['']);
				}
			}*/

		}); 
		this.getplayerslist(); 
		this.machdetail(); 
      this.notification.getHeaderText('Create Team');
		
		
  }

  ngOnInit() { 
		$(".modal-backdrop").removeClass("show");
     	$(".modal-backdrop").removeClass("fade");
	    $(".modal-backdrop").removeClass("modal-backdrop");
	   
  } 
  
  back(){ 
		window.history.back();
 
  }  
	getjointeamlist(){    
	   this.loader.start(); 
		var passtemanumber = "";
		if(this.cloneid != "" && this.cloneid != undefined){
			passtemanumber = this.cloneid; 
		}else{
			passtemanumber = this.uteamid; 
		}
		this.http.get('api/viewteamweb?userid='+this.loginid+'&teamnumber='+passtemanumber+'&matchkey='+this.matchid+'&token='+this.token) 
		.subscribe(
			res => {	
			this.loader.stop();	  
			this.getlists =  res; 	 	
			for(var i = 0; i < res.bowler.length; i++){				
				this.playerslist[this.findObjIndexInArray('id', res.bowler[i].id, this.playerslist)].isSelected = true;
		        this.resultplayer.push(this.getlists.bowler[this.findObjIndexInArray('id', res.bowler[i].id, this.getlists.bowler)]); 
		        this.playerTypeCount[res.bowler[i].role]['selected']= this.playerTypeCount[res.bowler[i].role]['selected'] + 1;
		        this.credit['used'] = this.credit['used'] + parseFloat(res.bowler[i].credit);
		        this.team['currentSize']=this.team['currentSize']+1;
		        this.perteamsize[res.bowler[i].team]['selected']= this.perteamsize[res.bowler[i].team]['selected'] + 1;
			}

        
            },
           err=>{}
           );
	}
  
	getplayerslist() {    
     	 this.http.get('api/getallplayers?matchkey='+this.matchid+'&token='+this.token)  
		.subscribe(
		res => { 
		
          if(res.length>0){
			if (res[0].status!=0) { 
				this.playerslist = res; 
				if(res.length>0){
					if((this.editteam!="" && this.editteam!=undefined) || (this.cloneid!="" && this.cloneid!=undefined) ){
						this.getjointeamlist(); 
					} 
				}  
				
			} 
			else {  
				this.playerslist = []; 
				this.router.navigate(['']);
			}
		  }
		  else{
			this.router.navigate(['']);		
			return this.toastr.error('someting went wrong.'); 	  
		  }
		},
		err => { });
	}
	
	 

	addPlayer(sPlayer) { 
		if(sPlayer.isSelected==false){
		if (this.team['currentSize'] >= this.team['totalSize'])
			return this.toastr.error('You can select maximum 11 players in your team ');
		if ((this.credit['max'] - this.credit['used']) < sPlayer.credit)
			return this.toastr.error('You Have Insufficent Credits');
		if (sPlayer.role && this.playerTypeCount[sPlayer.role]['selected'] >= this.playerTypeCount[sPlayer.role]['max'])
			return this.toastr.error('Maximum '+this.playerTypeCount[sPlayer.role]['max']+' '+ sPlayer.role + ' allowed');
		if (!sPlayer.role)
			return this.toastr.error('Invalid player type');
		var getteamsize = this.team['currentSize'];
		var getplayerrole = sPlayer.role;
		if(this.playerTypeCount[sPlayer.role]['selected']>=this.playerTypeCount[sPlayer.role]['min']){
			if(this.team['currentSize']>8 && (this.playerTypeCount['bowler']['selected'] <2  || this.playerTypeCount['batsman']['selected']<2  || this.playerTypeCount['keeper']['selected']==0 || this.playerTypeCount['allrounder']['selected']==0) ){
				if(this.playerTypeCount['bowler']['selected']<2){
					return this.toastr.error('Bowler Missing. Minimum '+this.playerTypeCount['bowler']['min']+' required.');
				}
				else if(this.playerTypeCount['batsman']['selected']<2){
					return this.toastr.error('Batsman Missing. Minimum '+this.playerTypeCount['batsman']['min']+' required.');
				}
				else if(this.playerTypeCount['keeper']['selected']<1){
					return this.toastr.error('Keeper Missing. Minimum '+this.playerTypeCount['keeper']['min']+' required.');
				}
				else if(this.playerTypeCount['allrounder']['selected']<1){
					return this.toastr.error('Allrounder Missing. Minimum '+this.playerTypeCount['allrounder']['min']+' required.');
				}
			}

			if(this.team['currentSize']>8){
				if(this.playerTypeCount['keeper']['selected']==0 && this.playerTypeCount['allrounder']['selected']==0)
				{
					if(this.playerTypeCount['keeper']['selected']==0){
						return this.toastr.error('Keeper Missing. Minimum '+this.playerTypeCount['keeper']['min']+' required.');
					}
					else if(this.playerTypeCount['allrounder']['selected']==0){
						return this.toastr.error('Allrounder Missing. Minimum '+this.playerTypeCount['allrounder']['min']+' required.');
					}
				}
			}

			if(this.team['currentSize']>=7){
				if((this.playerTypeCount['batsman']['selected']==6 && this.playerTypeCount['allrounder']['selected']>1) || (this.playerTypeCount['bowler']['selected']==6 && this.playerTypeCount['allrounder']['selected']>1))  
				{
					if(this.playerTypeCount['batsman']['selected']==6 && this.playerTypeCount['allrounder']['selected']>1){
						return this.toastr.error('Bowler Missing. Minimum '+this.playerTypeCount['bowler']['min']+' required.');
					}
					if(this.playerTypeCount['bowler']['selected']==6 && this.playerTypeCount['allrounder']['selected']>1){
						return this.toastr.error('Batsman Missing. Minimum '+this.playerTypeCount['batsman']['min']+' required.');
					}
				}
			}
		}
		if(this.team['currentSize']==10){
			
			if((this.playerTypeCount['batsman']['min'] > this.playerTypeCount['batsman']['selected'] && sPlayer.role!='batsman') || (sPlayer.role=='batsman' && this.playerTypeCount['batsman']['selected']<this.playerTypeCount['batsman']['min'])){
				
				if((sPlayer.role=='batsman') && (this.playerTypeCount['batsman']['selected']==this.playerTypeCount['batsman']['min']-1)){

				}
				else{
					return this.toastr.error('Batsman Missing. Minimum '+this.playerTypeCount['batsman']['min']+' required.');
				}

			}
			if((this.playerTypeCount['bowler']['min'] > this.playerTypeCount['bowler']['selected'] && sPlayer.role!='bowler') || (sPlayer.role=='bowler' && this.playerTypeCount['bowler']['selected']<this.playerTypeCount['bowler']['min'])){
				
				if((sPlayer.role=='bowler') && (this.playerTypeCount['bowler']['selected']==this.playerTypeCount['bowler']['min']-1)){

				}else{
					return this.toastr.error('Bowler Missing. Minimum '+this.playerTypeCount['bowler']['min']+' required.');
				}
			}
			else if((this.playerTypeCount['allrounder']['min'] > this.playerTypeCount['allrounder']['selected'] && sPlayer.role!='allrounder')){
				return this.toastr.error('allrounder Missing. Minimum '+this.playerTypeCount['allrounder']['min']+' required.');
			}
			else if(this.playerTypeCount['keeper']['min'] > this.playerTypeCount['keeper']['selected'] && sPlayer.role!='keeper'){
				return this.toastr.error('keeper Missing. Minimum '+this.playerTypeCount['keeper']['min']+' required.');
			}
		}
		if(this.perteamsize[sPlayer.team]['selected']>=this.perteamsize[sPlayer.team]['max'])
		return this.toastr.error('only 7 players are allowed of one team.');
		let pos = this.getNextVacantPostionForRole(sPlayer.role);
		this.playerslist[this.findObjIndexInArray('id', sPlayer.id, this.playerslist)].isSelected = true;
		this.resultplayer.push(this.playerslist[this.findObjIndexInArray('id', sPlayer.id, this.playerslist)]);
		this.resultplayer[this.findObjIndexInArray('id', sPlayer.id, this.resultplayer)].position = pos;
		 this.playerTypeCount[sPlayer.role]['selected']= this.playerTypeCount[sPlayer.role]['selected'] + 1;
		if(this.playerTypeCount[sPlayer.role]['selected']<this.playerTypeCount[sPlayer.role]['min']){
        	this.playerTypeCount[sPlayer.role]['color'] = 'redcolor';
        }
        if(this.playerTypeCount[sPlayer.role]['selected']>=this.playerTypeCount[sPlayer.role]['min']){
        	this.playerTypeCount[sPlayer.role]['color'] = 'yellowcolor';
        }
        if(this.playerTypeCount[sPlayer.role]['selected']==this.playerTypeCount[sPlayer.role]['max']){
        	this.playerTypeCount[sPlayer.role]['color'] = 'greencolor';
        }
		this.perteamsize[sPlayer.team]['selected']= this.perteamsize[sPlayer.team]['selected'] + 1;
		this.credit['used'] = this.credit['used'] + parseFloat(sPlayer.credit);
		this.team['currentSize']=this.team['currentSize']+1;
		if(this.team['currentSize']==this.team['totalSize']){
			$("#choosecaptainmodal").modal('show');
		} 
	}
	else{
		this.deletePlayer(sPlayer);
	}
	}

	deletePlayer(rPlayer) {
		if (this.findObjIndexInArray('id', rPlayer.id, this.resultplayer) >= 0) {
			this.playerslist[this.findObjIndexInArray('id', rPlayer.id, this.playerslist)].isSelected = false;
			this.resultplayer.splice(this.findObjIndexInArray('id', rPlayer.id, this.resultplayer), 1);
		  
			this.playerTypeCount[rPlayer.role]['selected'] = this.playerTypeCount[rPlayer.role]['selected'] - 1;
			if(this.playerTypeCount[rPlayer.role]['selected']<this.playerTypeCount[rPlayer.role]['min']){
		                	this.playerTypeCount[rPlayer.role]['color'] = 'redcolor';
		                }
		                if(this.playerTypeCount[rPlayer.role]['selected']>=this.playerTypeCount[rPlayer.role]['min']){
		                	this.playerTypeCount[rPlayer.role]['color'] = 'yellowcolor';
		                }
		                if(this.playerTypeCount[rPlayer.role]['selected']==this.playerTypeCount[rPlayer.role]['max']){
		                	this.playerTypeCount[rPlayer.role]['color'] = 'greencolor';
		                }
			this.perteamsize[rPlayer.team]['selected'] = this.perteamsize[rPlayer.team]['selected']-1;
			this.credit['used'] = this.credit['used'] - parseFloat(rPlayer.credit);
			this.team['currentSize']= this.team['currentSize']-1;
		} else {
			return this.toastr.error("Invalid action");
		}

	}
 
	findObjIndexInArray(key, value, array) {
		var index = array.findIndex(function (elem) {
			return elem[key] == value;
		})
		return index
	}
	 myteamsF(){ 
		this.router.navigate(['/myteams'], { queryParams: {getmatchkey: btoa(this.matchid)}}); 
	}
	 
   machdetail(){
		let formData = new FormData();
		formData.append('matchkey', this.matchid);  
		this.authttp.post('api/getmatchdetails?token='+this.token,formData) 
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

	getNextVacantPostionForRole(role){
	 return this.playerFieldPosition.filter(position => {
				if(position.positionFor==role && position.placed==false){
					return true;
				}else{
					return false;
				}
            })[0]
	}


	nextbtn(){		
		if(this.team['currentSize'] == this.team['totalSize']){			
			var getplayers = JSON.stringify(this.resultplayer);
			this.router.navigate(['/choose-captain'], { queryParams: {matchid: btoa(this.matchid),uteamid:btoa(this.uteamid),getresultplayer:btoa(getplayers)}});  
		}
		else{
			this.toastr.error('Please complete your team first.');
			return false;
		}
		
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
