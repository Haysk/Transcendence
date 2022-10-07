import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
// import { Server, Socket } from "socket.io";


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // <script src="https://cdn.socket.io/4.3.2/socket.io.min.js"></script>
  //     const socket = io('https://localhost:3000');
  //     const message = document.getElementById('message');
  //     const messages = document.getElementById('messages');

  //     socket.on('connect', ()=> console.log('connected'));

  //     socket.on('message', function(id, data){
  //         messages.innerHTML += `<p> ${id} : ${data} </p>`;
  //     });

  //     sendMessage(){
  //          socket.emit('message', message.value);
  //     }
  
}
