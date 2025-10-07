import { InjectionToken, Provider } from "@angular/core";
import { MessageType, type MessageData } from "@core/models/message.models";

// ========== Success Messages ==========
export const SUCCESS_MESSAGES: Record<string, MessageData> = {
  'LOGIN_SUCCESS': {
    summary: 'Xush kelibsiz!',
    message: 'Muvaffaqiyatli tizimga kirdingiz',
    severity: MessageType.Success
  },
  'REGISTRATION_SUCCESS': {
    summary: 'Muvaffaqiyatli!',
    message: 'Ro\'yxatdan muvaffaqiyatli o\'tdingiz',
    severity: MessageType.Success
  },
  'LOGOUT_SUCCESS': {
    summary: 'Xayr!',
    message: 'Tizimdan chiqdingiz',
    severity: MessageType.Success
  },
  'COURSE_CREATED': {
    summary: 'Yaratildi',
    message: 'Kurs muvaffaqiyatli yaratildi',
    severity: MessageType.Success
  },
  'COURSE_UPDATED': {
    summary: 'Saqlandi',
    message: 'Kurs ma\'lumotlari yangilandi',
    severity: MessageType.Success
  },
  'COURSE_DELETED': {
    summary: 'O\'chirildi',
    message: 'Kurs muvaffaqiyatli o\'chirildi',
    severity: MessageType.Success
  },
  'VIDEO_UPLOADED': {
    summary: 'Yuklandi',
    message: 'Video muvaffaqiyatli yuklandi',
    severity: MessageType.Success
  },
};

// ========== Info Messages ==========
export const INFO_MESSAGES: Record<string, MessageData> = {
  'PROCESSING': {
    summary: 'Jarayonda',
    message: 'Ma\'lumotlar qayta ishlanmoqda...',
    severity: MessageType.Info
  },
  'UPLOADING': {
    summary: 'Yuklanmoqda',
    message: 'Fayl serverga yuklanmoqda. Iltimos, kuting',
    severity: MessageType.Info
  },
};

// ========== Warning Messages ==========
export const WARNING_MESSAGES: Record<string, MessageData> = {
  'UNSAVED_CHANGES': {
    summary: 'Saqlanmagan o\'zgarishlar',
    message: 'O\'zgarishlar saqlanmadi. Chiqishni xohlaysizmi?',
    severity: MessageType.Warning
  },
  'LOW_QUALITY_VIDEO': {
    summary: 'Past sifat',
    message: 'Video sifati pastligi sababli yuklanishi sekin bo\'lishi mumkin',
    severity: MessageType.Warning
  },
};

export const SUCCESS_MESSAGES_TOKEN = new InjectionToken<typeof SUCCESS_MESSAGES>('success-messages');

export const successMessagesProvider: Provider = {
  provide: SUCCESS_MESSAGES_TOKEN,
  useValue: SUCCESS_MESSAGES
}