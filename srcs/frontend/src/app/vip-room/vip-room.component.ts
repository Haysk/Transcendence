import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vip-room',
  templateUrl: './vip-room.component.html',
  styleUrls: ['./vip-room.component.css']
})
export class VipRoomComponent implements OnInit {

  displayname = localStorage.getItem("displayname");
  image_url = localStorage.getItem("image_url");
  constructor() { }

  ngOnInit(): void {
  }

}
