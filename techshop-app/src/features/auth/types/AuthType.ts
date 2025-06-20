export interface AuthType {
  isAuthenticated: boolean
  token: string | undefined
  refreshToken: string | undefined
}

export interface StateType {
  loading: boolean
  data: object
  error: boolean
}
