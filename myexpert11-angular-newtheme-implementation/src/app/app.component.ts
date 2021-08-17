import { Component } from '@angular/core';
import { HeaderService,ManualAuthService, LoaderService, HttpClientService } from './app.service';
import { API } from './config';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import {
  Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mode: string;
  subscription: Subscription;
  loading: boolean = false;
  load: boolean = false;
  public usertoken:any;
  public code:any;
	constructor(private auth: ManualAuthService,private router: Router,private headerService: HeaderService, private loaderService: LoaderService, private toastr: ToastrService, private authHttp:HttpClientService,private activatedRoute: ActivatedRoute){
		if (this.auth.isLoggedIn()) {
			this.mode='login';
		}else{
			this.mode='signup';
		}
		this.activatedRoute.queryParams.subscribe(params => {
          this.code = params['code'];
          this.usertoken = params['usertoken']; 
  		});
	}
	ngOnInit(){
		this.subscription = this.headerService.header.subscribe((mode) => {
			this.mode = mode;
		});
		this.subscription = this.loaderService.loader.subscribe((mode) => {
			this.load = mode;
		})
	} 
	
}
