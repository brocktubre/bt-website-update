import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import * as AWS from 'aws-sdk';
import { Moment } from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { GradesObjectModel } from 'src/app/grades/grades-object.model';

@Injectable()
export class LambdaIntService {
  private functionName: string;
  private lambda;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    const lambda = new AWS.Lambda({ region: environment.region, credentials: creds });
    this.lambda = lambda;
    this.functionName = environment.dynamodb_table_name;
  }

  public triggerFunction(functionName: string, secretId: string): Observable<Array<GradesObjectModel>> {
    const sendResult = new Subject<Array<GradesObjectModel>>();
    const invokeParams = {
      FunctionName : functionName,
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: '{ "secret_id":"' + secretId + '"}'
    };

    this.lambda.invoke(invokeParams, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        let gradesObj = new Array<GradesObjectModel>();
        gradesObj = JSON.parse(data.Payload);
        sendResult.next(gradesObj);
      }
    });
    return sendResult.asObservable();
  }

  public triggerFunctionGetTotal(functionName: string): Observable<number> {
    const sendResult = new Subject<number>();
    const invokeParams = {
      FunctionName : functionName,
      InvocationType : 'RequestResponse',
      LogType : 'None'
    };

    this.lambda.invoke(invokeParams, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Payload);
      }
    });
    return sendResult.asObservable();
  }
}
