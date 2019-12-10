import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { CustomFormElementsModule } from 'src/app/custom-form-elements/custom-form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent,
      ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CustomFormElementsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class UserModule { }
