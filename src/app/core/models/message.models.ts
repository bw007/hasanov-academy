export enum MessageType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

export interface MessageData {
  summary: string;
  message: string;
  severity?: MessageType;
}