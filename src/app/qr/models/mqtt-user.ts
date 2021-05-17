export class MqttUser {
    private _token: string;
    private _username: string;
    private _password: string;

    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

}
