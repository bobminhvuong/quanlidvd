import { UserService } from 'src/app/service/user/user.service';
import { ChatService } from 'src/app/service/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private messages: any;
  private curUser: any;
  private contacts: any;
  constructor(private chatService: ChatService, private globSV: GlobalDataService, private userSv: UserService) { }

  ngOnInit() {
    this.chatService.initSocket();
    this.chatService.onMes().subscribe(r => {
      this.messages = r;
    });
    this.globSV.getCurrentUser().subscribe(r => {
      this.curUser = r;
    });
    this.getContact();
  }

  getContact() {
    this.userSv.getContact(this.curUser.id).subscribe(r => {
      this.contacts = r;
    });
  }

}
