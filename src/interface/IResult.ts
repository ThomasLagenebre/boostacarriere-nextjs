export interface RootResult {
    data: Data
    status: number
    statusText: string
    headers: Headers
    config: Config
    request: Request
  }
  
  export interface Data {
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    title: string
    slogan: string
    picture: string
    summary: any
    description: string
    rate: any
    price: string
    isActive: boolean
    slug: string
    promotion: number
    category: Category
    currentProblems: CurrentProblem[]
    gains: Gain[]
    includes: Include[]
    numberOfReviews: number
    reviews: any[]
  }
  
  export interface Category {
    id: number
    name: string
  }
  
  export interface CurrentProblem {
    problem: string
  }
  
  export interface Gain {
    gain: string
  }
  
  export interface Include {
    title: string
    description: string
    icon: string
  }
  
  export interface Headers {
    "cache-control": string
    "content-length": string
    "content-type": string
  }
  
  export interface Config {
    transitional: Transitional
    adapter: string[]
    transformRequest: any[]
    transformResponse: any[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Env
    headers: Headers2
    method: string
    url: string
  }
  
  export interface Transitional {
    silentJSONParsing: boolean
    forcedJSONParsing: boolean
    clarifyTimeoutError: boolean
  }
  
  export interface Env {}
  
  export interface Headers2 {
    Accept: string
  }
  
  export interface Request {}
  