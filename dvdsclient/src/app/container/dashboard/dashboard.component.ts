import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.sendMessage('hello');
  }

}
