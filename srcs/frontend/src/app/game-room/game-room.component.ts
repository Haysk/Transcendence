import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {
  visible! :boolean;
  constructor() { }

  ngOnInit(): void {
    this.visible=false;
  }

  showavailable(){
    this.visible= this.visible?false:true;
    console.log(this.visible);

  }

}
