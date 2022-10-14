import { Component, OnInit, Input, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { NgForm }   from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    {
      provide: 'user_list',
      useValue: [
        {id: 1, name: "Alex", online: true},
        {id: 2, name: "Antoine", online: true},
        {id: 3, name: "Arnaud", online: true},
        {id: 4, name: "Ching", online: false},

      ]
    },
    {
      provide: 'whoAmI',
      //useValue : {id: 2, name: "Antoine", online: true}
      useValue: {id: 1, name: "Alexandre", email: "someEmail", online: true}
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
  Me: User = {
              id: this.getId(),
              login: this.getLogin(),
              email: this.getEmail(),
              first_name: this.getFirstName(),
              last_name: this.getLastName(),
              url: this.getUrl(),
              displayname: this.getDisplayName(),
              image_url: this.getImageUrl(),
              online: this.getOnline(),
            };
  Dest: User = {id: 0, login: "", email: "", first_name: "", last_name: "", url: "", displayname: "", image_url: "", online: false};
  User_list!: User[];
  message: string = '';
  messages: String[] = [];
  showchat:Boolean=false ;

  showFormule:Boolean=false;

  privatOrpublic:Boolean=false;

  receiveShowchat($event: Boolean) {
      this.showchat = $event
  }

  receiveSendDest($event : User) {
      this.Dest = $event;
  }
  
  receiveShowSalon($event: Boolean) {
    this.privatOrpublic = $event
  }

  receiveQuitSalon($event: Boolean) {
    this.privatOrpublic = $event
}


  formuleCreate(){
    this.showFormule=this.showFormule?false:true;
    this.showchat=false;

  }

  closeCreateSalon(){
    this.showFormule=false;
  }

  constructor(private socketService: SocketService, private apiService: ApiService)
  {
  }

  async ngOnInit(): Promise<void> {
    await this.apiService.getAllUsers(this.Me.id).subscribe(
      (result => {
        this.User_list = result;
      }));

      this.socketService.sendLogin(this.Me.login); //obtenir son socket

      // this.socketService.getPrivMsg().subscribe((result => {
      //   this.test = result;
      // }))
  }

  getId(): number{
    let id = localStorage.getItem("id");
    if (id === null || id === undefined)
      return 0;
    return  Number(id);
  }

  getLogin(): string{
    let login = localStorage.getItem("login");
    if (login === null || login === undefined)
      return "";
    return  login;
  }

  getEmail(): string{
    let email = localStorage.getItem("email");
    if (email === null || email === undefined)
      return "";
    return  email;
  }

  getFirstName(): string{
    let first_name = localStorage.getItem("first_name");
    if (first_name === null || first_name === undefined)
      return "";
    return  first_name;
  }

  getLastName(): string{
    let last_name = localStorage.getItem("last_name");
    if (last_name === null || last_name === undefined)
      return "";
    return  last_name;
  }

  getUrl(): string{
    let url = localStorage.getItem("url");
    if (url === null || url === undefined)
      return "";
    return  url;
  }

  getDisplayName(): string{
    let display_name = localStorage.getItem("display_name");
    if (display_name === null || display_name === undefined)
      return "";
    return  display_name;
  }

  getImageUrl(): string{
    let image_url = localStorage.getItem("image_url");
    if (image_url === null || image_url === undefined)
      return "";
    return  image_url;
  }

  getOnline(): boolean{
    let online = localStorage.getItem("online");
    if (online === "true")
      return true
    else
      return false
  }




}