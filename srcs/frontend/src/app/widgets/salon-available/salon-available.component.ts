import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-salon-available',
  templateUrl: './salon-available.component.html',
  styleUrls: ['./salon-available.component.css']
})
export class SalonAvailableComponent implements OnInit {

  salons_dispos:string[]=[];
  
  constructor(private apiService:ApiService) {

    this.salons_dispos = apiService.getSalons_dispos();

   }

  ngOnInit(): void {
  }

}
