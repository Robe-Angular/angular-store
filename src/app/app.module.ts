import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { DotdotdotPipe } from './pipes/dotdotdot.pipe';
import { ConsumerDataComponent } from './components/consumer-data/consumer-data.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgottenPasswordComponent,
    DotdotdotPipe,
    ConsumerDataComponent,
    ListUsersComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi:true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
