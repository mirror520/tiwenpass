export class Building {
    private _id: number;
    private _building: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get building(): string {
        return this._building;
    }
    public set building(value: string) {
        this._building = value;
    }
}
