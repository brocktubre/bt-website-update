import { OssCodeBookModel, OssCommentModel } from './../oss-comment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OssCodingService } from '../oss-coding.service';

@Component({
  selector: 'app-oss-start',
  templateUrl: './oss-start.component.html',
  styleUrls: ['./oss-start.component.css']
})
export class OssStartComponent implements OnInit {

  public allComments: Array<OssCommentModel>;
  public loadingComments: boolean;
  public currentComment: OssCommentModel;
  public year: number;
  public hideButtons: boolean;
  public userMessage: string;
  public currentVal: number;
  public end: number;
  public remaining: number;



  public dropdownList = [];
  public dropdownListStatements = [];
  public dropdownListOther = [];
  public selectedItems = [];
  public selectedItemsStatements = [];
  public selectedItemsOthers = [];
  public allSelectedItems = [];

  dropdownSettings: IDropdownSettings;

  constructor(private activeRoute: ActivatedRoute,
              private ossCodingService: OssCodingService,
              private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.loadingComments = true;
    this.hideButtons = false;
    this.allComments = this.ossCodingService.getAllCommentsSingleton();
    this.currentVal = Number(localStorage.getItem('current_val'));
    this.end = Number(localStorage.getItem('end_comment'));
    this.remaining = this.end - this.currentVal;
    const current = this.activeRoute.snapshot.params['id'];
    this.loadingComments = true;

    this.ossCodingService.getCommentById(current).subscribe((comment) => {
        this.loadCurrentComment(comment);
        if(this.allComments === undefined || this.allComments.length == 0) {
          this.ossCodingService.getAllComments().subscribe((comments) => {
              this.allComments = comments;
              this.loadingComments = false;
          });
        } else {
          this.loadingComments = false;
        }
    });


  }

  public loadCurrentComment(comment: OssCommentModel) {
    this.currentComment = comment;

    comment.selectedCodes.forEach((code) => {
      if(code.item_id <= 13) {
        this.selectedItems.push(code);
      } else if(code.item_id > 13 && code.item_id <= 19){
        this.selectedItemsStatements.push(code);
      } else {
        this.selectedItemsStatements.push(code);
      }
    });

    this.loadDropdownList();
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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };

    this.populateSelectedCode();
  }

  public populateSelectedCode(){

  }

  public next() {
    this.userMessage = '';

    if(this.allSelectedItems.length == 0) {
      // TODO move on
      const index = this.allComments.findIndex(x => x.id === this.currentComment.id);
      this.router.navigate(['/oss-coding/' + this.allComments[index + 1].id]);
      return
    }

    this.allSelectedItems.forEach((code) => {
      let _code = new OssCodeBookModel();
        _code.item_id = code["item_id"];
        _code.item_text = code["item_text"];
        this.currentComment.selectedCodes.push(_code);
    });


    this.ossCodingService.postCodes(this.currentComment).subscribe((response) => {
      // Code table was successfully updated
      console.log(response);
      debugger;
      const index = this.allComments.findIndex(x => x.id === this.currentComment.id);
      localStorage.setItem('current_val', String(index + 1))
      this.router.navigate(['/oss-coding/' + this.allComments[index + 1].id])
        .then(() => {
          window.location.reload();
      });

    }, (error) => {
        this.userMessage = error;
    });


  }

  public previous() {
    // let startVal = Number(this.activeRoute.snapshot.params['start']);
    // let previousPage = this.currentComment - 1;

    // if(previousPage < startVal) {
    //   this.userMessage = "Looks like you're on your first comment!"
    //   return;
    // }

    // this.currentComment = this.currentComment - 1;

    // this.router.navigate(['/oss-coding/' + startVal + '/' + this.endingComment + '/' + this.currentComment])
    //   .then(() => {
    //     window.location.reload();
    //   });
  }

  public goToLink(url: string){
    window.open(url, "_blank");
  }

  public onItemSelect(item: any) {
    this.allSelectedItems.push(item);
  }

  public onSelectAll(items: any) {
    items.forEach((item) => {
      this.allSelectedItems.push(item);
    });
  }

}
