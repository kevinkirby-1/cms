import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http
      .get('https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          const messagesClone = messages.slice();
          this.messageChangedEvent.next(messagesClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    this.http
      .put(
        'https://wdd430-cms-3fbeb-default-rtdb.firebaseio.com/messages.json',
        messagesString
      )
      .subscribe(
        () => {
          const messagesClone = this.messages.slice();
          this.messageChangedEvent.next(messagesClone);
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  getMessage(id: number) {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return undefined;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      const currentId = message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
