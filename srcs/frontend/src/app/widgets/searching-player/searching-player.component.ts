import { Component,Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/oauth';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-searching-player',
  templateUrl: './searching-player.component.html',
  styleUrls: ['./searching-player.component.css']
})
export class SearchingPlayerComponent {
  
  @Output() showSearchingPlayerEvent = new EventEmitter<boolean>();
  constructor(private socketService: SocketService){}

  giveUp(){
    this.socketService.stopMatchmaking(false); //Mettre true si on met les bonus dans le matchmaking
    this.showSearchingPlayerEvent.emit(false);
  }



}
