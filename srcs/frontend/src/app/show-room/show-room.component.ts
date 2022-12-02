import { Component, OnInit } from '@angular/core';
import { SGame } from '../models/savedGame';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})


export class ShowRoomComponent implements OnInit {

  matches!: SGame; 
  constructor(service: ApiService, private socketService: SocketService) { 
    //  this.matches = service.getMatches();
    
  }

  ngOnInit(): void {
    this.socketService.receiveMatches().subscribe((res) => {
      this.matches = res;
    })
    this.socketService.getMatches()
  }
}
