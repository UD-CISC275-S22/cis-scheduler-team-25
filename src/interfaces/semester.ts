import { Course } from "./Course";

export interface Semester {
    courses: Course[];
    season: string;
    year: number;
}
