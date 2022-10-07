import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vip-room',
  templateUrl: './vip-room.component.html',
  styleUrls: ['./vip-room.component.css']
})
export class VipRoomComponent implements OnInit {
  visible:boolean = false;
  visible_avatar:boolean = false;
  visible_nickname:boolean = false;
  // fileToUpload: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  showhide(){
    this.visible = this.visible?false:true;
    this.visible_nickname = false;
    this.visible_avatar = false;
  }

  showhide_avatar(){
    this.visible_avatar = this.visible_avatar?false:true;
    this.visible_nickname = false;
  }

  showhide_nickname(){
    this.visible_nickname = this.visible_nickname?false:true;
    this.visible_avatar = false;
  }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
// }


}
