import { Employee } from './employee';
import { Guest } from './guest';
import { Token } from './token';

export class User {
    private _id: number;
    private _username: string;
    private _name: string;
    private _employee: Employee;
    private _guest: Guest;
    private _token: Token;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get employee(): Employee {
        return this._employee;
    }
    public set employee(value: Employee) {
        if (value.user_id == 0)
            this._employee = null;

        this._employee = Object.assign(new Employee(), value);
    }

    public get guest(): Guest {
        return this._guest;
    }
    public set guest(value: Guest) {
        if (value.user_id == 0)
            this._guest = null;

        this._guest = Object.assign(new Guest(), value);
    }

    public get token(): Token {
        return this._token;
    }
    public set token(value: Token) {
        this._token = Object.assign(new Token(), value);
    }
}
