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
	tfa_auth: boolean = false;
	tfa_validation: boolean = false;
	qrCode: string = "";
	tfa_key: string = "";
	tfa_count: number = 3;
	//fileToUpload: File | null = null;

	displayname = this.storage.getDisplayName();
	image_url = this.storage.getUrl();
	ngOnInit(): void {
		this.tfa_auth = this.storage.getTwoFactorAuth();
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

	tfa_signup() {
		this.api.signupTfa(this.storage.getCode()).subscribe({
			next: (result) => {
				if (result.tfa_qr) {
					this.storage.setQrCode(result.tfa_qr);
					this.qrCode = result.tfa_qr;
				}
				this.tfa_auth = true;
				this.tfa_validation = true;
			}
		});
	}

	tfa_disable() {
		this.api.disableTfa(this.storage.getCode()).subscribe({
			next: (result) => {
				this.storage.setQrCode(undefined);
				this.qrCode = "";
				this.tfa_auth = false
				this.tfa_validation = false;
			},
		});
	}

	tfa_verify() {
		this.api.verifyTfa({code : this.storage.getCode(), tfa_key: this.tfa_key}).subscribe({
			next: (result) => {
				console.log(result);
				if (result) {
					this.tfa_validation = false;
					this.storage.setTfa(true);
				}
				else if (this.tfa_count < 2) {
					this.tfa_auth = false;
					this.tfa_count = 3;
					this.tfa_validation = false;
					this.tfa_disable();
				}
				else
					this.tfa_count--;
				this.tfa_key = "";
			},
		});
		
	}
}
