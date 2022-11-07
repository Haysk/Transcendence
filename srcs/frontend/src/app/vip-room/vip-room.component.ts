import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { share } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
	selector: 'app-vip-room',
	templateUrl: './vip-room.component.html',
	styleUrls: ['./vip-room.component.css']
})

export class VipRoomComponent implements OnInit {
	visible: boolean = false;
	visible_avatar: boolean = false;
	visible_nickname: boolean = false;

	login = localStorage.getItem("login");
	displayname = localStorage.getItem("displayname");
	image_url = localStorage.getItem("image_url");
	avatar_url = localStorage.getItem("avatar_url");
	nickname = localStorage.getItem("nickname");
	id = localStorage.getItem("id");
	newNickName!: string;
	tfa_auth: boolean = false;
	tfa_validation: boolean = false;
	qrCode: string = "";
	tfa_key: string = "";
	tfa_count: number = 3;
	//fileToUpload: File | null = null;


	// selectedFile!:File ;
	// onFileSelected(event){
	//  console.log(event);
	//  this.selectedFile = event.target.files[0];
	// }

	// onUpload(){
	//   const fd = new FormData();
	//   fd.append('image', this.selectedFile, this.selectedFile.name);
	//   console.log(this.selectedFile);
	//   this.http.post('http://localhost:8081/api/upload/', fd).subscribe(res =>{
	//     console.log(res);
	//   })

	// }

	selectedFile!: File;
	url = this.avatar_url;


	onSelect(event) {

		this.selectedFile = event.target.files[0];
		let fileType = event.target.files[0].type;
		if (fileType.match(/image\/*/)) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event: any) => {
				this.url = event.target.result;
				console.log("avatar url:" + this.avatar_url);
				console.log("new avatar url" + this.url);
				// console.log(event);
			};
		} else {
			window.alert('Please select correct image format');
		}
	}

	onUpload() {

		if (this.selectedFile.size < 75000) {
			this.apiService.updateAvatar(Number(this.id), String(this.url)).subscribe();
			console.log("this.url")
			this.storage.setAvatarUrl(String(this.url));
			window.alert('***Update down***');
		}
		else {
			window.alert('***image too large only < 75kb ***');
		}



		// this.http.post('https://localhost:8081/api/upload/', this.selectedFile).subscribe();



		//   this.http.post('https://localhost:8081/api/upload/', {name: this.url}).subscribe(
		// );
	}


	constructor(private apiService: ApiService,
		private http: HttpClient,
		private storage: StorageService
	) {
		this.qrCode = this.storage.getQrCode();
	}

	ngOnInit(): void {
		this.tfa_auth = this.storage.getTwoFactorAuth();
		this.qrCode = this.storage.getQrCode();
	}

	showhide() {
		this.visible = this.visible ? false : true;
		this.visible_nickname = false;
		this.visible_avatar = false;
	}

  changeNickname(){
    this.apiService.updateNickName(Number(this.id), this.newNickName).subscribe();
    localStorage.setItem('nickname', this.newNickName)
    this.newNickName = "";

  }

	showhide_nickname() {
		this.visible_nickname = this.visible_nickname ? false : true;
		this.visible_avatar = false;
	}

	showhide_avatar() {
		this.visible_avatar = this.visible_avatar ? false : true;
		this.visible_nickname = false;
	}

	tfa_signup() {
		this.apiService.signupTfa(this.storage.getCode()).subscribe({
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
		this.apiService.disableTfa(this.storage.getCode()).subscribe({
			next: (result) => {
				this.storage.setQrCode(undefined);
				this.qrCode = "";
				this.tfa_auth = false
				this.tfa_validation = false;
			},
		});
	}

	tfa_verify() {
		this.apiService.verifyTfa({code : this.storage.getCode(), tfa_key: this.tfa_key}).subscribe({
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
