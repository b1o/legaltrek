import { Injectable } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { LoginDto } from './models/loginDto';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private network: NetworkService, private router: Router) {}

	public login(loginDto: LoginDto) {
		return this.network.post('/api/login', loginDto);
	}

	public logout() {
		this.router.navigateByUrl('/auth/login');
	}
}
