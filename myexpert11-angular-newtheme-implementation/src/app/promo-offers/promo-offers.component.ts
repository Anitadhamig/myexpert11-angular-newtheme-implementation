import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientService, HeaderService, HttpIntercepter, LoaderService,CommonService, ManualAuthService, NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-promo-offers',
  templateUrl: './promo-offers.component.html',
  styleUrls: ['./promo-offers.component.css']
})
export class PromoOffersComponent implements OnInit { 
  public loginid:any;
  public offers:any;
  token: string;
   constructor(private router:Router,private http: HttpClientService, private headerService: HeaderService, private loader:LoaderService, private activatedRoute: ActivatedRoute,private commons:CommonService,private toastr: ToastrService,private fb: FormBuilder,private auth: ManualAuthService, private authttp: HttpIntercepter,private notification:NotificationService, private domSanitizer: DomSanitizer) {
 
      this.offers="";
      this.loginid="";
      this.notification.getHeaderText('Promo Offers'); 
 
      if(!(localStorage.getItem('token'))){
        this.router.navigate(['']);
      }
      else{
       this.loginid = localStorage.getItem('token');
       this.token = localStorage.getItem('gettoken');
      } 
      $("#localpagesSec").modal('hide'); 
	  this.promo_offers();

   }

  ngOnInit() {
  }
getEmbededUrl(videourl){
      return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videourl);
  }

   promo_offers()  {  
      return this.http.get('api/offer_promo'+'?token='+this.token)
    .subscribe(
    res => {
      this.offers = res;   
    },
    err => { });
  }
}