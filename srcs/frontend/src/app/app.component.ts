import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from './services/socket.service';
import { User } from './models/user';
import { StorageService } from './services/storage.service';
import { IGame } from './pong/game/interfaces/game.interface';
import { defaultGameConfig } from './pong/game/config';
import { SGame } from '../app/models/savedGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
	constructor(
    public route: ActivatedRoute,
		public router: Router,
    private socketService: SocketService,
    private storageService: StorageService){
  }
  
  invitationFromWho! :User;
  refuseFromWho! : User;
  player1!: User;
  player2!: User;
  gameConfig!: IGame;
  invitation:boolean=false;
  refuse:boolean=false;
  gameAccepted:boolean = false;
  gameIsReady:boolean = false;
  showPong:boolean =false;
  global5!: {player1: User, player2:  User, gameConfig: IGame};
  roomName!:string;
  redirectPong:boolean = false;
  showSearchingPlayer:boolean =false;
  GameData!: SGame;
  showGameScore:boolean = false;

  to: User = {
		id: this.storageService.getId(),
		login: this.storageService.getLogin(),
		email: this.storageService.getEmail(),
		first_name: this.storageService.getFirstName(),
		last_name: this.storageService.getLastName(),
		url: this.storageService.getUrl(),
		displayname: this.storageService.getDisplayName(),
		nickname: this.storageService.getNickName(),
		image: this.storageService.getImage(),
		avatar: this.storageService.getAvatar(),
		online: this.storageService.getOnline(),
	};

  ngOnInit(): void {
    // this.socketService.doIHaveToDisplay().subscribe((res) => {
    //   this.invitation = res;
    // })

    this.socketService.isGameAccepted().subscribe((data) => {
      this.gameAccepted = data.res;
      console.log(data.res);
      
      if(this.gameAccepted == true)
      {

        // this.showPong=true;
        this.invitation=false;
        // console.log("player1 : ");
        // console.log(data.res3);
        // console.log("player2 : ");
        // console.log(data.res2);
      }
    })

    this.socketService.areYouReady().subscribe((res) => {
      this.gameIsReady = res;
      this.invitation = false;
    })

    this.socketService.doIHaveToDisplay().subscribe({
      next: (data: {res: boolean, res2:User, res3:User, res4: IGame;}) =>{
      this.invitation = data.res;
      this.invitationFromWho = data.res2;
      this.player1 = data.res2;
      this.player2 = data.res3;
      this.gameConfig = data.res4;
      }
    })

    this.socketService.showrefuseInvitation().subscribe({
      next: (data: {res: boolean, res2:User;}) =>{
      this.refuse = data.res;
      this.refuseFromWho = data.res2;
      }
    })

    this.socketService.isGameReady().subscribe({
      next: (data: {res: User, res2: User, res3: IGame}) => {
        this.player1 = data.res;
        this.player2 = data.res2;
        this.gameConfig = data.res3;
        this.setUpGameConfig();
        this.gameConfig = structuredClone(defaultGameConfig);
        this.roomName = this.createGameRoomName(this.player1.login, this.player2.login);
        if(this.player1.id == Number(this.storageService.getId()))
          this.socketService.createGame(this.roomName, this.gameConfig, this.player1, this.player2);
        this.gameIsReady=false;
        this.redirectPong=true;
        // console.log("LA LISTE :");
        // console.log("PLAYER 1 :");
        // console.log(this.player1);
        // console.log("PLAYER 2 :");
        // console.log(this.player2);
        // console.log("GAME CONFIG : ");
        // console.log(this.gameConfig);
        
      }
    })
    this.socketService.isGameFinished().subscribe((res) => {
      this.GameData = res;
      this.redirectPong= false;
      this.showGameScore = true;
    })
  }

  ngOnDestroy() {
	this.socketService.unsubscribeSocket("DisplayInvitation");
	this.socketService.unsubscribeSocket("refuseInvitation");
  }

  createGameRoomName(login1: string, login2: string): string{
    let result: string;

    if (login1 < login2)
      result = login1 + login2;
    else
      result = login2 + login1;
    result = result + "_game"
    return result;
  }

  setUpGameConfig() //PLAYER 1 EST A GAUCHE
  {
    let id = Number(this.storageService.getId());
    if (id == this.player1.id)
    {
      this.gameConfig.left.mode.type = "local";
      this.gameConfig.right.mode.type = "remote";
    }
    else if (id == this.player2.id)
    {
      this.gameConfig.left.mode.type = "remote";
      this.gameConfig.right.mode.type = "local";
    }
  }

  public getLogin(): string | null{
	var login = localStorage.getItem("login");
  this.socketService.sendLogin(String(login)); //mettre son socket a jour
	if (login == undefined) {
		return null;
	}
	return login;
  }

  public getRoute() {
	return this.router.url.split("?")[0];
  }

  receiveShowInivtationEvent($event: boolean){
    this.invitation = $event;
  }

  receiverefueInvitationEvent($event: boolean){
    this.refuse = $event;
  }

  receiveGlobal4Event($event: any){
    this.global5= $event;
    this.player1 = this.global5.player1;
    this.player2 = this.global5.player2;
    this.gameConfig = this.global5.gameConfig;
  }

  receiveCloseScoreEvent($event:boolean){
       this.showGameScore= $event;
  }

  receiveShowSearchingPlayerEvent($event:boolean){
    this.showSearchingPlayer= $event;
}

}

