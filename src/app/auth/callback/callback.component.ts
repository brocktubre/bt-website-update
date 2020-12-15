import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs/internal/types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit, OnDestroy {
  public year: number;
  private subscription: SubscriptionLike;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = authService.handleAuthentication().subscribe(creds => {
      if (creds) {
        console.log('Setting user to Auth access.');
        this.router.navigate(['home']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
