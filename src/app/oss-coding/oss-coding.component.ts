import { OssCodingService } from './oss-coding.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OssCommentModel, OssUserModel } from './oss-comment.model';
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
  @ViewChild('accessCode') accessCode: ElementRef;
  public showCodes: boolean = false;

  constructor(private ossCodingService: OssCodingService, private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
      localStorage.removeItem('start_comment');
      localStorage.removeItem('end_comment');
      localStorage.removeItem('current_val');
      localStorage.removeItem('accessCode');
  }

  public navigateToComment(comment: OssCommentModel) {
    let index = Number(this.allComments.findIndex(x => x.id === comment.id));
    localStorage.setItem('current_val', String(index));
    this.router.navigate(['/oss-coding/' + comment.id]);
  }

  public startCoding() {
    const accessCode = this.accessCode.nativeElement.value;
    let goodCode = false;
    let ossUserModel: OssUserModel = new OssUserModel();

    ossUserModel.users.forEach((code) => {
      if(accessCode === code) {
        goodCode = true;
      }
    });

    if(goodCode) {
      this.showCodes = true;
      this.loadingComments = true;
      localStorage.setItem('accessCode', accessCode);

      this.ossCodingService.getAllComments(accessCode).subscribe((comments) => {
          this.allComments = comments;
          this.loadingComments = false;
      });
    } else {
      this.inputSubmitMessage = 'Please enter a valid access code.'
      return;
    }
  }

}
