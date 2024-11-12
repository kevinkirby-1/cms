import { Component } from '@angular/core';
import { MessagesItemComponent } from "../messages-item/messages-item.component";
import { MessagesEditComponent } from "../messages-edit/messages-edit.component";
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule, MessagesItemComponent, MessagesEditComponent],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css'
})
export class MessagesListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
