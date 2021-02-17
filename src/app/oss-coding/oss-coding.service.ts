import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { OssCommentModel } from './oss-comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OssCodingService {

  private allComments: Array<OssCommentModel>;

  constructor(private http: HttpClient) {

  }

  public getAllCommentsSingleton(): Array<OssCommentModel> {
    return this.allComments;
  }

  public getAllComments(): Observable<Array<OssCommentModel>> {
    const sendResult = new Subject<Array<OssCommentModel>>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    const getUrl = environment.ossCoding.apiGateway.comments;
    const getWorkingURL = this.http.get(getUrl, httpOptions);
    getWorkingURL.subscribe((comments: any) => {
        let returnComments = Array<OssCommentModel>();
        comments.forEach(comment => {
          let _comment = new OssCommentModel();
          _comment.body = comment["body"];
          _comment.created_at = comment["created_at"];
          _comment.html_url = comment["html_url"];
          _comment.id = comment["id"];
          _comment.issue_url = comment["issue_url"];
          _comment.url = comment["url"];
          _comment.user_id = comment["user_id"];
          _comment.user_login = comment["user_login"];
          _comment.user_type = comment["user_type"];
          _comment.author_association = comment["author_association"];
          _comment.is_newcomer_comment = comment["is_newcomer_comment"];
          _comment.repo = comment["repo"];
          returnComments.push(_comment)
        });
        this.allComments = returnComments;
        sendResult.next(returnComments);
    });

    return sendResult.asObservable();
  }

}
