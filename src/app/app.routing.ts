//Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ConsumerDataComponent } from './components/consumer-data/consumer-data.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

import { UserGuard } from './services/user.guard';
import { NoUserGuard } from './services/no-user.guard';
import { AdminGuard } from './services/admin.guard';

//Definning Routes
const appRoutes: Routes = [	
    {path: 'inicio', component: LoginComponent},
    {path: 'login', component: LoginComponent,canActivate:[NoUserGuard]},
    {path: 'login/:action', component: LoginComponent,canActivate:[NoUserGuard]},
    {path: 'logout/:action', component: LoginComponent},
    {path: 'verify-email/:errorSending', component: VerifyEmailComponent,canActivate:[NoUserGuard]},
    {path: 'forgotten', component: ForgottenPasswordComponent,canActivate:[NoUserGuard]},
    {path: 'consumer/:consumerId', component: ConsumerDataComponent,canActivate:[UserGuard]},
    {path: 'users', component: ListUsersComponent,canActivate:[AdminGuard]},
];

//Export configuration
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
