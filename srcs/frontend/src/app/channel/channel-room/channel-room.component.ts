import { Component, OnInit } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

@Component({
  selector: 'app-channel-room',
  templateUrl: './channel-room.component.html',
  styleUrls: ['./channel-room.component.css'],

//   providers: [
//     {
//       provide: 'channel',
//     }
// ]
})
export class ChannelRoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
