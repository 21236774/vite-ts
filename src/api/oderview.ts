import { request } from '@/hooks'
import type { AxiosResponse } from "axios";

export const api = (): Promise<AxiosResponse<any, any>> => {
  return request.get('api')
}

