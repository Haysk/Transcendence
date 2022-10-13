import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-salon.component.html',
  styleUrls: ['./create-salon.component.css']
})
export class CreateSalonComponent implements OnInit {

  show:boolean = false;
  show_salon: Boolean=true;

  @Output() ShowSalonEvent = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  showform(){
    this.show=!this.show;
  }

  hideform(){
    this.show=false;
  }

  createSalon(){
    this.ShowSalonEvent.emit(this.show_salon);
    
  }


}
