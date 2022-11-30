import { GenericRequest, GenericResponse } from '../typings'
import { pickBy } from 'remeda'
import { AZURACAST_URL } from '../utils/constants'
import { APIError } from '../utils/error'

export const crud = async <TReq = void, TRes = void>(
  request: GenericRequest<TReq>,
  baseUrl?: string
): Promise<GenericResponse<TRes>> => {
  const { method, payload, endpoint } = request
  const headers: HeadersInit = {}
  const options: RequestInit = {
    method,
    headers,
  }
  if (payload) {
    options.body = JSON.stringify(
      pickBy(
        payload,
        (value) => value !== null && value !== undefined && value !== ''
      )
    )
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(`${baseUrl ?? AZURACAST_URL}${endpoint}`, options)
  const json = await res.json()
  let data: GenericResponse<TRes>
  if (!('data' in json)) {
    data = {
      data: json,
    }
  } else {
    data = json
  }
  if (!res.ok) {
    throw new APIError(data.meta?.message ?? 'Unknown error', res.status)
  }
  return data
}
