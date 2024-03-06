import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent{

  constructor(public messageService:MessageService) {

  }

  // ngOnInit(): void {
  //     this.messages = this.messageService.messages;
  // }

}
