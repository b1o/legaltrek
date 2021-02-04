import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
    return Storage.get({ key: 'user' }).then((data) => {
      if (!data.value) {
        this.router.navigateByUrl('/auth')
      }
      return !!data.value;
    });
	}
}
