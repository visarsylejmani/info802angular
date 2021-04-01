import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AcheterProduitComponent } from './components/acheter-produit/acheter-produit.component';
import { VendreProduitComponent } from './components/vendre-produit/vendre-produit.component';
import { MonPanierComponent } from './components/mon-panier/mon-panier.component';


import { AuthGuard } from "./shared/guard/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'acheter-produit', component: AcheterProduitComponent , canActivate: [AuthGuard]},
  { path: 'vendre-produit', component: VendreProduitComponent , canActivate: [AuthGuard]},
  { path: 'mon-panier', component: MonPanierComponent , canActivate: [AuthGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
