import { Section } from "./Section";
export interface Course {
    name: string;
    credits: number;
    prereqs: Course[];
    courseCode: number;
    sections: Section[];
}
