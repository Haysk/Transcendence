import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user'
import { Channel } from '../../models/channel'
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-salon.component.html',
  styleUrls: ['./create-salon.component.css']
})
export class CreateSalonComponent implements OnInit {

  show:boolean = false;
  show_salon: Boolean=true;

  @Output() ShowSalonEvent = new EventEmitter<Boolean>();

  constructor(private apiService: ApiService) { }
  channel_name : string = "";
  channel_creator !: User;
  channel_password: string = "";
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
    console.log("createSalon()");
    this.apiService.addChannel(this.channel_name, this.channel_creator.id).subscribe();
    this.ShowSalonEvent.emit(this.show_salon);
  }

  createPrivateSalon(){
    console.log("createPrivateSalon()");
    this.apiService.addPrivateChannel(this.channel_name, this.channel_creator.id, this.channel_password).subscribe();
    this.ShowSalonEvent.emit(this.show_salon);
  }


}
