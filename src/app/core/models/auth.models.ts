// Role enum
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
}

// Auth type
export enum AuthType {
  Email = 'submit',
  Google = 'click'
}

// Sign in credentials
export interface SignInData {
  email: string;
  password: string;
}

// Sign up credentials
export interface SignUpData extends SignInData {
  name: string;
}

// Verify OTP
export interface VerifyOTPData {
  email: string,
  otp: string
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified?: boolean;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Auth data
export interface AuthData {
  user: User;
  accessToken: string;
}

// Auth response
export type AuthResponse = ApiResponse<AuthData>;