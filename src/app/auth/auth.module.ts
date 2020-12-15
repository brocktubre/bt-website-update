import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback/callback.component';
import { BaseModule } from '../base/base.module';

@NgModule({
  declarations: [CallbackComponent],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [AuthService, CallbackComponent]
})
export class AuthModule { }
