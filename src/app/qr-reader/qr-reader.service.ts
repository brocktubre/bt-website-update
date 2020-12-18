import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QrCodeObject } from './qr-code-object.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class QrReaderService {

  public qrCodeResult: string;
  constructor(private http: HttpClient) { }

  public processQrCode(qrCode: string): Observable<QrCodeObject> {
    const sendResult = new Subject<QrCodeObject>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    let processUrl = environment.qrReader.apiGateway.processQrCodeUrl;
    processUrl += qrCode;
    const processQrCode = this.http.post(processUrl, httpOptions);
    processQrCode.subscribe((result: any) => {
        sendResult.next(result);
    });

    return sendResult.asObservable();
  }
}
