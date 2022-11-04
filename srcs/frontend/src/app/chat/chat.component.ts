import { Component, OnInit, Input, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { NgForm } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { share } from 'rxjs';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: [
		{
			provide: 'user_list',
			useValue: [
				{ id: 1, name: "Alex", online: true },
				{ id: 2, name: "Antoine", online: true },
				{ id: 3, name: "Arnaud", online: true },
				{ id: 4, name: "Ching", online: false },

			]
		},
		{
			provide: 'whoAmI',
			//useValue : {id: 2, name: "Antoine", online: true}
			useValue: { id: 1, name: "Alexandre", email: "someEmail", online: true }
		},
		// {
		//   provide: 'user_list',
		//   useValue: [
		//     {id: 1, login: "Alexandre", online: true},
		//     {id: 2, login: "Antoine", online: true},
		//     {id: 3, login: "Arnaud", online: false},
		//     {id: 4, login: "Ching", online: true}
		//   ]
		// },
		// {
		//   provide: 'whoAmI',
		//   //useValue : {id: 2, login: "Antoine", online: true}
		//   useValue: {id: 1, login: "Alexandre", email: "someEmail", online: true}
		// },
	]
})
export class ChatComponent implements OnInit {
	constructor(private socketService: SocketService,
		private apiService: ApiService,
		private storage: StorageService) {
	}

	Dest: User = { id: 0, login: "", email: "", first_name: "", last_name: "", url: "", displayname: "", image_url: "", online: false};
	User_list!: User[];
	message: string = '';
	messages: String[] = [];
	showchat: Boolean = false;

	showFormule: Boolean = false;

	receiveShowchat($event: Boolean) {
		this.showchat = $event
	}

	receiveSendDest($event: User) {
		this.Dest = $event;
	}

	formuleCreate() {
		this.showFormule = this.showFormule ? false : true;

	}


	async ngOnInit(): Promise<void> {
		this.apiService.getUsers(this.storage.getCode()).subscribe(
			(result => {
				this.User_list = result;
			}));

		this.socketService.sendLogin(this.storage.getLogin()); //obtenir son socket

		// this.socketService.getPrivMsg().subscribe((result => {
		//   this.test = result;
		// }))
	}




}
