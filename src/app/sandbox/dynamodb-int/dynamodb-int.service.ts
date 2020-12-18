// import { GradesObjectModel } from './../models/grades-object.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk';
// import { QrCodeObject } from '../models/qr-code-object.model';
import { Moment } from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { DynamodbS3ObjectModel } from './dynamodb-s3-object.model';

@Injectable()
export class DynamodbIntService {
  private tableName: string;
  private docClient;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    const dynamodb = new AWS.DynamoDB({ region: environment.region, credentials: creds });
    this.docClient = new AWS.DynamoDB.DocumentClient({service: dynamodb});
    this.tableName = environment.dynamodb_table_name;
  }

  public getItemsFromDynamoDb(tableName: string): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();

    const params = {
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':m': localStorage.getItem('userEmail')
       },
       FilterExpression: 'created_by IN (:m)',
    };

    this.docClient.scan(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Items);
      }
    });
    return sendResult.asObservable();
  }

  public updateItemFromDynamoDb(object: DynamodbS3ObjectModel): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();
    const datetime = new Date().getTime().toString();
    const params = {
      ExpressionAttributeValues: {
       ':k': object.object_display_name,
       ':d': datetime,
       ':m': localStorage.getItem('userEmail')
      },
      Key: { object_id : object.etag },
      TableName: this.tableName,
      UpdateExpression: 'SET object_display_name = :k, modified_by = :m, modified_on = :d'
     };
     this.docClient.update(params, function(err, data) {
       if (err) {
        sendResult.error(err);
       }else {
        sendResult.next(data);
       }
      });
    return sendResult.asObservable();
  }

  // public getAttendanceFromDynamoDb(tableName: string): Observable<Array<QrCodeObject>> {
  //   const sendResult = new Subject<Array<QrCodeObject>>();
  //   const d = new Date();
  //   d.setHours(d.getHours() - 5);
  //   const readDate = d.toDateString();

  //   const params = {
  //     TableName: tableName,
  //     ExpressionAttributeValues: {
  //       ':date': readDate
  //      },
  //      FilterExpression: 'class_date IN (:date)',
  //   };

  //   this.docClient.scan(params, function(err, data) {
  //     if (err) {
  //       sendResult.error(err);
  //     }else {
  //       sendResult.next(data.Items);
  //     }
  //   });
  //   return sendResult.asObservable();
  // }
}
