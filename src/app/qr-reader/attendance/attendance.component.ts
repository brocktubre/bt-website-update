import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DynamodbIntService } from 'src/app/aws-integration/dynamodb-int/dynamodb-int.service';
import { S3IntService } from 'src/app/aws-integration/s3-int/s3-int.service';
import { environment } from 'src/environments/environment';
import { QrCodeObject } from '../qr-code-object.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public attendanceList: Array<QrCodeObject>;
  public loadingAttendance: boolean;
  public tableName: string;
  public year: number;
  public readDate: string;
  private IMG_CAPTURE_BUCKET = 'qr-code-capture';

  constructor(private dynamodbIntService: DynamodbIntService,
              private s3IntService: S3IntService) {
    this.attendanceList = new Array<QrCodeObject>();
    this.loadingAttendance = true;
    this.tableName = environment.qrReader.dynamoDb.tableName;
    this.year = new Date().getFullYear();
    const d = new Date();
    d.setHours(d.getHours() - 5);
    this.readDate = d.toDateString();
    setInterval(() => {
      this.loadAttendance();
    }, 10000);
  }

  ngOnInit() {
    this.loadAttendance();
  }

  public loadAttendance() {
    this.dynamodbIntService.getAttendanceFromDynamoDb(this.tableName).subscribe(items => {
      this.attendanceList = items;
      this.loadingAttendance = false;
    });
  }

  public getImageSnap(a: any) {
    this.s3IntService.getObjectFromS3(this.IMG_CAPTURE_BUCKET, a.object_name).subscribe(item => {
      const blob = new Blob([item.Body], { type: item.ContentType });
      FileSaver.saveAs(blob, a.object_name);
    });
  }

}
