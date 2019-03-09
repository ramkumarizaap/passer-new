import { Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController, Content } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AppsService } from '../../services/apps.services';
import { CommonUtils } from '../../utils/commonUtils';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  appList: any;
  @ViewChild(Content) content: Content;
  errorMsg: any = {status:'Sorry',message:'Something Went Wrong!!!'};
  constructor(
    public changeDetectorRefs: ChangeDetectorRef,
    public ngZone: NgZone,
    public commonUtils: CommonUtils,
    public alertController: AlertController,
    public titlecasePipe: TitleCasePipe,
    public appsService: AppsService,
    public router: Router,
    public nav: NavController,public actionSheetController: ActionSheetController) { 
    }
    
    ngOnInit() {
    }

  getApps(){
    this.appList = [];
    this.commonUtils.presentLoading();
    let uuid = 'abcdefghij';
    this.appsService.getAppsList(uuid).subscribe( (res:any)=>{
      if(res.status === 'error')
      {
        this.commonUtils.loaderDismiss(res);
      }
      else{
        this.commonUtils.loaderDismiss();
      }
      this.appList = res.data;
      this.changeDetectorRefs.detectChanges();
      console.log('Apps',this.appList);
    },err=>{
      this.commonUtils.loaderDismiss(this.errorMsg);
      console.log('Err Apps',err);
    });
  }

  ionViewDidEnter(){
    this.getApps();
  }

  addApps(){
    this.nav.navigateForward('/apps/add');
  }

  async showAction(id = null,arr= null){
    let actionSheet =  await this.actionSheetController.create({
      header: 'Facebook',
      buttons: [
        {
          text: 'Add Favourites',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Edit',
          icon: 'md-create',
          handler: () => {
            let params = {
               queryParams:{
                 appname: arr.appname,
                 id: arr.id,
                 details: JSON.stringify(arr.details)
               }
            } 
            this.router.navigate(['/apps/add/'],params);
          }
        },
        {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm(id);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  delApp(id)
  {
    //this.commonUtils.presentLoading();
    this.appsService.deleteApp(id).subscribe((res:any)=>{
      console.log('Del App',res);
      // this.commonUtils.loaderDismiss(null,'apps',true);
      this.getApps();
    },err=>{
      this.commonUtils.loaderDismiss(this.errorMsg);
    });
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.delApp(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
