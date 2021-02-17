import { OssCommentModel } from './../oss-comment.model';
import { OssCodingService } from './../oss-coding.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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

  public dropdownList = [];
  public dropdownListStatements = [];
  public dropdownListOther = [];
  public selectedItems = [];

  dropdownSettings: IDropdownSettings;

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
          this.loadDropdownList();
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
      this.loadDropdownList();
    }


  }

  public loadDropdownList() {
    this.dropdownList = [
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
      { item_id: 13, item_text: 'technical related question' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'PR review request' },
      { item_id: 4, item_text: 'code location inquiry' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };

    this.dropdownListStatements = [
      { item_id: 14, item_text: 'coordination statement' },
      { item_id: 15, item_text: 'knowledge share' },
      { item_id: 16, item_text: 'suggestion' },
      { item_id: 17, item_text: 'grateful' },
      { item_id: 18, item_text: 'acknowledgement' },
      { item_id: 19, item_text: 'general statement' },
    ];

    this.dropdownListOther = [
      { item_id: 20, item_text: 'False Positive' },
      { item_id: 21, item_text: 'Discuss' },
      { item_id: 22, item_text: 'Quote' },
      { item_id: 23, item_text: 'Notable' },
    ];
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

  onItemSelect(item: any) {
    console.log(item);
  }
}
