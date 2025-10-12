export enum MessageType {
  Error = 'error',
  Warning = 'warn',
  Info = 'info',
  Success = 'success'
}

export interface MessageData {
  summary: string;
  message: string;
  severity?: MessageType;
}