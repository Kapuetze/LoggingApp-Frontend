export class User {
    _id: string;
    email: string;
    name: {
        first: string,
        last: string
    }
    role: string;
}