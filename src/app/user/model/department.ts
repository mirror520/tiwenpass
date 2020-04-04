export class Department {
    private _id; number;
    private _department: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get department(): string {
        return this._department;
    }
    public set department(value: string) {
        this._department = value;
    }
}
