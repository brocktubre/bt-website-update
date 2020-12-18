import { Injectable, OnDestroy, Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthHelper implements OnDestroy {
  private sub: Subscription;

  constructor(private auth: AuthService) {
    this.sub = this.auth.handleLimitedAuthentication().subscribe(
      data => console.log('Got limited user`s credentials.'),
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
