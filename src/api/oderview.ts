import { request } from '@/service'
import type { AxiosResponse } from "axios";

export const api = (): Promise<AxiosResponse<any, any>> => {
  return request.get('/api-proxy/dbapi/api/v1/dp/ershida/cxzhjk/whzszdwtzx/bm/szmsgxg/wtsstzjdb')
}

