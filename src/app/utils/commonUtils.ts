import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { TitleCasePipe } from '@angular/common';
import { OnInit, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common',
 })
export class CommonUtils implements OnInit{
  constructor(
    public nav: NavController,
    public ngZone: NgZone,
    public router: Router,
    public loader: LoadingController,
    public alertController: AlertController,
    public titlecasePipe: TitleCasePipe
  ){

  }
  ngOnInit(){

  }
  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Loading...',
    });
    return await loading.present();
  }

  loaderDismiss(data:any = null,page=null,navigate:boolean = false){
    setTimeout(() => {
      this.loader.dismiss();
      if(data !== null)
        this.presentAlert(data,page);
      else if( data === null && page !== '' && navigate === true )
        this.router.navigateByUrl(page);
    }, 2000);
  }

  async presentAlert(data,page) {
    const alert = await this.alertController.create({
      header: this.titlecasePipe.transform(data.status),
      message: data.message,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: (blah) => {
            if(page !== null)
            this.nav.navigateRoot(page);
          }
        }
      ]
    });
    await alert.present();
  }

}