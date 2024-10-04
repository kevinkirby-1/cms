import { Component } from '@angular/core';
import { MessagesItemComponent } from "../messages-item/messages-item.component";
import { MessagesEditComponent } from "../messages-edit/messages-edit.component";
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule, MessagesItemComponent, MessagesEditComponent],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css'
})
export class MessagesListComponent {
  messages: Message[] = [
    new Message('01', "Subject 1", "Message text 1", "Bill"),
    new Message('02', "Subject 2", "Message text 2", "Ted"),
    new Message('03', "Subject 3", "Message text 3", "Frank")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
