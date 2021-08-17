import { Injectable } from '@angular/core';
import { API } from './config';
 import { ToastrModule } from 'ngx-toastr';
import { Http, Headers } from '@angular/http'; 
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router'; 
import { UserData } from './shared.objects';
import {Globals} from './global';
import { CanActivate }    from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppService {

  constructor() { }

}

@Injectable()
export class HeaderService {
    headerSource = new Subject<string>();
    header = this.headerSource.asObservable();

    updateHeader(mode: string) {
        this.headerSource.next(mode);
    }
}


@Injectable()
export class HttpClientService {
    serviceBase:any;
    constructor(private http: Http ,
        ){
			this.serviceBase = API;
	}
	createAuthorizationHeader(headers: Headers) {
       let token = localStorage.getItem('gettoken');
       headers.append('Content-Type', 'application/json'); 
       headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
       if (!token) return;
       headers.append('Authorization', 'Bearer ' + token);
	   
       
   }
	post(url, data){
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this.serviceBase+url, data, {
		  headers: headers
        })
        // .catch(error => this.handleError(error));
    }
	get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.serviceBase+url, {headers:headers})
        .map(res => res.json())
        // .catch(error => this.handleError(error));
    }

   
	 
}
@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private headerService: HeaderService) { }

    me(): UserData {
        let me: UserData = new UserData;
        if (this.isLoggedIn()) {
            me = JSON.parse(localStorage.getItem('me'));
        }
        return me;
    }

    getRole(): string {
        let me = this.me();
        if (me) {
            return me.role;
        } else {
            return 'guest';
        }
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem('token');
        return !!token;
    }

    isAdmin(): boolean {
        return this.getRole() === 'admin';
    }

    isSuperAdmin(): boolean {
        return this.getRole() === 'superAdmin';
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('signup');
        localStorage.removeItem('me');
        localStorage.removeItem('gettoken');
        this.headerService.updateHeader('signup');
        this.router.navigate(['']);
    }
}
@Injectable()
export class LoaderService {
    loaderSource = new Subject<boolean>();
    loader = this.loaderSource.asObservable();

    start() {
        this.loaderSource.next(true);
    }

    stop() {
        this.loaderSource.next(false);
    }

}

@Injectable()
export class HttpIntercepter {
	public serviceBase:any;
    constructor(private http: Http,
        private auth: AuthService,
        private toastr: ToastrModule,
        private loader: LoaderService) {
			this.serviceBase = API;
		}

    createAuthorizationHeader(headers: Headers) {
        let token = localStorage.getItem('gettoken');
        if (!token) return;
        headers.append('Authorization', 'Bearer ' + token);
       
    }

    handleError(error) {
        if (error.status === 401 ) {
            if (this.auth.isLoggedIn()) {
                // this.toastr.error('Access Denied!', 'Unauthorized');
                this.auth.logout();
            }
        }

        if(error.status=== 400){
            this.auth.logout();
        }
        this.loader.stop();
        return Observable.throw(error);
    }

    get(url, extraHeader?: Headers) {
        let headers = !(extraHeader) ? new Headers() : extraHeader;
        this.createAuthorizationHeader(headers);
        return this.http.get(API+url, { headers: headers })
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    post(url, data, extraHeader?: Headers) {
        let headers = !(extraHeader) ? new Headers() : extraHeader;
        this.createAuthorizationHeader(headers);
        return this.http.post(API+url, data, { headers: headers })
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    put(url, data, extraHeader?: Headers) {
        let headers = !(extraHeader) ? new Headers() : extraHeader;
        this.createAuthorizationHeader(headers);
        return this.http.put(API+url, data, { headers: headers })
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    patch(url, data, extraHeader?: Headers) {
        let headers = !(extraHeader) ? new Headers() : extraHeader;
        this.createAuthorizationHeader(headers);
        return this.http.patch(API+url, data, { headers: headers })
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    delete(url, extraHeader?: Headers) {
        let headers = !(extraHeader) ? new Headers() : extraHeader;
        this.createAuthorizationHeader(headers);
        return this.http.delete(API+url, { headers: headers })
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }
}
 


@Injectable()
export class ManualAuthService {
    constructor(
        private router: Router,
        private headerService: HeaderService) { }

    me(): UserData {
        let me: UserData = new UserData;
        if (this.isLoggedIn()) {
            me = JSON.parse(localStorage.getItem('me'));
        }
        return me;
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem('gettoken');
        return !!token;
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('signup');
        localStorage.removeItem('me');
        this.headerService.updateHeader('signup');
        this.router.navigate(['']);
    }
}
@Injectable()
export class CommonService {
    public userdata:any;
    public currentuserinformation:any;
    public loginid:any;
    constructor(private http: HttpClientService,private router: Router,private headerService: HeaderService) {
        this.userdata=[];
        this.currentuserinformation=[];
        this.loginid="";
    } 
}
@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    return true;
  }
}

@Injectable()
export class NotificationService {

   constructor(private http: HttpClientService,private headerService: HeaderService,private loader: LoaderService, public global : Globals, private router: Router) {
        
        
    }
    getHeaderText(headertext){
        this.global.headertext = headertext;
    }
    getFirstMenu(firstmenu){
        this.global.firstmenu = firstmenu;
    }
    getSecondMenu(secondmenu){
        this.global.secondmenu = secondmenu;
    }
    

}
