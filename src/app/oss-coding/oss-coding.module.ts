import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OssCodingService } from './oss-coding.service';
import { BaseModule } from '../base/base.module';
import { OssCodingComponent } from './oss-coding.component';
import { OssCodeComponent } from './oss-code/oss-code.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [OssCodingComponent, OssCodeComponent],
  imports: [
    CommonModule,
    BaseModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [OssCodingComponent,OssCodeComponent],
  providers: [OssCodingService]
})
export class OssCodingModule { }
