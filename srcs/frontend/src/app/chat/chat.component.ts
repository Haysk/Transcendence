import { Component, OnInit, Input, Inject, Output, EventEmitter} from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { StorageService } from '../services/storage.service';
import { Subject } from 'rxjs';


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
	showchat: boolean = false;
	showFormule: boolean = false;
	privatOrpublic: boolean = false;
	showFormulePassword: boolean = false;
	delay: number = 0;
  	Friend_list!: User[];

	test: boolean = false
	clean: boolean = false;
	channel_name!: string;
	privateChannel!: Channel;

	eventsSubject: Subject<void> = new Subject<void>();
	emitEventToChild() {
	  this.eventsSubject.next();
	}

	constructor(private socketService: SocketService,
		private apiService: ApiService,
		private storageService: StorageService) {
	}

	async ngOnInit(): Promise<void> {
		this.socketService.askForUserList(this.Me.id);
		this.socketService.getConnectionSignal(this.Me.id).subscribe();
		this.socketService.getAllUser().subscribe((result) => {
			this.User_list = result;
		});
		console.log(this.Me);

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

	receiveShowchat($event: boolean) {
		// this.test = !this.test;
		this.showchat = $event;
	}

	receiveSendDest($event : User) {
		this.eventsSubject.next();
		this.Dest = $event;
	}

	receivePrivateChannel($event: Channel) {
		this.privateChannel = $event;
	}

	receveShowformule($event: boolean) {
		this.showFormule = $event;
	}

	receiveShowchannelPrivate($event: boolean) {
		this.privatOrpublic = $event;
	}

	receiveShowFormulePassword($event: boolean) {
		this.showFormulePassword = $event;
	}

	receiveShowSalon($event: boolean) {
		this.privatOrpublic = $event;
	}

	receiveQuitSalon($event: boolean) {
		this.privatOrpublic = $event;
	}

	receiveChannelPublic($event: boolean) {
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
