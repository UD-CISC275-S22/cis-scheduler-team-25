import { section } from "./section";
export interface course {
    name: string;
    credits: number;
    prereqs: course[];
    courseCode: number;
    sections: section[];
}
