import { Component, OnInit, Input, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { StorageService } from '../services/storage.service';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: []
})
@Injectable({
	providedIn: 'root'
})
export class ChatComponent implements OnInit {
	Me: User = {
		id: this.storageService.getId(),
		login: this.storageService.getLogin(),
		email: this.storageService.getEmail(),
		first_name: this.storageService.getFirstName(),
		last_name: this.storageService.getLastName(),
		url: this.storageService.getUrl(),
		displayname: this.storageService.getDisplayName(),
		nickname: this.storageService.getNickName(),
		image_url: this.storageService.getImageUrl(),
		avatar_url: this.storageService.getAvatarUrl(),
		online: this.storageService.getOnline(),
	};
	Dest: User = { id: 0, login: "", email: "", first_name: "", last_name: "", url: "", displayname: "", nickname: "", image_url: "", avatar_url: "", online: false };
	User_list!: User[];
	message: string = '';
	messages: String[] = [];
	showchat: Boolean = false;
	showFormule: Boolean = false;
	privatOrpublic: Boolean = false;
	showFormulePassword: Boolean = false;
	delay: number = 0;
  Friend_list!: User[];

	channel_name!: string;
	privateChannel!: Channel;

	constructor(private socketService: SocketService,
		private apiService: ApiService,
		private storageService: StorageService) {
	}

	async ngOnInit(): Promise<void> {
		// await this.apiService.getAllUsers(this.Me.id).subscribe(
		//   (result => {
		//     this.User_list = result;
		//   }));

		this.socketService.askForUserList(this.Me.id);
		this.socketService.getConnectionSignal(this.Me.id).subscribe();
		this.socketService.getAllUser().subscribe((result) => {
			this.User_list = result;
		});
		console.log(this.Me);
		
    //antoine show friend list ?check if friend 
    this.socketService.getFriend().subscribe((result) => {
    this.Friend_list = result;
    })
    
    this.socketService.removeFriend().subscribe((result) => {
      this.Friend_list = result;
    })

    this.socketService.getFriendList(this.Me.id);
    this.socketService.listFriend().subscribe((result) => {
      this.Friend_list = result;
    })    
	}

	receiveShowchat($event: Boolean) {
		this.showchat = $event
	}

	receiveSendDest($event : User) {
		this.Dest = $event;
	}

	receivePrivateChannel($event: Channel) {
		this.privateChannel = $event;
	}

	receveShowformule($event: Boolean) {
		this.showFormule = $event;
	}

	receiveShowchannelPrivate($event: Boolean) {
		this.privatOrpublic = $event;
	}

	receiveShowFormulePassword($event: Boolean) {
		this.showFormulePassword = $event;
	}

	receiveShowSalon($event: Boolean) {
		this.privatOrpublic = $event;
	}

	receiveQuitSalon($event: Boolean) {
		this.privatOrpublic = $event;
	}

	receiveChannelPublic($event: Boolean) {
		this.privatOrpublic = $event;
	}

	receiveJoinChannelName($event: string) {
		this.channel_name = $event;
	}

	formuleCreate() {
		this.showFormule = this.showFormule ? false : true;
		this.showchat = false;
		this.showFormulePassword = false;
	}

	receiveChannelName($event: string) {
		this.channel_name = $event;
	}

	closeCreateSalon() {
		this.showFormule = false;
		this.showFormulePassword = false;
	}


}
