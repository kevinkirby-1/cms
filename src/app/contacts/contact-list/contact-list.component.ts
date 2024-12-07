import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts();
    this.contactsService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.subscription = this.contactsService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  onSelected(contact: Contact) {
    this.contactsService.contactSelectedEvent.emit(contact);
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
