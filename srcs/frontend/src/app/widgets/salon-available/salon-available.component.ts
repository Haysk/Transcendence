import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Channel} from '../../models/channel'
import{ User } from '../../models/user'
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-salon-available',
  templateUrl: './salon-available.component.html',
  styleUrls: ['./salon-available.component.css']
})



export class SalonAvailableComponent implements OnInit {

  show_salon: Boolean=true;
 
  @Output() ShowChannelPublicEvent= new EventEmitter<Boolean>();
  @Output() SendJoinChannelNameEvent = new EventEmitter<string>();
  


  salons_dispos: Channel[] = [];
  @Input() current_user !:User;
  
  constructor(private apiService:ApiService, private socketService: SocketService) {

    

   }

  async ngOnInit(): Promise<void> {
    await this.apiService.getAllChannels().subscribe({
      next: (result) => {
        this.salons_dispos = result;
      },
      error: (err) => {},
      complete: () => {}
    }
    )

    this.socketService.updateChannelList().subscribe({
      next: (result) => {
        console.log("ICI LE RESULT => ");
        console.log(result);
        
        this.salons_dispos = result;
      }
    })
  }

  joinChannel(current_channel: Channel, current_user: User)
  {
    console.log("salon_available : channel name : " + current_channel.name + " | user name : " + current_user.login);
    console.log(current_user);
    this.socketService.joinChannel(current_channel.name, this.current_user.id);
    //this.apiService.joinChannel(current_channel, current_user).subscribe();
    this.ShowChannelPublicEvent.emit(this.show_salon);
    this.SendJoinChannelNameEvent.emit(current_channel.name);
  }
}
