import { Course } from "./course";

export interface Degree {
    id: number;
    name: string;
    requiredCourses: Course[];
    creditTotal: number;
}
