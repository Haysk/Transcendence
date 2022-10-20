import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Channel} from '../../models/channel'
import{ User } from '../../models/user'


@Component({
  selector: 'app-salon-available',
  templateUrl: './salon-available.component.html',
  styleUrls: ['./salon-available.component.css']
})



export class SalonAvailableComponent implements OnInit {

  salons_dispos: Channel[] = [];
  @Input() current_user !:User;
  
  constructor(private apiService:ApiService) {

    

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
  }

  joinChannel(current_channel: Channel, current_user: User)
  {
    console.log("salon_available : channel name : " + current_channel.name + " | user name : " + current_user.login);
    this.apiService.joinChannel(current_channel, current_user).subscribe();
  }
}
