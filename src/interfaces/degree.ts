import { course } from "./course";

export interface degree {
    id: number;
    name: string;
    requiredCourses: course[];
    creditTotal: number;
}
