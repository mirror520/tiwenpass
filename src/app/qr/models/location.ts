export class Location {
    private _id: number;
    private _location: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get location(): string {
        return this._location;
    }
    public set location(value: string) {
        this._location = value;
    }
}
