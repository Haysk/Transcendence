import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Channel} from '../../models/channel'


@Component({
  selector: 'app-salon-available',
  templateUrl: './salon-available.component.html',
  styleUrls: ['./salon-available.component.css']
})



export class SalonAvailableComponent implements OnInit {

  salons_dispos: Channel[] = [];
  
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
}
