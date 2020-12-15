import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../base/home/home.component';
import { AboutComponent } from '../base/about/about.component';
import { PortfolioComponent } from '../base/portfolio/portfolio.component';
import { NavbarComponent } from '../base/navbar/navbar.component';
import { PublicationsComponent } from './publications/publications.component';
import { FooterComponent } from './footer/footer.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    PublicationsComponent,
    NavbarComponent,
    FooterComponent,
    ValidationMessagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    PublicationsComponent,
    NavbarComponent,
    FooterComponent,
    ValidationMessagesComponent
  ]
})
export class BaseModule { }
