import { Transaction } from './transaction';
export class User {
    $key: string;
    id: string;
    fullName: string;
    age: number;
    accountId: string;
    balance: number;
    transactions: [Transaction];
    children: [User];
}
