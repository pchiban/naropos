import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { RefdataService } from './shared/refdata/refdata.service';
import { ModalModule } from 'ng2-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { BusyModule } from 'angular2-busy';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './shared/alert/alert.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LicenseComponent } from './license/license.component';
import { LicenseFormComponent } from './license/license-form/license-form.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

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
    LicenseFormComponent,
    ForbiddenComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule,
    BusyModule,
    ModalModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    AuthenticationService,
    AlertService,
    LoginActivate,
    UserService,
    LicenseService,
    HttpService,
    RefdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
