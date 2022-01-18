import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/errors'

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject)=> {
    const {data = null, url, method = 'get', headers, responseType, timeout} = config
    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return false
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    function handleResponse (response: AxiosResponse){  
      if (response.status >=200 && response.status < 300) {
        resolve(response)
      } else if(!timeout) {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }
    request.onerror = function handleError () {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
