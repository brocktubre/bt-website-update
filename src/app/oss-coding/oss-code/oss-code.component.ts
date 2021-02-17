import { OssCommentModel } from './../oss-comment.model';
import { OssCodingService } from './../oss-coding.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oss-code',
  templateUrl: './oss-code.component.html',
  styleUrls: ['./oss-code.component.css']
})
export class OssCodeComponent implements OnInit {

  public allComments: Array<OssCommentModel>;
  public loadingComments: boolean;
  public userLogin: string;
  public body: string;
  public commentUrl: string;
  public commentId: number;
  public startingComment: number;
  public endingComment: number;
  public currentComment: number;
  public year: number;
  public hideButtons: boolean;
  public userMessage: string;

  constructor(private activeRoute: ActivatedRoute, private ossCodingService: OssCodingService, private router: Router) {
    this.year = new Date().getFullYear();

  }

  ngOnInit(): void {
    this.loadingComments = true;
    this.hideButtons = false;
    this.allComments = this.ossCodingService.getAllCommentsSingleton();

    if(this.allComments === undefined || this.allComments.length == 0) {
      this.loadingComments = true;
      this.ossCodingService.getAllComments().subscribe((comments) => {
          this.allComments = comments;
          this.loadingComments = false;
          let startVal = Number(this.activeRoute.snapshot.params['start']);
          this.endingComment = Number(this.activeRoute.snapshot.params['end']);
          this.currentComment = Number(this.activeRoute.snapshot.params['current']);
          this.startingComment = this.currentComment;

          if(this.currentComment == this.endingComment) {
            this.hideButtons = true;
            this.userMessage = 'All done coding your selected comments!';
          }

          if(this.endingComment < startVal || this.currentComment < startVal
            || this.currentComment > this.endingComment) {
            this.router.navigate(['/oss-coding/']);
            return;
          }

          let firstComment = this.allComments[this.startingComment];
          this.userLogin = firstComment.user_login;
          this.body = firstComment.body;
          this.commentUrl = firstComment.html_url;
          this.commentId = firstComment.id;
      });
    } else {
      this.loadingComments = false;
      this.hideButtons = false;
      this.endingComment = Number(this.activeRoute.snapshot.params['end']);
      this.currentComment = Number(this.activeRoute.snapshot.params['current']);
      this.startingComment = this.currentComment;
      let startVal = Number(this.activeRoute.snapshot.params['start']);

      if(this.currentComment == this.endingComment) {
        this.hideButtons = true;
        this.userMessage = 'All done coding your selected comments!';
      }

      if(this.endingComment < startVal || this.currentComment < startVal
        || this.currentComment > this.endingComment) {
        this.router.navigate(['/oss-coding/']);
        return;
      }

      let firstComment = this.allComments[this.startingComment];
      this.userLogin = firstComment.user_login;
      this.body = firstComment.body;
      this.commentUrl = firstComment.html_url;
      this.commentId = firstComment.id;
    }
  }

  public next() {
    this.currentComment = this.currentComment + 1;
    this.router.navigate(['/oss-coding/' + this.startingComment + '/' + this.endingComment + '/' + this.currentComment])
      .then(() => {
        window.location.reload();
      });

    // TODO Call DynamoDB and save this comments codes
  }

  public previous() {
    this.currentComment = this.currentComment - 1;
    this.router.navigate(['/oss-coding/' + this.startingComment + '/' + this.endingComment + '/' + this.currentComment])
      .then(() => {
        window.location.reload();
      });
  }

  public goToLink(url: string){
    window.open(url, "_blank");
  }

}
