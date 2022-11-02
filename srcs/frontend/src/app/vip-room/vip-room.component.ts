import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-vip-room',
  templateUrl: './vip-room.component.html',
  styleUrls: ['./vip-room.component.css']
})
export class VipRoomComponent implements OnInit {
  visible:boolean = false;
  visible_avatar:boolean = false;
  visible_nickname:boolean = false;
  
  login = localStorage.getItem("login");
  displayname = localStorage.getItem("displayname");
  image_url = localStorage.getItem("image_url");
  avatar_url = localStorage.getItem("avatar_url");
  nickname = localStorage.getItem("nickname");
  id = localStorage.getItem("id");
  newNickName!:string;
  

  // selectedFile!:File ;
  // onFileSelected(event){
  //  console.log(event);
  //  this.selectedFile = event.target.files[0];
  // }

  // onUpload(){
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   console.log(this.selectedFile);
  //   this.http.post('http://localhost:8081/api/upload/', fd).subscribe(res =>{
  //     console.log(res);
  //   })

  // }

  selectedFile! : File;
  url = this.avatar_url;
 

  onSelect(event) {
    
    this.selectedFile =event.target.files[0];
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log("avatar url:" + this.avatar_url);
        console.log("new avatar url" + this.url);
        // console.log(event);
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  onUpload(){
    
      if (this.selectedFile.size < 75000){
      this.apiService.updateAvatar(Number(this.id), String(this.url)).subscribe();
      console.log("this.url")
      localStorage.setItem('avatar_url', String(this.url));
      window.alert('***Update down***');
      }
      else{
        window.alert('***image too large only < 75kb ***');
      }

    

    // this.http.post('https://localhost:8081/api/upload/', this.selectedFile).subscribe();

     

    //   this.http.post('https://localhost:8081/api/upload/', {name: this.url}).subscribe(
    // );
  }

  
  constructor(private apiService: ApiService, private http: HttpClient) { }

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

  changeNickname(){
    this.apiService.updateNickName(Number(this.id), this.newNickName).subscribe();
    localStorage.setItem('nickname', this.newNickName)
    this.newNickName = "";

  }


}
