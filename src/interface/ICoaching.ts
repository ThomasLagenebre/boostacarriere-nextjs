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
    coach?: {
      name: string,
      description: string,
      nbOfCoachings: number
    }
    promotion?: number
    limitPromotion?: string
    category: Category
    currentProblems: CurrentProblem[]
    gains: Gain[]
    includes: Include[]
    targets?: string[]
    numberOfReviews: number
    reviews: string[]
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
  