import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { S3IntComponent } from './s3-int/s3-int.component';
import { DynamodbIntService } from './dynamodb-int/dynamodb-int.service';
import { S3IntService } from './s3-int/s3-int.service';
import { BsModalModule } from 'ng2-bs3-modal';
import { AuthModule } from '../auth/auth.module';
import { LambdaIntService } from './lambda-int/lambda-int.service';

@NgModule({
  declarations: [S3IntComponent],
  imports: [
    CommonModule,
    BaseModule,
    BsModalModule,
    AuthModule
  ],
  exports: [S3IntComponent],
  providers: [S3IntService, DynamodbIntService, LambdaIntService]
})
export class AWSIntegrationModule { }
