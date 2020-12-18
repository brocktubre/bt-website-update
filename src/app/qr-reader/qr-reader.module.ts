import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { AuthModule } from '../auth/auth.module';
import { QrReaderComponent } from './qr-reader.component';
import { QrReaderService } from './qr-reader.service';
import { AttendanceComponent } from './attendance/attendance.component';



@NgModule({
  declarations: [QrReaderComponent, AttendanceComponent],
  imports: [
    CommonModule,
    BaseModule,
    AuthModule
  ],
  providers: [QrReaderService],
  exports: [QrReaderComponent, AttendanceComponent]
})
export class QrReaderModule { }
