import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: HttpClient) { }

  public getRandomFact(): Observable<string> {
    const sendResult = new Subject<string>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    const getUrl = environment.randomFactUrl.url;
    const getFactFromUrl = this.http.get(getUrl, httpOptions);
    getFactFromUrl.subscribe((result: any) => {
      sendResult.next(result["text"]);
    }, (error) => {
      sendResult.error('There was an getting the random fact.');
    });
    return sendResult.asObservable();
  }
}
