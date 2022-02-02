//Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ConsumerDataComponent } from './components/consumer-data/consumer-data.component';




//Definning Routes
const appRoutes: Routes = [	
    {path: 'inicio', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/:action', component: LoginComponent},
    {path: 'logout/:action', component: LoginComponent},
    {path: 'verify-email/:errorSending', component: VerifyEmailComponent},
    {path: 'forgotten', component: ForgottenPasswordComponent},
    {path: 'consumer/:consumerId', component: ConsumerDataComponent}
];

//Export configuration
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
