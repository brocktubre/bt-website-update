import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
// import { AuthService } from '../shared/auth/auth.service';
// import { AuthHelper } from '../shared/auth/auth.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// export class HomeComponent extends AuthHelper implements OnInit {
  export class HomeComponent implements OnInit {

  public year: number;

  // constructor(private authService: AuthService) {
  //   super(authService);
  // }

  constructor() {

  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
