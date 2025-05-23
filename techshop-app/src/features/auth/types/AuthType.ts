export interface AuthType {
  isAuthenticated: boolean
  token: string
}

export interface StateType {
  loading: boolean
  data: object
  error: boolean
}
