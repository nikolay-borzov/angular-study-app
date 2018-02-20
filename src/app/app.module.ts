import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Fake API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { SharedModule } from './shared.module';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';

import { LoginModule } from './pages/login/login.module';

const fakeServiceDelay = 500;

@NgModule({
  declarations: [AppComponent, BreadcrumbsComponent, UserWidgetComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Intercepts HTTP requests and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: fakeServiceDelay
    }),
    SharedModule,
    LoginModule,
    AppRoutingModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
