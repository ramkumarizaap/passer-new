import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,    
    RouterModule.forChild([{
      path:'',
      component: AppsComponent
    }])
  ],
  declarations: [AppsComponent, AddComponent]
})
export class AppsModule { }
