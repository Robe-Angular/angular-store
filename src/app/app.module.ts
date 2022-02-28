import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { DotdotdotPipe } from './pipes/dotdotdot.pipe';
import { ConsumerDataComponent } from './components/consumer-data/consumer-data.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ModelsBootComponent } from './components/models-boot/models-boot.component';
import { ModelsBootAdminComponent } from './components/models-boot-admin/models-boot-admin.component';
import { CreateModelBootComponent } from './components/create-model-boot/create-model-boot.component';

import { UserGuard } from './services/user.guard';
import { NoUserGuard } from './services/no-user.guard';
import { AdminGuard } from './services/admin.guard';
import { UserService } from './services/user.service';
import { ModelBootService } from './services/modelBoot.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ImageNamePipe } from './pipes/image-name.pipe';
import { ModelBootBuyComponent } from './components/model-boot-buy/model-boot-buy.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgottenPasswordComponent,
    DotdotdotPipe,
    ConsumerDataComponent,
    ListUsersComponent,
    ModelsBootComponent,
    ModelsBootAdminComponent,
    CreateModelBootComponent,
    PaginationComponent,
    ImageNamePipe,
    ModelBootBuyComponent
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
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    ModelBootService,
    UserGuard,
    NoUserGuard,
    AdminGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi:true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
