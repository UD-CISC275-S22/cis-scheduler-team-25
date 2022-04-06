import { Semester } from "./Semester";

export interface DegreePlan {
    id: number;
    name: string;
    semesters: Semester[];
    length: number;
}
