import { Component, OnInit } from '@angular/core';
import { Tech } from '../models/technology';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-techno-add',
  templateUrl: './techno-add.component.html',
  styleUrls: ['./techno-add.component.css']
})
export class TechnoAddComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addTechno(form: { value: Tech; reset: () => void; }) {
    this.apiService.createTech(form.value).subscribe((result)=>{
      console.log(result);
    });
    form.reset();
  }
}
