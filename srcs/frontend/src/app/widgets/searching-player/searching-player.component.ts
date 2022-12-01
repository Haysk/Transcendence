import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searching-player',
  templateUrl: './searching-player.component.html',
  styleUrls: ['./searching-player.component.css']
})
export class SearchingPlayerComponent {
  
  @Output() showSearchingPlayerEvent = new EventEmitter<boolean>();

  giveUp(){
    this.showSearchingPlayerEvent.emit(false);
  }



}
