import { Component, OnInit, Input, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { NgForm }   from '@angular/forms';
import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';


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
      useValue: {id: 1, name: "Alexandre", email: "someEmail", online: true}
    },
]
})
@Injectable({
  providedIn: 'root'
})
export class ChatComponent implements OnInit {
  Me: User = {
              id: this.getId(),
              login: this.getLogin(),
              email: this.getEmail(),
              first_name: this.getFirstName(),
              last_name: this.getLastName(),
              url: this.getUrl(),
              displayname: this.getDisplayName(),
              nickname: this.getNickname(),
              image_url: this.getImageUrl(),
              avatar_url: this.getAvatarUrl(),
              online: this.getOnline(),
              oauth_id: 118218,
            };
  Dest: User = {id: 0, login: "", email: "", first_name: "", last_name: "", url: "", displayname: "", nickname:"", image_url: "", avatar_url: "", online: false};
  User_list!: User[];
  message: string = '';
  messages: String[] = [];
  showchat:Boolean=false ;
  showFormule:Boolean=false;
  privatOrpublic:Boolean=false;
  showFormulePassword:Boolean=false;
  delay:number = 0;

  channel_name!: string ;
  privateChannel!: Channel;

	receiveShowchat($event: Boolean) {
		this.showchat = $event
	}

  receivePrivateChannel($event:Channel){
    this.privateChannel= $event;
  }
  
  receveShowformule($event:Boolean){
    this.showFormule= $event;
  }

  receiveShowchannelPrivate($event:Boolean){
    this.privatOrpublic= $event;
  }

  receiveShowFormulePassword($event:Boolean){
    this.showFormulePassword= $event;
  }

  receiveShowSalon($event: Boolean) {
    this.privatOrpublic = $event;
  }

  receiveQuitSalon($event: Boolean) {
    this.privatOrpublic = $event;
  }

  receiveChannelPublic($event:Boolean){
    this.privatOrpublic= $event;
  }

  receiveJoinChannelName($event:string){
    this.channel_name= $event;
  }

  formuleCreate(){
    this.showFormule=this.showFormule?false:true;
    this.showchat=false;
    this.showFormulePassword=false;
  }

  receiveChannelName($event: string){
    this.channel_name= $event;
  }

  closeCreateSalon(){
    this.showFormule=false;
    this.showFormulePassword=false;
  }

  constructor(private socketService: SocketService, private apiService: ApiService)
  {
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
      })
  }


}
