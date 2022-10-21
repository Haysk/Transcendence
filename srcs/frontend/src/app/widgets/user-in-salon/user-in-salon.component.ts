import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Channel } from 'src/app/models/channel';

@Component({
  selector: 'app-user-in-salon',
  templateUrl: './user-in-salon.component.html',
  styleUrls: ['./user-in-salon.component.css']
})
export class UserInSalonComponent implements OnInit {

  @Input() guest!:Channel;
 
  ifAdmin:boolean=false;
  ifMuet:boolean=false;
  val_admin:string="Be Admin";
  val_muet:string="Muet"
  showOption: boolean=false;
  color1:string="rgb(44, 136, 125)";
  color2:string="rgb(44, 136, 125)";
  constructor() {
   
   }


  ngOnInit(): void {

  }

  show_info(){

    this.showOption = this.showOption?false:true;
  }
   
  beAdmin(){
    this.ifAdmin=!this.ifAdmin;
    this.val_admin=this.ifAdmin?"Be Admin":"Del Admin";
    this.color1=this.ifAdmin?"rgb(44, 136, 125)":"rgb(76, 80, 79)";
   
  }
  
  beMuet(){
    this.ifMuet=!this.ifMuet;
    this.val_muet=this.ifMuet?"Muet":"Not Muet";
    this.color2=this.ifMuet?"rgb(44, 136, 125)":"rgb(76, 80, 79)";
  }


}
