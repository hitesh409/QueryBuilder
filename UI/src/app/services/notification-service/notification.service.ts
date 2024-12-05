import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}
  showSuccess(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
      closable: false,
    });
  }
  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      closable: false,
    });
  }
  showInfo(summary: string, detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: detail,
      closable: false,
    });
  }
  showWarning(summary: string, detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
      closable: false,
    });
  }
}
