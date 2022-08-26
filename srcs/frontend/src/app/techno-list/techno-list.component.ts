import { Component, OnInit } from '@angular/core';
import { Tech } from '../models/technology';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-techno-list',
  templateUrl: './techno-list.component.html',
  styleUrls: ['./techno-list.component.css']
})
export class TechnoListComponent implements OnInit {
  dataSource: Tech[] = [];
  techno: Tech = {
    id: 0,
    name: '',
    category: '',
    details: ''
  };
  //allTechnos!: Observable<Technology[]>;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTechnos();
  }

  getTechnos() {
    this.apiService.getTechs().subscribe((result)=>{
      console.log(result);
      this.dataSource = result;
    });
  }

  async deleteTechno(techno: Tech) {
    console.log('deleteTechno', techno);
    this.apiService.removeTech(techno.id).subscribe((result)=>{
      console.log(result);
    });
    await new Promise(f => setTimeout(f, 50));//peux mieux faire
    this.getTechnos();
  }
}
