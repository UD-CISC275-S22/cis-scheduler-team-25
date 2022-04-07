export interface Semester {
    // Array of course IDs; used to reference a list of all courses
    courses: number[];
    // Season of this semester
    season: string;
    // academic year of this semester
    year: number;
}
