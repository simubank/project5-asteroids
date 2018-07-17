export interface Transaction {
    type: string;
    description: string;
    amount: number;
    merchant: string;
    date: Date;
    postBalance: number;
}
