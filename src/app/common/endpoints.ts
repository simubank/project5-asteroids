export class Endpoints {
    public static readonly API_PATH = '/api';

    public static SIMULANTS(): string { return Endpoints.API_PATH + '/simulants'; }
    public static ACCOUNTS(): string { return Endpoints.API_PATH + '/accounts'; }
    public static TRANSACTIONS(): string { return Endpoints.API_PATH + '/transactions'; }
    public static SELF_ACCOUNT(): string { return Endpoints.API_PATH + '/accounts/self'; }
    public static BRANCHES(): string { return Endpoints.API_PATH + '/branches'; }
    public static CUSTOMERS(): string { return Endpoints.API_PATH + '/customers'; }
    public static TAGS(): string { return Endpoints.API_PATH + '/tags'; }
    public static TRANSFERS(): string { return Endpoints.API_PATH + '/transfers'; }
}
