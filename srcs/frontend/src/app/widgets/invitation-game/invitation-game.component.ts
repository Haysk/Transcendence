import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../models/user'
import { SocketService } from '../../services/socket.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitation-game',
  templateUrl: './invitation-game.component.html',
  styleUrls: ['./invitation-game.component.css']
})
export class InvitationGameComponent implements OnInit {

  @Input() fromWho!: User;
  @Input() to!: User;
  @Output() showInvitationEvent = new EventEmitter<boolean>();

  toDisplay: boolean = false;
  gameAccepted: boolean = false;
  gameIsReady: boolean = false;

  constructor(private socketService: SocketService, private storageService: StorageService, public router: Router) {}

  ngOnInit(): void {
    // this.socketService.doIHaveToDisplay().subscribe((res) => {
    //   this.toDisplay = res;
    // })
    
    // this.socketService.isGameAccepted().subscribe((res) => {
    //   this.gameAccepted = res;
    //   console.log("BIEN RECU")
    // })

    // this.socketService.isGameReady().subscribe((res) => {
    //   this.gameIsReady = res;
    // })
  }

  Nothanks(){

    this.socketService.refuseInvitation(this.fromWho, String(this.storageService.getLogin()));
    this.showInvitationEvent.emit(false);
    
  }

  Yesplease(){
    this.socketService.acceptInvitation(this.fromWho, this.to);
    console.log("IMPORTANT");
    console.log(this.to);
    
    //let data = {fromWho: this.fromWho, to: this.to}
    //this.router.navigateByUrl('/pong');
  }

}
