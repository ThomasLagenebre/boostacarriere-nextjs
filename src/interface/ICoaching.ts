export interface ICoaching {
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
  