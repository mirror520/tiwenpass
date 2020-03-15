export class User {
    private _account: string;
    private _password: string;
    private _name: string;

    public get account(): string {
        return this._account;
    }
    public set account(value: string) {
        this._account = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}
