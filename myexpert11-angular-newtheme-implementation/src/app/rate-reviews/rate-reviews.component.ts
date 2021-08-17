import {    Component, OnInit}from '@angular/core';
import {    Router, ActivatedRoute}from '@angular/router';
import {    ElementRef, Renderer2}from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {    API}from '../config';
import {    FormBuilder, FormGroup, Validators, ReactiveFormsModule}from '@angular/forms';
import {    HttpClientService, HeaderService, LoaderService, CommonService, ManualAuthService, HttpIntercepter, NotificationService, AuthService}from '../app.service';
import {    ToastrService}from 'ngx-toastr';
import {Globals}from '../global';
declare let $: any;

@Component({
  selector: 'app-rate-reviews',
  templateUrl: './rate-reviews.component.html',
  styleUrls: ['./rate-reviews.component.css']
})
export class RateReviewsComponent implements OnInit { 
    public loginid: any; 
    public userdatass: any; 
    public reviewsform: any; 
    public bankimageget: any; 
    public statusreview: any; 
    public allreview: any; 
    public site_review: any; 
	url:any;
	token: string;

    constructor(private router: Router, private authSer:AuthService,private http: HttpClientService, private headerService: HeaderService, private authttp: HttpIntercepter, private loader: LoaderService, private activatedRoute: ActivatedRoute, private commons: CommonService, private toastr: ToastrService, private fb: FormBuilder, private auth: ManualAuthService, private elementRef: ElementRef, private renderer: Renderer2, private notdata: Globals, private notification: NotificationService, private domSanitizer: DomSanitizer) {
        this.notification.getHeaderText('Rate and Reviews');  
        this.loginid = "";
        this.userdatass = [];
        this.statusreview = [];
        this.allreview = [];
        this.site_review = [];
        this.reviewsform = {
        	"message":"",
        	"youtubelink":"", 
        	"other":""
        };
        if (!(localStorage.getItem('token'))) {
            this.router.navigate(['']);
        } else {
			this.loginid = localStorage.getItem('token');
			this.token = localStorage.getItem('gettoken');
        }
        this.notification.getFirstMenu('profile');
        this.notification.getSecondMenu('referfriend'); 
        this.accountdata();
        this.allreviews();
		this.site_reviews();
        this.checkreviews();
    }
    ngOnInit() {}
 
   accountdata()  {
    var self=this;
      this.loginid = localStorage.getItem('token');
      return this.http.get('api/userfulldetails?token='+this.token)
    .subscribe(
    res => {
      this.userdatass = res[0];  
      console.log(this.userdatass);
    },
    err => {if(err.status===400){
					this.authSer.logout();
				} });
  }
getEmbededUrl(videourl){
      return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videourl);
  }

	Previewimage(event:any) {			 
	  if (event.target.files && event.target.files[0]) {
	  	    this.bankimageget = event.target.files[0];
			var reader = new FileReader();
			reader.onload = (event:any) => {
			this.url = event.target.result; 
		}
		reader.readAsDataURL(event.target.files[0]);
	  }
	}


  submitreview(){ 
  	if (this.reviewsform.message=="" || this.reviewsform.message==undefined) { 
			this.toastr.error('please add your review');  
	  }
  	else if (this.reviewsform.other=="" || this.reviewsform.other==undefined) { 
			this.toastr.error('please rate MyExpert11');  
	  }
  	else if (this.reviewsform.youtubelink=="" && this.bankimageget=="") { 
			this.toastr.error('please add youtube url or image');  
	  }
	  else{
	    this.loader.start();
	    let formData = new FormData();
	    console.log(this.bankimageget);
	    formData.append('userid', this.loginid); 
	    formData.append('rate', this.reviewsform.other); 
	    formData.append('review', this.reviewsform.message); 
	    formData.append('youtubelink', this.reviewsform.youtubelink); 
	    formData.append('file', this.bankimageget); 
	    this.authttp.post('api/addreviews'+'?token='+this.token,formData)
	  .subscribe(
	    res => {
	       this.loader.stop();
	       console.log(res);
	        if(res.status!=0){
	            this.toastr.success(res.msg); 
	            this.reviewsform.other = "";
	            this.reviewsform.message = "";
	            this.reviewsform.youtubelink = "";
	            this.bankimageget = "";              
              this.allreviews();
              this.checkreviews();
	        }else{
	          	this.toastr.error(res.msg);
	        }
	      },
	     err => { });
	     
	       this.loader.stop();
	   }
   }
   
	allreviews(){ 
		  return this.http.get('api/allreviews?userid='+this.loginid+'&token='+this.token)
		.subscribe(
		res => {
		  this.allreview = res;  
		  console.log(this.allreview);
		},
		err => { });
	}
	
	site_reviews(){ 
		  return this.http.get('api/site_review'+'?token='+this.token)
		.subscribe(
		res => {
		  this.site_review = res;  
		},
		err => { });
	}
	
	
   checkreviews(){ 
      return this.http.get('api/mystatusreview?userid='+this.loginid+'&token='+this.token)
    .subscribe(
    res => {
      this.statusreview = res[0];   
      console.log(this.statusreview); 
    },
    err => { });
  }

}