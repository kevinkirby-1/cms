import { Component } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentService.getDocument(params['id']);
    });

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate([''], { relativeTo: this.route });
  }
}
