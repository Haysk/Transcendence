import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  createDate!: Date;
  testEnter!: string;
  snaps!: number;
  constructor() {}

  ngOnInit(): void {
    this.createDate = new Date();
    this.snaps = 0;
    this.testEnter = 'enter';
  }
  onTest() {
    if (this.testEnter === 'Oh Snap!') {
      this.snaps++;
      this.testEnter = 'Oops, unSnap!';
    }
    else {
      this.snaps--;
      this.testEnter = 'Oh Snap!';
    }
  }
}
