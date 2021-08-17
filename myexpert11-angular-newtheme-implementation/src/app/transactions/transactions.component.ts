import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { API } from '../config'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, LoaderService,CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService} from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  loginid:any;
  userdata:any;
  history:any;
  getsingletransition:any;
    public userdatass: any;
    public userdetailse: any;
    public trhistory: any;
  token: string;

  constructor(private authttp: HttpIntercepter,private authSer:AuthService,private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2,private notification:NotificationService) {	
  this.notification.getHeaderText('My Transactions'); 
     this.notification.getFirstMenu('profile');
	this.userdata = {};
    this.history = []; 
    this.trhistory = []; 
        this.userdatass = [];
        this.userdetailse = [];
    this.getsingletransition = []; 
		if(!(localStorage.getItem('token'))){
		  this.router.navigate(['']);
		}
		else{
      this.loginid = localStorage.getItem('token');
      this.token = localStorage.getItem('gettoken');
		}
    this.gettransaction();
        this.accountdata();
        this.userfulldata();
   }

  ngOnInit() {
  }
 

	userfulldata(){
		return this.http.get('api/userfulldetails?token='+this.token)
	        .subscribe(
            res => { 
            	this.userdetailse = res[0];
		console.log("mobile number"+JSON.stringify(res));
				
            },
            err => { if(err.status===400){
					this.authSer.logout();
				}
            }); 
	}
 gettransaction(){ 
	    this.loader.start();
  		return this.http.get('api/mytransactions?userid='+this.loginid+'&token='+this.token)
	        .subscribe(
            res => {
            	this.loader.stop(); 
              this.history = res;    
            },
            err => { });	
  }

    accountdata() {
        var self = this;
        return this.http.get('api/mywalletdetails?userid=' + this.loginid+'&token='+this.token)
            .subscribe(
                res => {
                    this.userdatass = res[0]; 
                },
                err => {});
    }
    transactionhistory(id) { 
        return this.http.get('api/detailsTransactions?userid=' + this.loginid+'&trid=' + id+'&token='+this.token)
            .subscribe(
                res => {
                    $('#transactionhistory').modal('show')
                    this.trhistory = res;  
                    // console.log(this.trhistory);
                },
                err => {});
    }
  showtrans(id){
	  $("#trassaction_details"+id).modal('show');  
  }
}
