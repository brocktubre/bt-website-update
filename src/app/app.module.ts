import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BrewModule } from './brew/brew.module';
import { HttpClientModule } from '@angular/common/http';
import { AWSIntegrationModule } from './aws-integration/aws-integration.module';
import { GradesModule } from './grades/grades.module';
import { QrReaderModule } from './qr-reader/qr-reader.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
// import { Ng2TableModule } from 'ng2-table/ng2-table';
import { OssCodingModule } from './oss-coding/oss-coding.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BaseModule,
    CommonModule,
    BrewModule,
    HttpClientModule,
    AWSIntegrationModule,
    GradesModule,
    QrReaderModule,
    // Ng2TableModule,
    UiSwitchModule,
    OssCodingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
