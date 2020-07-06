export class Follower {
    private _visit_id: number;
    private _name: string;

    constructor(name?: string) {
        this.visit_id = 0;
        this.name = name;
    }

    public get visit_id(): number {
        return this._visit_id;
    }
    public set visit_id(value: number) {
        this._visit_id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public toJSON() {
        return {
            id: this.visit_id,
            name: this.name
        };
    }
}
