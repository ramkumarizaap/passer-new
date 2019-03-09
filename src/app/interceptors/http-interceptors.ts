import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

//Providers
import { UrlSettings } from './../utils/urlConfig';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  private _baseURL: string;
  
  constructor(private appSettingsService: UrlSettings) {    
    this._baseURL = this.appSettingsService.getApiUrl();
  }; //end constructor

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: { is_mobile_app: "1" },
      url: (request.url.indexOf('http://') === 0 || request.url.indexOf('https://') === 0)?request.url:this._baseURL + request.url,
      // reportProgress: true
    });
    

    //Make request
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      return event;
    }));
  };//end intercept

};