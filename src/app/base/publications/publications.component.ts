import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  public year: number;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
