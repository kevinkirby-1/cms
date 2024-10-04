import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-messages-item',
  standalone: true,
  imports: [],
  templateUrl: './messages-item.component.html',
  styleUrl: './messages-item.component.css'
})
export class MessagesItemComponent {
  @Input() message: Message | undefined;
}
