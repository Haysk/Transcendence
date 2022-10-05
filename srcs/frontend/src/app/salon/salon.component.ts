import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  message: string= '';
  conversation: string[] =[];
 

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(){
    console.log(this.message);
    this.conversation.push(this.message);
    this.message= '';
  }
}
