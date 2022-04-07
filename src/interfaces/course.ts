import { Section } from "./section";
export interface Course {
    name: string;
    credits: number;
    // Prereqs: course ID numbers
    prereqs: number[];
    courseCode: number;
    sections: Section[];
}
