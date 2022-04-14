export interface Semester {
    /* ID follows a numbering system of year.season, where season decimal values
    are as follows:
    Winter: 0.1
    Spring: 0.2
    Summer: 0.3
    Fall: 0.4
    E.g., a Fall 2022 semester has an ID of 2022.1
    This allows for an array of Semester objects to be sorted by year effectively.
    */
    id: number;
    // Array of course IDs; used to reference a list of all courses
    courses: number[];
    // Season of this semester
    season: string;
    // academic year of this semester
    year: number;
}
