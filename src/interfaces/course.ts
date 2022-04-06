import { Section } from "./section";
export interface Course {
    name: string;
    credits: number;
    prereqs: Course[];
    courseCode: number;
    sections: Section[];
}
