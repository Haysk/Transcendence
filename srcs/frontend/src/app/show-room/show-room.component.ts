import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})
export class ShowRoomComponent implements OnInit {

  matches = ["chilee vs ade-temm", "anclarmat vs antton-t", "sara vs julien"];
  constructor() { }

  ngOnInit(): void {
  }

}
