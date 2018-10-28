import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsComponent } from './entries/apps/apps.component';
import { AppsModule } from './entries/apps/apps.module';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    // FingerprintAIO,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
