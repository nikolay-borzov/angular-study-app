import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';

// Pages
// TODO: Figure out how to handle non-existing pages
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // Intercepts HTTP requests and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
    LoginPageModule
  ],

  declarations: [AppComponent],

  bootstrap: [IonicApp],

  entryComponents: [AppComponent],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
