import { Observable } from 'rxjs';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  private curUser: any;
  constructor(private glbSV: GlobalDataService) {
    this.socket = io(this.url);
  }

  public initSocket() {
    this.glbSV.getCurrentUser().subscribe(us => {
      this.socket.emit('userInit', us);
      this.curUser = us;
    });
  }

  public sendMessage(data) {
    data.userId = this.curUser.id;
    this.socket.emit('sendMes', data);
  }

  public onMes() {
    return Observable.create(observer => {
      this.socket.on('newMessage', data => {
        observer.next(data);
      });
    });
  }
}
