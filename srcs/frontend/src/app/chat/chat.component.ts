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

  constructor(private socketService: SocketService, private apiService: ApiService)
  {
  }

  async ngOnInit(): Promise<void> {
    await this.apiService.getAllUsers(this.Me.id).subscribe(
      (result => {
        this.User_list = result;
      }));
  }
  
  onSubmitForm(form: NgForm){
    this.Dest.id = Number(form.value.id);
    this.Dest.login = form.value.login;
    this.Dest.email = form.value.email;
    this.Dest.first_name = form.value.first_name;
    this.Dest.last_name = form.value.last_name;
    this.Dest.url = form.value.url;
    this.Dest.displayname = form.value.display_name;
    this.Dest.image_url = form.value.image_url;
    this.Dest.online = true;
    this.apiService.createUser(this.Dest);
  }

  addUser()
  {
    // this.apiService.
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