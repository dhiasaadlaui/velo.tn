import { Claim } from './Claim';
import { Disponibility } from './Disponibility';
export class User{
    id: number;
    name: string;
    forname: string;
    age: number;
    login: string;
    password: string;
    ismoderator: boolean;
    claim : Claim;
    disponibility : Disponibility;
}