import { Request } from './Request';

export interface User extends Array<Request>{
    UserId: number;
    UserEmail: string;
    UserName: string;
    UserPassword: string;
    UserRequests: Request[];
    UserDOB: Date;
    UserScore: number;
}