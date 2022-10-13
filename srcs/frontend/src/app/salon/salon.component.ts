import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  // guests:string[] = [];
  conversation: string[] =[];
  message: string= '';
  

  constructor() {

   }

  ngOnInit(): void {
  }

  sendMessage(){
    console.log(this.message);
    this.conversation.push(this.message);
    this.message= '';
  }
}
