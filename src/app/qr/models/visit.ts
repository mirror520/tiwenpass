import { DepartmentEmployee } from '../../user/model/department-employee';
import { Location } from './location';
import { User } from '../../user/model/user';

export class Visit {
    private _id: number;
    private _guest: User;
    private _department_employee: DepartmentEmployee;
    private _location: Location;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get guest(): User {
        return this._guest;
    }
    public set guest(value: User) {
        if (value.id == 0)
            this._guest = null;

        this._guest = Object.assign(new User(), value)
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
