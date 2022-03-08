//Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ConsumerDataComponent } from './components/consumer-data/consumer-data.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ModelsBootComponent } from './components/models-boot/models-boot.component';
import { ModelsBootAdminComponent } from './components/models-boot-admin/models-boot-admin.component';
import { CreateModelBootComponent } from './components/create-model-boot/create-model-boot.component';
import { ModelBootBuyComponent } from './components/model-boot-buy/model-boot-buy.component';

import { UserGuard } from './services/user.guard';
import { NoUserGuard } from './services/no-user.guard';
import { AdminGuard } from './services/admin.guard';


//Definning Routes
const appRoutes: Routes = [	
    {path: 'inicio', component: LoginComponent, canActivate:[NoUserGuard]},
    {path: 'login', component: LoginComponent,canActivate:[NoUserGuard]},
    {path: 'login/:action', component: LoginComponent,canActivate:[NoUserGuard]},
    {path: 'logout/:action', component: LoginComponent},
    {path: 'verify-email/:errorSending', component: VerifyEmailComponent,canActivate:[NoUserGuard]},
    {path: 'forgotten', component: ForgottenPasswordComponent,canActivate:[NoUserGuard]},
    {path: 'consumer/:consumerId', component: ConsumerDataComponent,canActivate:[UserGuard]},
    {path: 'users', component: ListUsersComponent,canActivate:[AdminGuard]},
    {path: 'models-boot-admin', component: ModelsBootAdminComponent,canActivate:[AdminGuard]},
    {path: 'create-model-boot', component: CreateModelBootComponent,canActivate:[AdminGuard]},
    {path: 'models-boot', component: ModelsBootComponent},
    {path: 'model-boot-buy', component: ModelBootBuyComponent}
];

//Export configuration
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
