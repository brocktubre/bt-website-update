import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { AuthModule } from '../auth/auth.module';
import { GradesComponent } from './grades.component';



@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    BaseModule,
    AuthModule
  ],
  exports: [GradesComponent]
})
export class GradesModule { }
