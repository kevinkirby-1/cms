import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  documents: Document[] = [];

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }
}
