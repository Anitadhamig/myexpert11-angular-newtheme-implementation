import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any; 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('header') header: ElementRef;
  public getcsrftoken:any;
  public getbannersshow:any;
  public codevalue:any;
  public usrid:any;
  public refercodeearn:any;
  constructor(private router:Router,  private http: HttpClientService, private authttp: HttpIntercepter, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute, private commons:CommonService, private toastr: ToastrService, private fb: FormBuilder, private auth: ManualAuthService) {     
        this.getcsrftoken="";
        this.getbannersshow=[];
		// this.mybannersshow();
		this.codevalue="";
		this.usrid=""; 
		this.refercodeearn="";
		  
	  if(localStorage.getItem('sessionrefercode')){		  
		 this.refercodeearn = localStorage.getItem('sessionrefercode');
		 this.codevalue = localStorage.getItem('sessionrefercode');
		 this.usrid = localStorage.getItem('sessionreferuserid');
		}
		 
		 
		}
		@HostListener('window:scroll', [])
		onWindowScroll() {
			if(window.pageYOffset > 90){
				this.header.nativeElement.classList.add('header-shrink');
			}
			else{
				this.header.nativeElement.classList.remove('header-shrink');
			}
		}

  ngOnInit() {
	  if (this.auth.isLoggedIn()) {
           this.router.navigate(['home']);
			}
		   this.getcsrftoken = localStorage.getItem('csrftoken');
  }
  
   
  
  downloadlink(){   
 		return this.http.get("api/countclick?userid="+this.usrid+"&appclick='1'")  
            .subscribe(
            res => {  
			console.log(res.success); 
			window.location.href = "https://www.myexpert11.com/apk/myexpert11.apk";
            },
            err => {
			window.location.href = "https://www.myexpert11.com/apk/myexpert11.apk";
            }); 
  } 
  // mybannersshow(){ 
	   // this.loader.start();
       // this.http.get('api/getversion') 
	   // .subscribe(
	   // res => { 
	    // this.loader.stop();  
		 
		 
		// this.getbannersshow = res[0].banner.filter(function (e) {
			// return e.where_to_show == 'profile';
		// });
		
		// if(this.getbannersshow[0].where_to_show != ''){
			// alert('hi');
		// }else{
			// alert('hello');
		// }
		
		 // console.log(this.getbannersshow);
       // },err => {});
  // }
}
