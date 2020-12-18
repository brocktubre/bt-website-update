import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as AWS from 'aws-sdk';
import 'rxjs/add/observable/of';
import { v4 as uuid } from 'uuid';
import { S3ObjectModel } from './s3-object.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class S3IntService {
  private s3;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    this.s3 = new AWS.S3({ signatureVersion: 'v4', credentials: creds });
  }

  public getItemsFromBucket(bucketName: string): Observable<Array<S3ObjectModel>> {
    const sendResult = new Subject<Array<S3ObjectModel>>();

    const params = {
      Bucket: bucketName,
      MaxKeys: 5,

    };
    this.s3.listObjectsV2(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Contents);
      }
    });
    return sendResult.asObservable();
  }

  public uploadObjectToS3(bucketName: string, object: any): Observable<Array<S3ObjectModel>> {
    const sendResult = new Subject<Array<S3ObjectModel>>();
    const UUID = uuid();

    const params = {
      ACL: 'authenticated-read',
      Body: object,
      Bucket: bucketName,
      Key: UUID,
      Metadata: {
        'object_display_name' : object.name,
        'created_by': localStorage.getItem('userEmail')
      }
    };

    this.s3.putObject(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Contents);
      }
    });
    return sendResult.asObservable();
  }

  public getObjectFromS3(bucketName: string, key: string): Observable<any> {
    const sendResult = new Subject<any>();
    const params = {
      Bucket: bucketName,
      Key: key
    };

    this.s3.getObject(params,
      function (error, data) {
        if (error) {
          sendResult.error(error);
        } else {
          sendResult.next(data);
          // do something with data.Body
        }
      });
    return sendResult.asObservable();
  }

  public deleteObjectFromS3(bucketName: string, key: string): Observable<any> {
    const sendResult = new Subject<any>();
    const params = {
      Bucket: bucketName,
      Key: key
    };

    this.s3.deleteObject(params,
      function (error, data) {
        if (error) {
          sendResult.error(error);
        } else {
          sendResult.next(data);
          // do something with data.Body
        }
      });
    return sendResult.asObservable();
  }

  // public uploadCaptureImage(bucketName: string, object: any, result: QrCodeObject): Observable<Array<S3ObjectModel>> {
  //   const sendResult = new Subject<Array<S3ObjectModel>>();

  //   const buf = new Buffer(object.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  //   const params = {
  //     ACL: 'authenticated-read',
  //     Body: buf,
  //     Bucket: bucketName,
  //     Key: result.object_name,
  //     ContentEncoding: 'base64',
  //     ContentType: 'image/png'
  //   };

  //   this.s3.putObject(params, function(err, data) {
  //     if (err) {
  //       sendResult.error(err);
  //     }else {
  //       sendResult.next(data.Contents);
  //     }
  //   });
  //   return sendResult.asObservable();
  // }

}
