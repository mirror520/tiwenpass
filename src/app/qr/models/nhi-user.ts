export class NhiUser {
    private _name: string;
    private _id_card: string;

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get id_card(): string {
        return this._id_card;
    }
    public set id_card(value: string) {
        this._id_card = value;
    }
}
