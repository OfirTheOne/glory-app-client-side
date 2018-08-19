import { Provider } from './provider.enum';

export interface StripeSource {
    sourceId: string,
    brand: string,
    last4: string,
    isDefault: boolean
}

export interface FlatOrder {
    orderId: string,
    total: number
}

export interface UserDataBase {
    _id;
    userName: string,
    authData: {
        email: string,
        provider: Provider,
    }
    personalData?: {
        firstName: string,
        lastName: string,
        gender: string,
        birthDate: {
            day: Number,
            month: Number,
            year: Number
        }
    },
    address?: {
        country: string,
        address: string,
        city: string,
        postcode: string
    }
    orders: FlatOrder[],
    paymentMethods: {
        sources: StripeSource[]
    }


}