import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { LogDashboardComponent } from './dashboard/log-dashboard/log-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  // {
  //   path: 'admin',
  //   loadChildren: './admin/admin.module#AdminModule'
  // },
  { path: 'log/dashboard', component: LogDashboardComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }