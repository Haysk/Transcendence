import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-invitation-jouer',
  templateUrl: './invitation-jouer.component.html',
  styleUrls: ['./invitation-jouer.component.css']
})
export class InvitationJouerComponent implements OnInit {

  @Input() from!: User;
  @Input() to!: User;

  toDisplay: boolean = false;
  gameAccepted: boolean = false;
  gameIsReady: boolean = false;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {

    this.socketService.doIHaveToDisplay().subscribe((res) => {
      this.toDisplay = res;
    })

    this.socketService.isGameAccepted().subscribe((res) => {
      this.gameAccepted = res;
    })

    this.socketService.isGameReady().subscribe((res) => {
      this.gameIsReady = res;
    })
  }

}
