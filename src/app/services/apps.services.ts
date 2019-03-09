import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, BehaviorSubject,of, from, throwError } from 'rxjs';
import { map,mergeMap,catchError } from "rxjs/operators";
// import { UrlSettings } from '../utils/urlConfig';

@Injectable({
  providedIn: 'root'
})
export class AppsService{

  public httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json',
      }),
  };

  constructor(private http: HttpClient){}

  public addApps(form){
    return this.http.post('mobile_app/add',form,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }

  public getAppsList(id:any){
    return this.http.get('mobile_app/list/'+id,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }

  public deleteApp(id){
    return this.http.delete('mobile_app/remove/'+id,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }
}