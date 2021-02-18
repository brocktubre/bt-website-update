import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { OssCodeBookModel, OssCommentModel } from './oss-comment.model';
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
    const getAllCommentsApi = this.http.get(getUrl, httpOptions);
    getAllCommentsApi.subscribe((comments: any) => {
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

          if(comment["codes"] == undefined) {
            _comment.selectedCodes = comment["codes"];
          } else {
            comment["codes"].forEach((code) => {
                let obj = new OssCodeBookModel();
                obj.item_id = code.item_id
                obj.item_text = code.item_text
                _comment.selectedCodes.push(obj);
            });

          }
          returnComments.push(_comment)
          returnComments.sort();
        });
        this.allComments = returnComments;
        sendResult.next(returnComments);
    });

    return sendResult.asObservable();
  }

  public postCodes(comment: OssCommentModel): Observable<String> {
    const sendResult = new Subject<String>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    const postUrl = environment.ossCoding.apiGateway.codes;

    const payload = { comment }
    const postCodesApi = this.http.post(postUrl, payload, httpOptions);
    postCodesApi.subscribe((result: any) => {
        sendResult.next(result);
    }, (error) => {
      sendResult.error('There was an error coding the comment.');
    });

    return sendResult.asObservable();
  }

  public getCommentById(id: string): Observable<OssCommentModel> {
    const sendResult = new Subject<OssCommentModel>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    const payload = {
      'id': id
    };
    const getUrl = environment.ossCoding.apiGateway.comment_by_id;
    const getSingleCommentApi = this.http.post(getUrl, payload, httpOptions);

    getSingleCommentApi.subscribe((mapping: any) => {

      let _comment = new OssCommentModel();
      let comment = mapping[0];
      let codes = mapping[1];

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

      if(codes.length > 0) {
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = codes["item_id"]
        codesObj.item_text = codes["item_text"]
        _comment.selectedCodes.push(codesObj);
      }

      sendResult.next(_comment);
    });

    return sendResult.asObservable();
  }

}
