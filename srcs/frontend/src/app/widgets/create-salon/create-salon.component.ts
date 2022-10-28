import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user'
import { Channel } from '../../models/channel'
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-salon.component.html',
  styleUrls: ['./create-salon.component.css']
})
export class CreateSalonComponent implements OnInit {

  show:boolean = false;
  show_salon: Boolean=true;

  @Output() ShowSalonEvent = new EventEmitter<Boolean>();
  @Output() SendChannelNameEvent = new EventEmitter<string>();
  


  constructor(private socketService: SocketService, private apiService: ApiService) { }

  channel_name : string = "";
  channel_creator !: User;
  channel_password: string = "";
  current_channel !: Channel;

  ngOnInit(): void {
    this.apiService.findUserByLogin(String(localStorage.getItem("login"))).subscribe(
      {
        next:(result) => {
          //console.log("findUserByLogin response : " + result.login);
          this.channel_creator = result;
        },
        error: (err) => {},
        complete:() => {}
      }
    )

  }

  showform(){
    this.show=!this.show;
  }

  hideform(){
    this.show=false;
  }

  createSalon(){
    
    //this.apiService.addChannel(this.channel_name, this.channel_creator.id).subscribe();
    this.socketService.addChannel(this.channel_name, this.channel_creator.id);
    this.ShowSalonEvent.emit(this.show_salon);
    this.SendChannelNameEvent.emit(this.channel_name);

  }

  createPrivateSalon(){
    console.log("createPrivateSalon()");
    this.apiService.addPrivateChannel(this.channel_name, this.channel_creator.id, this.channel_password).subscribe();
    this.ShowSalonEvent.emit(this.show_salon);
    
  }


}
