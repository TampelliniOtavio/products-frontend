import { createFetch } from '@vueuse/core'

const baseUrl = 'http://localhost:3000'

export const useFetch = createFetch({
  baseUrl,
  options: {
    async onFetchError(ctx) {
      if (!ctx.response) {
        return ctx
      }
      const body = await ctx.response.json()
      ctx.error = body
      return ctx
    },
  },
})

export type ValidationError = {
  message: string[]
  error: 'Bad Request'
  statusCode: 400
}

export type ApiError = ValidationError | {
  message: string
  error: string
  statusCode: number
}


export type ApiResponse<T extends object = object> = T | ApiError

export function isApiError<T extends object>(data: ApiResponse<T>): data is ApiError {
  return 'message' in data && 'error' in data && 'statusCode' in data
}

export function isValidationError(data: ApiError): data is ValidationError {
  return data.statusCode === 400
}

async function baseFetch<T extends object>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
  return fetch(baseUrl + url, init)
    .then((res): Promise<T> => res.json())
    .catch((err) => err)
}

type RequestConfig = Omit<RequestInit, 'body' | 'method'>

function fetchWithBody(method: 'POST' | 'PUT') {
  return <T extends object>(url: string, body?: object, init?: RequestConfig) => {
    const bodyParsed = body ? JSON.stringify(body) : undefined
    return baseFetch<T>(url, { ...init, method, body: bodyParsed, headers: {
      ...init?.headers ?? {},
      "content-type": "application/json"
      }
    })
  }
}

function fetchWithoutBody(method: 'GET' | 'DELETE') {
  return <T extends object>(url: string, init?: RequestConfig) =>
    baseFetch<T>(url, { ...init, method })
}

export const fetchBackEnd = {
  get: fetchWithoutBody('GET'),
  post: fetchWithBody('POST'),
  put: fetchWithBody('PUT'),
  delete: fetchWithoutBody('DELETE'),
}
