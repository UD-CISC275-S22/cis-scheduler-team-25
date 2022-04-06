import { course } from "./course";

export interface semester {
    courses: course[];
    season: string;
    year: number;
}
