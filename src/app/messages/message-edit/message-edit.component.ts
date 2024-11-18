import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  currentSender: number = 19;

  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;

  constructor(private messagesService: MessagesService) {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('03', subject, msgText, this.currentSender);
    this.messagesService.addMessage(newMessage);
  }

  onClear(subject: HTMLInputElement, msgText: HTMLInputElement) {
    subject.value = '';
    msgText.value = '';
  }
}
