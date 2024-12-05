import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactsService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: FormGroup) {
    const value = form.value;
    const newContact = new Contact(
      0,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );

    if (this.editMode) {
      this.contactsService.updateContact(this.originalContact, newContact);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.contactsService.addContact(newContact);
      this.router.navigate(['../' + newContact.id], { relativeTo: this.route });
    }
    
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
