import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Channel} from '../models/channel';
import { User } from '../models/user';


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  // guests:string[] = [];
  conversation: string[] =[];
  message: string= '';
  quit_salon:Boolean=false;
  
  
  guest!:Channel;
  usersInGuest!: User[];
 
 
  
  @Output() QuitSalonEvent = new EventEmitter<Boolean>();
  @Input() channel_name!:string;
  constructor(private apiService:ApiService) {

   }

   async ngOnInit(): Promise<void> {
    await this.apiService.findChannelByName(this.channel_name).subscribe({
      next: (result) => {
        this.guest = result;
      
        if (this.guest.joined){
        this.usersInGuest=this.guest.joined  }
        
      },
      
      error: (err) => {},
      complete: () => {}
    }
    )
  }
  

  sendMessage(){
    console.log(this.message);
    this.conversation.push(this.message);
    this.message= '';
  }

  quitSalon(){
    this.QuitSalonEvent.emit(this.quit_salon);


  }
}
