import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user-in-salon',
  templateUrl: './user-in-salon.component.html',
  styleUrls: ['./user-in-salon.component.css']
})
export class UserInSalonComponent implements OnInit {

  @Input() guest!: User;
 
  ifAdmin:boolean=false;
  ifMuet:boolean=false;
  ifBanne:boolean=false;
  val_admin:string="Be Admin";
  val_muet:string="Muet(Secondes)";
  val_banne:string="Ban(Secondes)";
  showOption: boolean=false;
  color1:string="rgb(44, 136, 125)";
  color2:string="rgb(44, 136, 125)";
  color3:string="rgb(44, 136, 125)";
  time_ban!:number;
  countTimeMuet:boolean= true;
  countTimeBan:boolean=true;
  time_muet!:number;
  

 
  @Input() usersAdmin:User[] =[];
  @Input() AdminOrNot:boolean=false;
  constructor() {
  
   
   }

   




  ngOnInit(): void {
   

  }

  isAdmin2()
  {
    let i = 0;
    while (this.usersAdmin[i] != null && this.usersAdmin[i] != undefined)
    {
      if (this.usersAdmin[i].id == Number(localStorage.getItem('id')))
        return 1;
      i++;
    }

    return 0
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
    this.val_muet=this.ifMuet?"Not Muet":"Muet(secondes)";
    this.color2=this.ifMuet?"rgb(76, 80, 79)":"rgb(44, 136, 125)";
    this.countTimeMuet=!this.countTimeMuet;
  }

  beBanne(){
    this.ifBanne=!this.ifBanne;
    this.val_banne=this.ifBanne?"Unban":"Ban(Secondes)";
    this.color3=this.ifBanne?"rgb(76, 80, 79)":"rgb(44, 136, 125)";
    this.countTimeBan=!this.countTimeBan;


   
  }

}
