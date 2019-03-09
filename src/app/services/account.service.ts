import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, BehaviorSubject,of, from, throwError } from 'rxjs';
import { map,mergeMap,catchError } from "rxjs/operators";
// import { UrlSettings } from '../utils/urlConfig';

@Injectable({
  providedIn: 'root'
})

export class AccountService{
  // url = "http://localhost/passer-new/api/";
  public httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json',
      }),
  };

  constructor(private http: HttpClient){}

  public registerUser(form){
    return this.http.post('accounts/register',form,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }

  public checkFingerLogin(form){
    return this.http.post('accounts/fingerprint_login',form,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }

  public checkLogin(form){
    return this.http.post('accounts/login',form,this.httpOptions).pipe(map(res=>{
      return res;
    }),catchError(err=>throwError(err)));
  }

}