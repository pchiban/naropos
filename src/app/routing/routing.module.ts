import { LicenceComponent } from './../licence/licence.component';
import { LoginActivate } from './../login/login-activate';
import { UserComponent } from './../user/user.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent, canActivate: [LoginActivate] },
  { path: 'licencies', component: LicenceComponent, canActivate: [LoginActivate] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);