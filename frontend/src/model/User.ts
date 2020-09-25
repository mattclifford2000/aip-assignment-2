import { Request } from './Request';
import { Favour } from './Favour';

export interface User extends Request, Favour{
    UserId: number;
    UserEmail: string;
    UserName: string;
    UserPassword: string;
    UserRequests: Request[];
    UserCredits: Favour[];
    UserDebits: Favour[];
    UserDOB: Date;
    UserScore: number;
}