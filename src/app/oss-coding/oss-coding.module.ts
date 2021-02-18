import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OssCodingService } from './oss-coding.service';
import { BaseModule } from '../base/base.module';
import { OssCodingComponent } from './oss-coding.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OssStartComponent } from './oss-start/oss-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OssCodingComponent, OssStartComponent],
  imports: [
    CommonModule,
    BaseModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OssCodingComponent, OssStartComponent],
  providers: [OssCodingService]
})
export class OssCodingModule { }
