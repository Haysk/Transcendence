import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  createDate!: Date;
  constructor() {}

  ngOnInit(): void {
    this.createDate = new Date();
  }

}
