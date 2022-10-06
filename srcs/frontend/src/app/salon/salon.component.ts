import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  guests:string[] = [];
  message: string= '';
  conversation: string[] =[];
  

  constructor(private apiService:ApiService) {
    this.guests = apiService.getGuests();
   }

  ngOnInit(): void {
  }

  sendMessage(){
    console.log(this.message);
    this.conversation.push(this.message);
    this.message= '';
  }
}
