import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get('https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          const contactsClone = contacts.slice();
          this.contactListChangedEvent.next(contactsClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    this.http
      .put(
        'https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/contacts.json',
        contactsString
      )
      .subscribe(
        () => {
          const contactsClone = this.contacts.slice();
          this.contactListChangedEvent.next(contactsClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  getContact(id: number): Contact | undefined {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return undefined;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
