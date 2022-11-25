import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from './services/socket.service';
import { User } from './models/user';
import { StorageService } from './services/storage.service';
import { IGame } from './pong/game/interfaces/game.interface';

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

        this.showPong=true;
        this.invitation=false;
        console.log("player1 : ");
        console.log(data.res3);
        console.log("player2 : ");
        console.log(data.res2);
       
        
        //lancer le jeu la
      }
    })

    this.socketService.areYouReady().subscribe((res) => {
      //lancer le jeu la
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
  }

  ngOnDestroy() {
	this.socketService.unsubscribeSocket("DisplayInvitation");
	this.socketService.unsubscribeSocket("refuseInvitation");
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

}
