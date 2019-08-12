import { UserService } from './../../service/user/user.service';
import { GlobalDataService } from './../../service/globalData/global-data.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private chatService: ChatService, private userSv: UserService, private globSV: GlobalDataService) { }
  private messages = [];
  private curUser: any;
  private userFriend: any;
  private enterMess = '';
  private contacts: any;
  private contact: any;
  ngOnInit() {
    this.chatService.initSocket();
    this.chatService.onMes().subscribe(r => {
      this.messages.push(r);
    });
    this.globSV.getCurrentUser().subscribe(r => {
      this.curUser = r;
    });
    this.getContact();
    this.getInformationFriend();
  }

  sendMess() {
    if (this.enterMess !== '' && this.contact) {
      const data = {
        userReceiptId: this.contact.userFriendId,
        message: this.enterMess,
        userId: this.curUser.id
      };
      this.messages.push(data);
      this.enterMess = '';
      this.chatService.sendMessage(data);
    }
  }

  getInformationFriend() {
    this.userSv.getByIdUser(12).subscribe(r => {
      this.userFriend = r;
    });
  }

  getContact() {
    this.userSv.getContact(this.curUser.id).subscribe(r => {
      console.log(r);
      this.contacts = r;
    });
  }
  chooseMes(contact) {
    this.contact = contact;
  }

}
