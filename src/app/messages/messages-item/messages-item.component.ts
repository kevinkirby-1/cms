import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-messages-item',
  standalone: true,
  imports: [],
  templateUrl: './messages-item.component.html',
  styleUrl: './messages-item.component.css'
})
export class MessagesItemComponent {
  @Input() message: Message = new Message("", "", "", "");

  messageSender: string | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name;
  }
}
