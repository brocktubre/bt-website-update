import { Component, OnInit } from '@angular/core';
import { AuthHelper } from 'src/app/auth/auth.helper';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends AuthHelper implements OnInit {
  public year: number;
  constructor(private authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
