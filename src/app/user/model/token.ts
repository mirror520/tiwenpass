export class Token {
    private _token: string;
    private _expire: Date;

    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value;
    }

    public get expire(): Date {
        return this._expire;
    }
    public set expire(value: Date) {
        this._expire = value;
    }
}
