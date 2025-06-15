// api/authApi.ts
import api from '../utils/APIAxiosConfig'

// ===================
// Type definitions
// ===================

export interface UserLoginRequest {
  email: string
  password: string
}

export interface UserTokenRequest {
  refreshToken: string
}

export interface UserCreationRequest {
  email: string
  password: string
  fullName: string
  phone: string
  // Thêm các trường khác nếu có
}

export interface AuthenticationResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: number
    email: string
    fullName: string
    // Thêm trường nếu backend trả thêm
  }
}

export interface UserResponse {
  id: number
  email: string
  fullName: string
  phone: string
  // Thêm trường nếu backend trả thêm
}

// ===================
// API methods
// ===================

/**
 * Đăng nhập người dùng
 * @param payload - Thông tin đăng nhập: email và password
 * @returns Thông tin token và user
 */
export const login = (payload: UserLoginRequest) =>
  api.post<AuthenticationResponse>('/auth/login', payload)

/**
 * Đăng xuất người dùng
 * @param payload - Chứa refreshToken
 */
export const logout = (payload: UserTokenRequest) => api.post<void>('/auth/logout', payload)

/**
 * Làm mới accessToken bằng refreshToken
 * @param payload - Chứa refreshToken
 * @returns Thông tin accessToken mới và user
 */
export const refreshToken = (payload: UserTokenRequest) =>
  api.post<AuthenticationResponse>('/auth/refresh', payload)

/**
 * Đăng ký tài khoản mới
 * @param payload - Thông tin tạo tài khoản
 * @returns Thông tin người dùng đã tạo
 */
export const register = (payload: UserCreationRequest) =>
  api.post<UserResponse>('/auth/register', payload)
