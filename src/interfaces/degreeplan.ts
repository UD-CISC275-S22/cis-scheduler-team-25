import { Semester } from "./semester";

export interface DegreePlan {
    id: number;
    name: string;
    semesters: Semester[];
    length: number;
}
