import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

import { MessageType, type MessageData } from "@core/models/message.models";

@Injectable({ providedIn: 'root' })
export class Notification {
  private message = inject(MessageService);

  success(message: MessageData) {
    this.message.add({
      summary: message.summary,
      detail: message.message,
      severity: MessageType.Success,
      life: 3000,
    });
  }

  error(message: MessageData) {
    this.message.add({
      summary: message.summary,
      detail: message.message,
      severity: MessageType.Error,
      life: 3000,
    });
  }

  info(message: MessageData) {
    this.message.add({
      summary: message.summary,
      detail: message.message,
      severity: MessageType.Info,
      life: 3000,
    });
  }

  warning(message: MessageData) {
    this.message.add({
      summary: message.summary,
      detail: message.message,
      severity: MessageType.Warning,
      life: 3000,
    });
  }
}