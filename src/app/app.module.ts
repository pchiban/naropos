import { DatePipe } from '@angular/common/src/pipes/date_pipe';
import { HttpService } from './shared/http/http.service';
import { LicenseService } from './license/license.service';
import { UserService } from './user/user.service';
import { LoginActivate } from './login/login-activate';
import { AlertService } from './shared/alert/alert.service';
import { AuthenticationService } from './login/authentication.service';
import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './shared/alert/alert.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LicenseComponent } from './license/license.component';
import { LicenseFormComponent } from './license/license-form/license-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    UserComponent,
    UserFormComponent,
    LicenseComponent,
    LicenseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    AlertService,
    LoginActivate,
    UserService,
    LicenseService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
