import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

//import the authentication JWT HTTP interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { CustomUtilitiesModule } from './custom-utilities/custom-utilities.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CustomUtilitiesModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	},
	{
		provide: ErrorHandler,
		useClass: ErrorHandler
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
