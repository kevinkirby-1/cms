import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from "../document-item/document-item.component";
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
