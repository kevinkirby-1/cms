import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  contact: Contact;

  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
    (params: Params) => {
      this.contact = this.contactService.getContact(params.id)
    }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }
}
