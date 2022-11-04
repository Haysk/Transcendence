import { Component, OnInit } from '@angular/core';
import { share } from 'rxjs';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
	selector: 'app-vip-room',
	templateUrl: './vip-room.component.html',
	styleUrls: ['./vip-room.component.css']
})

export class VipRoomComponent implements OnInit {

	constructor(private storage: StorageService,
				private api: ApiService) {

		this.qrCode = this.storage.getQrCode();
				 }

	visible:boolean = false;
	visible_avatar:boolean = false;
	visible_nickname:boolean = false;
	two_factor_auth: boolean = false;
	qrCode: string = "";
	verify_tfa_key: string = "";
	//fileToUpload: File | null = null;

	displayname = this.storage.getDisplayName();
	image_url = this.storage.getUrl();
	ngOnInit(): void {
		this.two_factor_auth = this.storage.getTwoFactorAuth();
		this.qrCode = this.storage.getQrCode();
	}

	showhide() {
		this.visible = this.visible ? false : true;
		this.visible_nickname = false;
		this.visible_avatar = false;
	}

	showhide_avatar() {
		this.visible_avatar = this.visible_avatar ? false : true;
		this.visible_nickname = false;
	}

	showhide_nickname() {
		this.visible_nickname = this.visible_nickname ? false : true;
		this.visible_avatar = false;
	}

	toggle_two_factor_auth(auth: boolean) {
		this.storage.updateTfa(auth);
		if (auth) {
			this.api.signupTfa({ code: this.storage.getCode() }).subscribe({
				next: (result) => {
					this.storage.setQrCode(result.tfa_qr);
					if (result.tfa_qr)
						this.qrCode = result.tfa_qr;
					this.two_factor_auth = auth;
				}
			});
		}
		else 
			this.two_factor_auth = auth;
	}

	tfa_verify() {
		console.log(this.verify_tfa_key);
		
		this.api.verifyTfa({code : this.storage.getCode(), verify_tfa_key: this.verify_tfa_key}).subscribe({
			next: (result) => {
				console.log(result);
			}
		});
		this.verify_tfa_key = "";
		const date = Date.now();
		console.log(date);
		
	}
	// handleFileInput(files: FileList) {
	// 	this.fileToUpload = files.item(0);
	// }
}
