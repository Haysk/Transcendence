import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(private auth: AuthService,
		private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const locked = this.auth.getLocked();
		if (locked) {
			this.router.navigateByUrl('');
			return false;
		} else {
			return true;
		}
	}
}
