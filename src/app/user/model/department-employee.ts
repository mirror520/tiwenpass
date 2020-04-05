import { Department } from './department';
import { User } from './user';

export class DepartmentEmployee {
    private _id; number;
    private _department: Department;
    private _employee: User;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get department(): Department {
        return this._department;
    }
    public set department(value: Department) {
        if (value.id == 0)
            this._department = null;

        this._department = Object.assign(new Department(), value)
    }

    public get employee(): User {
        return this._employee;
    }
    public set employee(value: User) {
        if (value.id == 0)
            this._employee = null;

        this._employee = Object.assign(new User(), value)
    }
}
