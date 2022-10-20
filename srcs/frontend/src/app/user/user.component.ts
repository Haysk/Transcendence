import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
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
