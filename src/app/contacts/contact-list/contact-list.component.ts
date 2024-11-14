import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  onSelected(contact: Contact) {
    this.contactsService.contactSelectedEvent.emit(contact);
  }
}
