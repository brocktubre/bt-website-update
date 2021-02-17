import { DynamodbIntService } from 'src/app/aws-integration/dynamodb-int/dynamodb-int.service';
import { OssCodingService } from './oss-coding.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OssCommentModel } from './oss-comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oss-coding',
  templateUrl: './oss-coding.component.html',
  styleUrls: ['./oss-coding.component.css']
})
export class OssCodingComponent implements OnInit {

  public year: number;
  public loadingComments: Boolean;
  public allComments: Array<OssCommentModel>;
  public inputSubmitMessage: string = '';

  @ViewChild('startingComment') startingComment: ElementRef;
  @ViewChild('endingComment') endingComment: ElementRef;

  constructor(private ossCodingService: OssCodingService, private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.loadingComments = true;

    this.ossCodingService.getAllComments().subscribe((comments) => {
        this.allComments = comments;
        this.loadingComments = false;
    });
  }

  public startCoding(){
    this.inputSubmitMessage = '';
    const startingComment = Number(this.startingComment.nativeElement.value);
    const endingComment = Number(this.endingComment.nativeElement.value);

    if(startingComment >= endingComment || startingComment < 0 || endingComment < 0 || endingComment >= this.allComments.length) {
      this.inputSubmitMessage = 'Please enter valid values. Between 0 and ' + (this.allComments.length - 1) +'.';
      return;
    }

    this.router.navigate(['/oss-coding/' + startingComment + '/' + endingComment + '/' + startingComment]);
  }

}
