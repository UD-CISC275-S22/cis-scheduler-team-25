import { Course } from "./course";

export interface Semester {
    courses: Course[];
    season: string;
    year: number;
}
