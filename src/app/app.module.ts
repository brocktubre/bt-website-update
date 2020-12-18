import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BrewModule } from './brew/brew.module';
import { HttpClientModule } from '@angular/common/http';
import { SandboxModule } from './sandbox/sandbox.module';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BaseModule,
    CommonModule,
    BrewModule,
    HttpClientModule,
    SandboxModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
