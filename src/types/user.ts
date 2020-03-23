export interface User {
    email: string;
    name: string;
    readonly password: string;
    created_at: Date;
}