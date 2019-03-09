import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpInterceptorProvider } from './interceptors/http-interceptors';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsComponent } from './entries/apps/apps.component';
import { AppsModule } from './entries/apps/apps.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlSettings } from './utils/urlConfig';
import { CommonUtils } from './utils/commonUtils';
import { TitleCasePipe } from '@angular/common';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    UniqueDeviceID,
    FingerprintAIO,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true
    },
    UrlSettings,
    CommonUtils,
    TitleCasePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
