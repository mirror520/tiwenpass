export class Guest {
    private _name: string;
    private _phone: string;
    private _org: string;
    private _cause: string;
    private _respondent: string;

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._name = value;
    }

    public get org(): string {
        return this._org;
    }

    public set org(value: string) {
        this._org = value;
    }

    public get cause(): string {
        return this._cause;
    }
    public set cause(value: string) {
        this._cause = value;
    }

    public get respondent(): string {
        return this._respondent;
    }

    public set respondent(value: string) {
        this._respondent = value;
    }
}