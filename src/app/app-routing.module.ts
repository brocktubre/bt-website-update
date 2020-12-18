import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { AboutComponent } from './base/about/about.component';
import { HomeComponent } from './base/home/home.component';
import { PortfolioComponent } from './base/portfolio/portfolio.component';
import { PublicationsComponent } from './base/publications/publications.component';
import { BrewComponent } from './brew/brew.component';
import { PreviousBrewsComponent } from './brew/previous-brews/previous-brews.component';
import { S3IntComponent } from './sandbox/s3-int/s3-int.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'publications', component: PublicationsComponent },
    { path: 'brew/all', component: PreviousBrewsComponent},
    { path: 'brew/:id', component: BrewComponent },
    { path: 'brew', component: BrewComponent },
    { path: 's3-int', component: S3IntComponent, canActivate: [AuthGuard] },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: '' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
