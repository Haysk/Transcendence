
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
	constructor(private apiService: ApiService,
				private cookieService: CookieService){
	}

	getCode(): string {
		let code = this.cookieService.get('code');
		if (code === null || code == undefined)
			return "";
		return code;
	}

	getId(): number | null {
		let id = localStorage.getItem("id");
		if (id === null || id == undefined)
			return null;
		return Number(id);
	}

	getLogin(): string {
		let login = localStorage.getItem("login");
		if (login === null || login === undefined)
			return "";
		return login;
	}

	getEmail(): string {
		let email = localStorage.getItem("email");
		if (email === null || email === undefined)
			return "";
		return email;
	}

	getFirstName(): string {
		let first_name = localStorage.getItem("first_name");
		if (first_name === null || first_name === undefined)
			return "";
		return first_name;
	}

	getLastName(): string {
		let last_name = localStorage.getItem("last_name");
		if (last_name === null || last_name === undefined)
			return "";
		return last_name;
	}

	getUrl(): string {
		let url = localStorage.getItem("url");
		if (url === null || url === undefined)
			return "";
		return url;
	}

	getDisplayName(): string {
		let display_name = localStorage.getItem("display_name");
		if (display_name === null || display_name === undefined)
			return "";
		return display_name;
	}

	getImageUrl(): string {
		let image_url = localStorage.getItem("image_url");
		if (image_url === null || image_url === undefined)
			return "";
		return image_url;
	}

	getOnline(): boolean {
		let online = localStorage.getItem("online");
		if (online === "true")
			return true
		else
			return false
	}

	getTwoFactorAuthVerbose(): string {
		let two_factor_auth = localStorage.getItem("two_factor_auth");
		if (two_factor_auth === "true")
			return "Enabled";
		return "Disabled";
	}

	getTwoFactorAuth(): boolean {
		let two_factor_auth = localStorage.getItem("two_factor_auth");
		if (two_factor_auth === "true")
			return true;
		return false;
	}

	getQrCode(): string {
		var qrCode = localStorage.getItem("qrCode");
		if (qrCode === null || qrCode === undefined || qrCode === "null")
			return "";
		return qrCode;
	}

	setCode(code: string) {
		this.cookieService.set('code', code);
	}

	setId(id: number) {
		localStorage.setItem("id", id.toString());
	}

	setLogin(login: string) {
		localStorage.setItem("login", login);
	}

	setEmail(email: string) {
		localStorage.setItem("email", email);
	}

	setFirstName(first_name: string) {
		localStorage.setItem("first_name", first_name);
	}

	setLastName(last_name: string) {
		localStorage.setItem("last_name", last_name);
	}

	setUrl(url: string) {
		localStorage.setItem("url", url);
	}

	setDisplayName(display_name: string) {
		localStorage.setItem("display_name", display_name);
	}

	setImageUrl(image_url: string) {
		localStorage.setItem("image_url", image_url);
	}

	setOnline(online: boolean) {
		localStorage.setItem("online", String(online));
	}

	setTfa(two_factor_auth: boolean | undefined) {
		if (two_factor_auth === undefined)
			localStorage.setItem("two_factor_auth", "false");
		else
			localStorage.setItem("two_factor_auth", String(two_factor_auth));
	}

	setQrCode(qrCode: string | undefined) {
		if (qrCode !== undefined && qrCode !== null && qrCode !== 'null')
			localStorage.setItem("qrCode", qrCode);
		else
			localStorage.setItem("qrCode", "");

	}

	clear() {
		localStorage.clear();
		this.cookieService.delete('code');
	}
}
