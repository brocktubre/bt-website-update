import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isHomeActive: boolean;
  public isPortfolioActive: boolean;
  public isPublicationsActive: boolean;
  public isAboutActive: boolean;
  public isLoginActive: boolean;
  public collapse: boolean;
  public isUserLoggedIn: boolean;
  public usersEmail: string;

  constructor(private router: Router,
              private titleService: Title,
              private authService: AuthService) {
                this.collapse = false;
                this.isUserLoggedIn = false;
                this.authService.gertUserProfile().subscribe(profile => {
                  this.usersEmail = profile.name;
                  localStorage.setItem('userEmail', this.usersEmail);
                });
              }

  ngOnInit(): void {
    const url = this.router.url;
    switch (url) {
      case '/home':
      case '/':
          this.isHomeActive = true;
          this.titleService.setTitle('Home | Brock Tubre');
          break;
        case '/portfolio':
        case '/s3-sandbox':
        case '/qr-reader':
        case '/qr-reader/attendance':
          this.isPortfolioActive = true;
          this.titleService.setTitle('Portfolio | Brock Tubre');
          break;
        case '/publications':
          this.isPublicationsActive = true;
          this.titleService.setTitle('Publications | Brock Tubre');
          break;
        case '/about':
          this.isAboutActive = true;
          this.titleService.setTitle('About | Brock Tubre');
          break;
        case '/login':
          this.isLoginActive = true;
          this.titleService.setTitle('Login | Brock Tubre');
          break;
        case '/brew':
        case '/brew/all':
            this.titleService.setTitle('Homebrewing | Brock Tubre');
            break;
        default: {
          if (url.includes('/brew')) {
            this.titleService.setTitle('Homebrewing | Brock Tubre');
            break;
          }
          this.titleService.setTitle('Brock Tubre');
        }
    }

    if (this.authService.isAuthenticated()) {
      this.isUserLoggedIn = true;
      this.usersEmail = localStorage.getItem('userEmail');
    }
  }

  public navigateAuth0Login(): void {
    this.authService.login();
  }

  public logoutUser(): void {
    this.authService.logout();
  }

}
