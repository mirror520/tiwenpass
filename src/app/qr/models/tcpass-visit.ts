import { Location } from './location';
import { DepartmentEmployee } from '../../user/model/department-employee';

export class TcpassVisit {
    private _id: number;
    private _uuid: string;
    private _department_employee: DepartmentEmployee;
    private _location: Location;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get uuid(): string {
        return this._uuid;
    }
    public set uuid(value: string) {
        this._uuid = value;
    }

    public get department_employee(): DepartmentEmployee {
        return this._department_employee;
    }
    public set department_employee(value: DepartmentEmployee) {
        if (value.id == 0)
            this._department_employee = null;

        this._department_employee = Object.assign(new DepartmentEmployee(), value)
    }

    public get location(): Location {
        return this._location;
    }
    public set location(value: Location) {
        if (value.id == 0)
            this._location = null;

        this._location = Object.assign(new Location(), value)
    }
}
