import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/auth/auth.helper';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent extends AuthHelper implements OnInit {
  public year: number;
  constructor(private router: Router, private authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  public goToS3Store(): void {
    this.router.navigate(['s3-int']);
  }

  public goToQrReader(): void {
    this.router.navigate(['qr-reader']);
  }

  goToAttendance(): void {
    this.router.navigate(['qr-reader/attendance']);
  }

}
