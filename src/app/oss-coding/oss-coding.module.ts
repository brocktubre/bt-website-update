import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OssCodingService } from './oss-coding.service';
import { BaseModule } from '../base/base.module';
import { OssCodingComponent } from './oss-coding.component';
import { OssCodeComponent } from './oss-code/oss-code.component';

@NgModule({
  declarations: [OssCodingComponent, OssCodeComponent],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [OssCodingComponent],
  providers: [OssCodingService]
})
export class OssCodingModule { }
