import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';


// @Input(): guest!:string;

@Component({
  selector: 'app-user-in-salon',
  templateUrl: './user-in-salon.component.html',
  styleUrls: ['./user-in-salon.component.css']
})
export class UserInSalonComponent implements OnInit {

  guest:string="ouioui";
  ifAdmin: boolean=false;
 
 
  constructor() {
    
   }


  ngOnInit(): void {

  }

  show_info(){

    this.ifAdmin = this.ifAdmin?false:true;


  }

}
