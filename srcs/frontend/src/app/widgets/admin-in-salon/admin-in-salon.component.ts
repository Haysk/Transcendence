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
 
  ifAdmin:boolean=false;
  ifMuet:boolean=false;
   ifBanne:boolean=false;
  val_admin:string="Del Admin";
  val_muet:string="Muet(Secondes)";
  val_banne:string="Ban(Secondes)";
  showOption: boolean=false;
  color1:string="rgb(76, 80, 79)";
  color2:string="rgb(44, 136, 125)";
  color3:string="rgb(44, 136, 125)";
  time_ban!:number;
  countTimeMuet:boolean= true;
  countTimeBan:boolean=true;
  time_muet!:number;
  

  @Input() CreatorId!:number;
  @Input() usersAdmin:User[] =[];
  @Input() AdminOrNot:boolean=false;

  constructor() {
  
   
   }

   




  ngOnInit(): void {
   

  }

  isCreator(){
     
      
    
      if(Number(localStorage.getItem('id'))== this.CreatorId)
         return 1;     
      return 0;
  }

  show_info(){

    this.showOption = this.showOption?false:true;
  }
   
  beAdmin(){
   

   
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
