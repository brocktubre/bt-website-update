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

  public staticOssBookModel = [
      { item_id: -1, item_text: 'n/a' },
      { item_id: 1, item_text: 'newcomer assignment request' },
      { item_id: 2, item_text: 'acceptance inquiry' },
      { item_id: 3, item_text: 'issue status inquiry' },
      { item_id: 4, item_text: 'starting guidance request' },
      { item_id: 5, item_text: 'coordination inquiry' },
      { item_id: 6, item_text: 'PR review request' },
      { item_id: 7, item_text: 'code location inquiry' },
      { item_id: 8, item_text: 'validation request' },
      { item_id: 9, item_text: 'resource inquiry' },
      { item_id: 10, item_text: 'workspace setup question' },
      { item_id: 11, item_text: 'submission process inquiry' },
      { item_id: 12, item_text: 'mentoring request' },
      { item_id: 13, item_text: 'technical related question' },
      { item_id: 14, item_text: 'coordination statement' },
      { item_id: 15, item_text: 'knowledge share' },
      { item_id: 16, item_text: 'suggestion' },
      { item_id: 17, item_text: 'grateful' },
      { item_id: 18, item_text: 'acknowledgement' },
      { item_id: 19, item_text: 'general statement' },
      { item_id: 20, item_text: 'False Positive' },
      { item_id: 21, item_text: 'Discuss' },
      { item_id: 22, item_text: 'Quote' },
      { item_id: 23, item_text: 'Notable' },
  ]

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

      if(codes["_1"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[1].item_id
        codesObj.item_text = this.staticOssBookModel[1].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_2"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[2].item_id
        codesObj.item_text = this.staticOssBookModel[2].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_3"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[3].item_id
        codesObj.item_text = this.staticOssBookModel[3].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_4"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[4].item_id
        codesObj.item_text = this.staticOssBookModel[4].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_5"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[5].item_id
        codesObj.item_text = this.staticOssBookModel[5].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_6"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[6].item_id
        codesObj.item_text = this.staticOssBookModel[6].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_7"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[7].item_id
        codesObj.item_text = this.staticOssBookModel[7].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_8"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[8].item_id
        codesObj.item_text = this.staticOssBookModel[8].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_9"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[9].item_id
        codesObj.item_text = this.staticOssBookModel[9].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_10"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[10].item_id
        codesObj.item_text = this.staticOssBookModel[10].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_11"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[11].item_id
        codesObj.item_text = this.staticOssBookModel[11].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_12"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[12].item_id
        codesObj.item_text = this.staticOssBookModel[12].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_13"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[13].item_id
        codesObj.item_text = this.staticOssBookModel[13].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_14"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[14].item_id
        codesObj.item_text = this.staticOssBookModel[14].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_15"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[15].item_id
        codesObj.item_text = this.staticOssBookModel[15].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_16"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[16].item_id
        codesObj.item_text = this.staticOssBookModel[16].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_17"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[17].item_id
        codesObj.item_text = this.staticOssBookModel[17].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_18"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[18].item_id
        codesObj.item_text = this.staticOssBookModel[18].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_19"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[19].item_id
        codesObj.item_text = this.staticOssBookModel[19].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_20"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[20].item_id
        codesObj.item_text = this.staticOssBookModel[20].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_21"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[21].item_id
        codesObj.item_text = this.staticOssBookModel[21].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_22"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[22].item_id
        codesObj.item_text = this.staticOssBookModel[22].item_text
        _comment.selectedCodes.push(codesObj);
      }
      if(codes["_23"]){
        let codesObj =  new OssCodeBookModel();
        codesObj.item_id = this.staticOssBookModel[23].item_id
        codesObj.item_text = this.staticOssBookModel[23].item_text
      }
      sendResult.next(_comment);
    });

    return sendResult.asObservable();
  }

}
