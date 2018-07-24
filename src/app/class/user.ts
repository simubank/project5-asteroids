import { Transaction } from './transaction';
import { Rule } from './rule';
export class User {
    $key: string;
    id: string;
    fullName: string;
    age: number;
    accountId: string;
    balance: number;
    transactions: [Transaction];
    children: [User];
    rules: [Rule];
}
