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

  constructor(private ossCodingService: OssCodingService, private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.loadingComments = true;
    localStorage.removeItem('start_comment');
    localStorage.removeItem('end_comment');
    localStorage.removeItem('current_val');

    this.ossCodingService.getAllComments().subscribe((comments) => {
        this.allComments = comments;
        this.loadingComments = false;
    });
  }

  public navigateToComment(comment: OssCommentModel) {
    let index = Number(this.allComments.findIndex(x => x.id === comment.id));
    localStorage.setItem('current_val', String(index));
    this.router.navigate(['/oss-coding/' + comment.id]);
  }

}
