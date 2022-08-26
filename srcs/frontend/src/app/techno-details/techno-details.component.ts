import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tech } from '../models/technology';

@Component({
  selector: 'app-techno-details',
  templateUrl: './techno-details.component.html',
  styleUrls: ['./techno-details.component.css']
})
export class TechnoDetailsComponent implements OnInit {
  @Input()
  tech!: Tech;

  @Output()
  deleteTech = new EventEmitter<Tech>;

  constructor() { }

  ngOnInit(): void {
  }

  delete(tech: Tech) {
    console.log('delete', tech);
    this.deleteTech.emit(tech);
  }
}
