export class Guest {
    private _user_id: number;
    private _name: string;
    private _phone: string;
    private _phone_verify: boolean;
    private _phone_token: string;
    private _phone_otp: string;
    private _id_card: string;
    private _id_card_verify: boolean;

    public get user_id(): number {
        return this._user_id;
    }
    public set user_id(value: number) {
        this._user_id = value;
    }

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
        this._phone = value;
    }

    public get phone_verify(): boolean {
        return this._phone_verify;
    }
    public set phone_verify(value: boolean) {
        this._phone_verify = value;
    }

    public get phone_token(): string {
        return this._phone_token;
    }
    public set phone_token(value: string) {
        this._phone_token = value;
    }

    public get phone_otp(): string {
        return this._phone_otp;
    }
    public set phone_otp(value: string) {
        this._phone_otp = value;
    }

    public get id_card(): string {
        return this._id_card;
    }
    public set id_card(value: string) {
        this._id_card = value;
    }

    public get id_card_verify(): boolean {
        return this._id_card_verify;
    }
    public set id_card_verify(value: boolean) {
        this._id_card_verify = value;
    }
}
