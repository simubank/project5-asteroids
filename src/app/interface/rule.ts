export interface Rule {
    id: string;
    category: string;
    allowed: boolean;
    limit: number;
    resetDate: Date;
    resetValue: number;
}
