import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-in-salon',
  templateUrl: './user-in-salon.component.html',
  styleUrls: ['./user-in-salon.component.css']
})
export class UserInSalonComponent implements OnInit {

  guests:string[] = [];
  ifAdmin: boolean=false;
  constructor(private apiService:ApiService) {
    this.guests = apiService.getGuests();
   }


  ngOnInit(): void {

  }

  show_info(){

    this.ifAdmin = this.ifAdmin?false:true;


  }

}
