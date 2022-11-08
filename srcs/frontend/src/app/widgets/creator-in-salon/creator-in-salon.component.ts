import { Component, OnInit,Input } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-creator-in-salon',
  templateUrl: './creator-in-salon.component.html',
  styleUrls: ['./creator-in-salon.component.css']
})
export class CreatorInSalonComponent implements OnInit {
  @Input() guest!: User;
  @Input() usersAdmin:User[] =[];


  constructor() { }

  ngOnInit(): void {
  }

}
