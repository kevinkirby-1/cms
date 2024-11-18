import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactsService } from '../../contacts/contacts.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent {
  @Input() message: Message;

  messageSender: string;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    const contact: Contact = this.contactsService.getContact(
      this.message.sender
    );
    this.messageSender = contact.name;
  }
}
