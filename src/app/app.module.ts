import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Plugin
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
//import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@awesome-cordova-plugins/media-capture/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [
            HttpClientModule,
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule
          ],
  providers: [
              Geolocation,
              StatusBar,
              SocialSharing,
              SplashScreen,
              Camera,
              BarcodeScanner,
              SocialSharing,
              SQLite,
              MediaCapture,
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
             ],
  bootstrap: [AppComponent],
})
export class AppModule {}
