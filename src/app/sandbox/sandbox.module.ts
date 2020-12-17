import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { S3IntComponent } from './s3-int/s3-int.component';
import { DynamodbIntService } from './dynamodb-int/dynamodb-int.service';
import { S3IntService } from './s3-int/s3-int.service';



@NgModule({
  declarations: [S3IntComponent],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [S3IntComponent],
  providers: [S3IntService, DynamodbIntService]
})
export class SandboxModule { }
