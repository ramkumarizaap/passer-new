import { Injectable } from '@angular/core';

@Injectable()
export class UrlSettings{
  private apiUrl:string;
  constructor(){
    let protocol = 'http://';
    if (location.href.indexOf('https') !== -1) {
      protocol = 'https://';
    }

    this.apiUrl = protocol + 'localhost/passer-new/api/';
    if (location.href.indexOf('shopcsw') !== -1) {
      this.apiUrl = protocol + 'shopcsw.com/api/index.php';
    }
    
  }

  /**
   * getApiUrl
   */
  public getApiUrl() {
    return this.apiUrl;
  }
}