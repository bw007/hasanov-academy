import { InjectionToken, Provider } from "@angular/core";
import { type MessageData, MessageType } from "@core/models/message.models";

export const ErrorCode = {
  // Authentication Errors
  MISSING_CREDENTIALS: 'MISSING_CREDENTIALS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_EXISTS: 'USER_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  INVALID_SESSION: 'INVALID_SESSION',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  
  // JWT Errors
  JWT_ACCESS_TOKEN_EXPIRED: 'JWT_ACCESS_TOKEN_EXPIRED',
  JWT_INVALID_ACCESS_TOKEN: 'JWT_INVALID_ACCESS_TOKEN',
  JWT_MISSING_TOKEN: 'JWT_MISSING_TOKEN',
  
  // Common Errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Course Errors
  COURSE_NOT_FOUND: 'COURSE_NOT_FOUND',
  COURSE_ALREADY_PUBLISHED: 'COURSE_ALREADY_PUBLISHED',
  NO_PUBLISHED_LESSONS: 'NO_PUBLISHED_LESSONS',
  
  // Upload Errors
  NO_FILE_PROVIDED: 'NO_FILE_PROVIDED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  
  // Network Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // Default
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

export const ERROR_MESSAGES: Record<ErrorCode, MessageData> = {
  // ========== Authentication Errors ==========
  [ErrorCode.MISSING_CREDENTIALS]: {
    summary: 'Ma\'lumot kiritilmagan',
    message: 'E-pochta va kalit kiritilishi shart',
    severity: MessageType.Error
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    summary: 'Kirish xatoligi',
    message: 'E-pochta yoki kalit noto\'g\'ri',
    severity: MessageType.Error
  },
  [ErrorCode.USER_EXISTS]: {
    summary: 'Foydalanuvchi mavjud',
    message: 'Bu e-pochta allaqachon ro\'yxatdan o\'tgan',
    severity: MessageType.Error
  },
  [ErrorCode.USER_NOT_FOUND]: {
    summary: 'Foydalanuvchi topilmadi',
    message: 'Bunday foydalanuvchi topilmadi',
    severity: MessageType.Error
  },
  [ErrorCode.ACCOUNT_DISABLED]: {
    summary: 'Hisob bloklangan',
    message: 'Hisobingiz bloklangan. Administrator bilan bog\'laning',
    severity: MessageType.Error
  },
  [ErrorCode.INVALID_SESSION]: {
    summary: 'Sessiya tugagan',
    message: 'Sessiyangiz yaroqsiz. Qaytadan kiring',
    severity: MessageType.Error
  },
  [ErrorCode.EMAIL_NOT_VERIFIED]: {
    summary: 'E-pochta tasdiqlanmagan',
    message: 'Iltimos, e-pochtangizni tasdiqlang',
    severity: MessageType.Warning
  },
  
  // ========== JWT Errors ==========
  [ErrorCode.JWT_ACCESS_TOKEN_EXPIRED]: {
    summary: 'Token muddati o\'tgan',
    message: 'Sessiya muddati tugadi. Qaytadan kiring',
    severity: MessageType.Error
  },
  [ErrorCode.JWT_INVALID_ACCESS_TOKEN]: {
    summary: 'Token xatosi',
    message: 'Token yaroqsiz. Qaytadan kiring',
    severity: MessageType.Error
  },
  [ErrorCode.JWT_MISSING_TOKEN]: {
    summary: 'Token yo\'q',
    message: 'Autentifikatsiya tokeni topilmadi',
    severity: MessageType.Error
  },
  
  // ========== Common Errors ==========
  [ErrorCode.INTERNAL_ERROR]: {
    summary: 'Server xatosi',
    message: 'Ichki xatolik yuz berdi. Keyinroq urinib ko\'ring',
    severity: MessageType.Error
  },
  [ErrorCode.UNAUTHORIZED]: {
    summary: 'Ruxsat yo\'q',
    message: 'Bu sahifaga kirish uchun tizimga kiring',
    severity: MessageType.Warning
  },
  [ErrorCode.FORBIDDEN]: {
    summary: 'Huquq yo\'q',
    message: 'Bu amalni bajarish huquqingiz yo\'q',
    severity: MessageType.Error
  },
  [ErrorCode.NOT_FOUND]: {
    summary: 'Ma\'lumot topilmadi',
    message: 'So\'ralgan ma\'lumot topilmadi',
    severity: MessageType.Info
  },
  [ErrorCode.BAD_REQUEST]: {
    summary: 'Noto\'g\'ri so\'rov',
    message: 'Yuborilgan ma\'lumotlar noto\'g\'ri',
    severity: MessageType.Error
  },
  [ErrorCode.VALIDATION_ERROR]: {
    summary: 'Tekshiruv xatosi',
    message: 'Kiritilgan ma\'lumotlar noto\'g\'ri',
    severity: MessageType.Warning
  },
  [ErrorCode.TOO_MANY_REQUESTS]: {
    summary: 'Juda ko\'p so\'rovlar',
    message: 'Bir oz kuting va qaytadan urinib ko\'ring',
    severity: MessageType.Warning
  },
  [ErrorCode.SERVICE_UNAVAILABLE]: {
    summary: 'Xizmat mavjud emas',
    message: 'Xizmat vaqtincha ishlamayapti',
    severity: MessageType.Error
  },
  
  // ========== Course Errors ==========
  [ErrorCode.COURSE_NOT_FOUND]: {
    summary: 'Kurs topilmadi',
    message: 'So\'ralgan kurs mavjud emas',
    severity: MessageType.Error
  },
  [ErrorCode.COURSE_ALREADY_PUBLISHED]: {
    summary: 'Allaqachon nashr qilingan',
    message: 'Bu kurs allaqachon nashr qilingan',
    severity: MessageType.Info
  },
  [ErrorCode.NO_PUBLISHED_LESSONS]: {
    summary: 'Darslar yo\'q',
    message: 'Kamida bitta dars nashr qilinishi kerak',
    severity: MessageType.Warning
  },
  
  // ========== Upload Errors ==========
  [ErrorCode.NO_FILE_PROVIDED]: {
    summary: 'Fayl tanlanmadi',
    message: 'Iltimos, fayl tanlang',
    severity: MessageType.Warning
  },
  [ErrorCode.INVALID_FILE_TYPE]: {
    summary: 'Noto\'g\'ri fayl turi',
    message: 'Bu fayl turi qo\'llab-quvvatlanmaydi',
    severity: MessageType.Error
  },
  [ErrorCode.FILE_TOO_LARGE]: {
    summary: 'Fayl juda katta',
    message: 'Fayl hajmi maksimal ruxsat etilgan hajmdan oshib ketdi',
    severity: MessageType.Error
  },
  
  // ========== Network Errors ==========
  [ErrorCode.NETWORK_ERROR]: {
    summary: 'Internet xatosi',
    message: 'Internetga ulanishda muammo. Ulanishni tekshiring',
    severity: MessageType.Error
  },
  [ErrorCode.TIMEOUT_ERROR]: {
    summary: 'Vaqt tugadi',
    message: 'Server javob bermadi. Qaytadan urinib ko\'ring',
    severity: MessageType.Error
  },
  
  // ========== Default ==========
  [ErrorCode.UNKNOWN_ERROR]: {
    summary: 'Xato yuz berdi',
    message: 'Noma\'lum xato. Iltimos, qaytadan urinib ko\'ring',
    severity: MessageType.Error
  },
};

export const ERROR_MESSAGES_TOKEN = new InjectionToken<typeof ERROR_MESSAGES>('error-messages');

export const errorMessagesProvider: Provider = {
  provide: ERROR_MESSAGES_TOKEN,
  useValue: ERROR_MESSAGES
};