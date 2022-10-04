import { ComponentFixture, TestBed } from '@angular/core/testing';
import { io, Socket } from 'socket.io-client';

import { ChannelRoomComponent } from './channel-room.component';

describe('ChannelRoomComponent', () => {
  let component: ChannelRoomComponent;
  let fixture: ComponentFixture<ChannelRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // io.on("connection", Socket => {
  //   Socket.join("some room");
  });
});
