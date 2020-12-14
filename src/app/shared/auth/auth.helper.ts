import { Injectable, OnDestroy, Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthHelper implements OnDestroy {
  private sub: Subscription;

  constructor(private auth: AuthService) {
    this.sub = this.auth.handleLimitedAuthentication().subscribe(
      data => console.log('Got limited user`s creds.'),
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
