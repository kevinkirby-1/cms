import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from "../document-item/document-item.component";
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document("01", "test_doc_1", "Test Document 1", "test1.test", "test1"),
    new Document("02", "test_doc_2", "Test Document 2", "test2.test", "test2"),
    new Document("03", "test_doc_3", "Test Document 3", "test3.test", "test3"),
    new Document("04", "test_doc_4", "Test Document 4", "test4.test", "test4"),
    new Document("05", "test_doc_5", "Test Document 5", "test5.test", "test5")
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
