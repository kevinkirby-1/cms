import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http
      .get(
        'https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            return a.id - b.id;
          });
          const documentsClone = documents.slice();
          this.documentListChangedEvent.next(documentsClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    this.http
      .put(
        'https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/documents.json',
        documentsString
      )
      .subscribe(
        () => {
          const documentsClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  getDocument(id: number): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return undefined;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      const currentId = document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}
