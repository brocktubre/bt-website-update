import { OssCodeBookModel, OssCommentModel } from './../oss-comment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OssCodingService } from '../oss-coding.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  public startVal: number;
  public end: number;
  public remaining: number;
  public myForm: FormGroup;



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
              private router: Router,
              private fb: FormBuilder) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.loadingComments = true;
    this.hideButtons = false;
    this.allComments = this.ossCodingService.getAllCommentsSingleton();
    this.currentVal = Number(localStorage.getItem('current_val'));
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
    }, (error) => {
      console.error(error);
      this.router.navigate(['/oss-coding/']);
    });


  }

  public loadCurrentComment(comment: OssCommentModel) {
    this.currentComment = comment;

    comment.selectedCodes.forEach((code) => {
      this.allSelectedItems.push(code);
      if(code.item_id <= 13) {
        this.selectedItems.push(code);
      } else if(code.item_id > 13 && code.item_id <= 19){
        this.selectedItemsStatements.push(code);
      } else {
        this.selectedItemsOthers.push(code);
      }
    });

    this.myForm = this.fb.group({
      questions: [this.selectedItems],
      statements: [this.selectedItemsStatements],
      other: [this.selectedItemsOthers],
    });

    this.loadDropdownList();
  }

  public loadDropdownList() {
    this.dropdownList = [
      this.ossCodingService.staticOssBookModel[1],
      this.ossCodingService.staticOssBookModel[2],
      this.ossCodingService.staticOssBookModel[3],
      this.ossCodingService.staticOssBookModel[4],
      this.ossCodingService.staticOssBookModel[5],
      this.ossCodingService.staticOssBookModel[6],
      this.ossCodingService.staticOssBookModel[7],
      this.ossCodingService.staticOssBookModel[8],
      this.ossCodingService.staticOssBookModel[9],
      this.ossCodingService.staticOssBookModel[10],
      this.ossCodingService.staticOssBookModel[11],
      this.ossCodingService.staticOssBookModel[12],
      this.ossCodingService.staticOssBookModel[13]
    ];

    this.dropdownListStatements = [
      this.ossCodingService.staticOssBookModel[14],
      this.ossCodingService.staticOssBookModel[15],
      this.ossCodingService.staticOssBookModel[16],
      this.ossCodingService.staticOssBookModel[17],
      this.ossCodingService.staticOssBookModel[18],
      this.ossCodingService.staticOssBookModel[19]
    ];

    this.dropdownListOther = [
      this.ossCodingService.staticOssBookModel[20],
      this.ossCodingService.staticOssBookModel[21],
      this.ossCodingService.staticOssBookModel[22],
      this.ossCodingService.staticOssBookModel[23]
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.populateSelectedCode();
  }

  public populateSelectedCode(){

  }

  public next() {
    this.userMessage = '';
    const index = this.allComments.findIndex(x => x.id === this.currentComment.id);

    if(this.allComments[index].has_been_coded === true && this.allSelectedItems.length == 0) {
        this.currentComment.selectedCodes = [];
        this.updateCommentCodes('next');
        return;
    }

    if(this.allComments[index].has_been_coded === false && this.allSelectedItems.length == 0) {
      // TODO move on
      localStorage.setItem('current_val', String(index + 1))
      this.router.navigate(['/oss-coding/' + this.allComments[index + 1].id])
        .then(() => {
          window.location.reload();
      });
      return;
    }

    this.allSelectedItems.forEach((code) => {
      let _code = new OssCodeBookModel();
        _code.item_id = code["item_id"];
        _code.item_text = code["item_text"];
        this.currentComment.selectedCodes.push(_code);
    });
    this.updateCommentCodes('next');
  }

  private updateCommentCodes(direction: string) {
    const index = this.allComments.findIndex(x => x.id === this.currentComment.id);
    this.ossCodingService.postCodes(this.currentComment).subscribe((response) => {
      // Code table was successfully updated
      console.log(response);
      if(direction === 'next'){
        localStorage.setItem('current_val', String(index + 1))
        this.router.navigate(['/oss-coding/' + this.allComments[index + 1].id])
          .then(() => {
            window.location.reload();
        });
      } else if(direction === 'prev') {
        localStorage.setItem('current_val', String(index - 1))
        this.router.navigate(['/oss-coding/' + this.allComments[index - 1].id])
          .then(() => {
            window.location.reload();
        });
      }


    }, (error) => {
        this.userMessage = error;
    });
  }

  public previous() {
    this.userMessage = '';
    this.currentVal = Number(localStorage.getItem('current_val'));
    const index = this.allComments.findIndex(x => x.id === this.currentComment.id);

    if(this.currentVal == 0) {
      this.userMessage = "Looks like you're on your first comment!"
      return;
    }

    if(this.allComments[index].has_been_coded === true && this.allSelectedItems.length == 0) {
      this.currentComment.selectedCodes = [];
      this.updateCommentCodes('prev');
      return;
    }

    if(this.allComments[index].has_been_coded === false && this.allSelectedItems.length == 0) {
      // TODO move on
      localStorage.setItem('current_val', String(index - 1))
      this.router.navigate(['/oss-coding/' + this.allComments[index - 1].id]).then(() => {
          window.location.reload();
      });
      return
    }

    this.allSelectedItems.forEach((code) => {
      let _code = new OssCodeBookModel();
        _code.item_id = code["item_id"];
        _code.item_text = code["item_text"];
        this.currentComment.selectedCodes.push(_code);
    });

    this.updateCommentCodes('prev');
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

  public onDeSelect(item: any) {
    const index = this.allSelectedItems.findIndex(x => x.item_id === item.item_id);
    if (index > -1) {
      this.allSelectedItems.splice(index, 1);
    }
  }

}
