import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vip-room',
  templateUrl: './vip-room.component.html',
  styleUrls: ['./vip-room.component.css']
})
export class VipRoomComponent implements OnInit {
  visible:boolean = false;
  visible_avatar:boolean = false;
  visible_nickname:boolean = false;
  // fileToUpload: File | null = null;

  login = localStorage.getItem("login");
  displayname = localStorage.getItem("displayname");
  image_url = localStorage.getItem("image_url");
  nickname = localStorage.getItem("nickname");
  id = localStorage.getItem("id");
  newNickName!:string;

  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
   

  }

  showhide(){
    this.visible = this.visible?false:true;
    this.visible_nickname = false;
    this.visible_avatar = false;
  }

  showhide_avatar(){
    this.visible_avatar = this.visible_avatar?false:true;
    this.visible_nickname = false;
  }

  showhide_nickname(){
    this.visible_nickname = this.visible_nickname?false:true;
    this.visible_avatar = false;
  }

  changeNickname(){
    this.apiService.updateNickName(Number(this.id), this.newNickName).subscribe();
    localStorage.setItem('nickname', this.newNickName)
    this.newNickName = "";

  }


}
