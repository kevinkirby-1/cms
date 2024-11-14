import { Component } from '@angular/core';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument: Document | undefined;

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
