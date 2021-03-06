import { Degree } from "./degree";
import { Semester } from "./semester";

export interface DegreePlan {
    // unique identifier for a DegreePlan
    id: number;
    // Name for a DegreePlan
    name: string;
    // Array of Semester objects for that plan
    semesters: Semester[];
    // degree and associated concentration
    degree: Degree;
}
