import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Message } from '../models/message'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
  @Input() Me!: User;
  @Input() Dest!: User;
  messages!: Message[];
  constructor(private apiService: ApiService) {}

  //potentiellement besoin de await si on vois que les messages ne se chargent pas
  async ngOnInit(): Promise<void> {
    this.apiService.getMessages(this.Dest.id, this.Me.id).subscribe(
      (result => {
        this.messages = result;
      }));
  }
}
