import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentsService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: FormGroup) {
    const value = form.value;
    const newDocument = new Document(
      0,
      value.name,
      value.description,
      value.url,
      value.children
    );

    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
      this.router.navigate(['../'], { relativeTo: this.route });
  } else {
      this.documentsService.addDocument(newDocument);
      this.router.navigate(['../' + newDocument.id], { relativeTo: this.route });
  }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
