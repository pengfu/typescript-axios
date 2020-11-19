import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import { bulidURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import transform from './transform'
import xhr from './xhr'

function axios (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  // config.data = transformRequestData(config)  
  console.log('8888888888',transform(config.data, config.headers, config.transformRequest))
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url!, params)
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  console.log('transformResponseData---res.data', res.data)
  console.log('transformResponseData---res.headers',  res.headers)
  console.log('transformResponseData---res.transformResponse', res.config.transformResponse)

  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default axios