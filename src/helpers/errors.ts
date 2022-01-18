import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  message?: string

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {

    this.config = config
    this.message = message
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
  
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}