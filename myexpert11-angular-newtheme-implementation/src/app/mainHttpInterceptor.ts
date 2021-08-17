import {HttpHandler,HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('gettoken');
       console.log('inside Interceptor');
        const request=req.clone({
            headers:req.headers.append('Authorization', 'Bearer ' + token)
        })

        return next.handle(request);
    }

}