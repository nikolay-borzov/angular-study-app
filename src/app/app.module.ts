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

import { MatToolbarModule, MatListModule } from '@angular/material';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [AppComponent, BreadcrumbsComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // Intercepts HTTP requests and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    MatToolbarModule,
    MatListModule,
    LoginModule,
    AppRoutingModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
