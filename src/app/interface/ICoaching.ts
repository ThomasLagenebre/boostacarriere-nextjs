export interface ICoaching {
    id: number;
    title: string;
    slogan: string;
    picture: string;
    summary: string | null;
    description: string;
    shortDescription: string;
    rate: number | null;
    price: string;
    isActive: boolean;
    slug: string;
    promotion: number;
    category: {
        id: number;
        name: string;
    };
    currentProblems: string[];
    gains: any[];
    includes: any[];
    numberOfReviews: number;
    reviews: any[];
} 