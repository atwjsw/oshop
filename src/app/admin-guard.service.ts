import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate() {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser: AppUser) => appUser.isAdmin)
    );
  }
}
