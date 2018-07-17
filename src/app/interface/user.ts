import { Transaction } from './transaction';
export interface User {
    id: string;
    fullName: string;
    age: number;
    accountId: string;
    balance: number;
    transactions: [Transaction];
    children: [User];
}
