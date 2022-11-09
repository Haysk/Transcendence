import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-admin-in-salon',
  templateUrl: './admin-in-salon.component.html',
  styleUrls: ['./admin-in-salon.component.css']
})
export class AdminInSalonComponent implements OnInit {

  @Input() guest!: User;
  @Input() current_channel!: Channel;
 
  ifAdmin:boolean=false;
  ifMuet:boolean=false;
  val_admin:string="Be Admin";
  val_muet:string="Muet"
  showOption: boolean=false;
  color1:string="rgb(44, 136, 125)";
  color2:string="rgb(44, 136, 125)";
  

 
  @Input() usersAdmin:User[] =[];
  @Input() AdminOrNot:boolean=false;
  constructor() {
  
   
   }

   




  ngOnInit(): void {

  }

  show_info(){

    this.showOption = this.showOption?false:true;
  }
   
  beAdmin(){
    this.ifAdmin=!this.ifAdmin;
    this.val_admin=this.ifAdmin?"Del Admin":"Be Admin";
    this.color1=this.ifAdmin?"rgb(76, 80, 79)":"rgb(44, 136, 125)";
   
  }
  
  beMuet(){
    this.ifMuet=!this.ifMuet;
    this.val_muet=this.ifMuet?"Not Muet":"Muet";
    this.color2=this.ifMuet?"rgb(76, 80, 79)":"rgb(44, 136, 125)";
  }


}
