import { User } from './User';
import { Markers } from './Markers';
export class Claim{
    id: number;
    title: string;
    subject: string;
    status: string;
    level: string;
    marker: Markers;
    user: User;
    phone: number;
}