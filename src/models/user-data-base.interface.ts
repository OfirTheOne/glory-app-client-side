import { Provider } from './provider.enum';
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
    } ,
    address? : {
        country: string,
        address: string,
        city: string,
        postcode: string
    }


}