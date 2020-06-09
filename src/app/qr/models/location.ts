export class Building {
    private _id: number;
    private _building: string;
    private _locations: Location[];

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

    public get locations(): Location[] {
        return this._locations;
    }
    public set locations(value: Location[]) {
        const locations: Location[] = new Array();
        if (value != null) {
            for (const location of value) {
                locations.push(Object.assign(new Location(), location));
            }
        }

        this._locations = locations;
    }
}

export class Location {
    private _id: number;
    private _location: string;
    private _building: Building;

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

    public get building(): Building {
        return this._building;
    }
    public set building(value: Building) {
        if (value.id == 0)
            this._building = null;

        this._building = Object.assign(new Building(), value)
    }
}
