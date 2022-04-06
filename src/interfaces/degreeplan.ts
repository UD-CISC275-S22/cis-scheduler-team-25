import { semester } from "./semester";

export interface degreeplan {
    id: number;
    name: string;
    semesters: semester[];
    length: number;
}
