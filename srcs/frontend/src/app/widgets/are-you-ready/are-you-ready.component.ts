import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from "../../services/socket.service";
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/oauth';


@Component({
  selector: 'app-are-you-ready',
  templateUrl: './are-you-ready.component.html',
  styleUrls: ['./are-you-ready.component.css']
})
export class AreYouReadyComponent {

  @Input() player1 !: User;
  @Input() player2 !: User;

  constructor(private socketService: SocketService, private storageService: StorageService){}

  ngOnInit() {
  }

  imReady()
  {
    this.socketService.readySignal(this.player1.login, this.player2.login);
  }

}
