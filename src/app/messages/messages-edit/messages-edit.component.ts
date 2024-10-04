import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-messages-edit',
  standalone: true,
  imports: [],
  templateUrl: './messages-edit.component.html',
  styleUrl: './messages-edit.component.css'
})
export class MessagesEditComponent {
  currentSender: string = "Kevin";
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef | undefined;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef | undefined;


  onSendMessage() {
    const subject = this.subjectInputRef?.nativeElement.value;
    const msgText = this.msgTextInputRef?.nativeElement.value;
    const newMessage = new Message('03', subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(subject: HTMLInputElement, msgText: HTMLInputElement) {
    subject.value = "";
    msgText.value = "";
  }

}
