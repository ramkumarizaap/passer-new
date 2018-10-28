import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  constructor(public nav: NavController,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  addApps(){
    this.nav.navigateForward('/apps/add');
  }

  async showAction(){
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
            this.nav.navigateForward('/apps/add',true);
          }
        },
        {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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

}
