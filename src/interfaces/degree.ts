import { Course } from "./Course";

export interface Degree {
    id: number;
    name: string;
    requiredCourses: Course[];
    creditTotal: number;
}
