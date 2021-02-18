import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oss-codes-table',
  templateUrl: './oss-codes-table.component.html',
  styleUrls: ['./oss-codes-table.component.css']
})
export class OssCodesTableComponent implements OnInit {

  public isQuestionActive: boolean = true;
  public isStatementActive: boolean = false;
  public isOtherActive: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  public toggleTable(name: string) {
    this.isOtherActive = false;
    this.isQuestionActive = false;
    this.isStatementActive = false;

    if(name === 'question') {
      this.isQuestionActive = true;
    }
    if(name === 'statement') {
      this.isStatementActive = true;
    }
    if(name === 'other') {
      this.isOtherActive = true;
    }
  }

}
