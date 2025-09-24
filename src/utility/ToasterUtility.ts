import {MessageService} from 'primeng/api';

export class ToasterUtility {
  static showSuccess(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'success', summary: summary, detail: detail });
  }

  static showInfo(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'info', summary: summary, detail: detail });
  }

  static showWarn(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'warn', summary: summary, detail: detail });
  }

  static showError(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  static showContrast(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'contrast', summary: summary, detail: detail });
  }

  static showSecondary(messageService: MessageService, summary:string, detail:string) {
    messageService.add({ severity: 'secondary', summary: summary, detail: detail });
  }
}
