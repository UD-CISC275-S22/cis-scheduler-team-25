import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import {
    planToCSV,
    CSVToPlan
} from "../components/mainComponents/utils/CSVUtils";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import defaultPlans from "../data/example_degree_plan.json";
import fs from "fs";

// default plans read in by degreeplans.json
const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
    (plan): DegreePlan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester): Semester => ({
                ...semester,
                courses: semester.courses.map(
                    (course): Course => ({
                        ...course,
                        preReqs: course.preReqs as string[][]
                    })
                )
            })
        )
    })
);

function semesterEqual(s1: Semester, s2: Semester): boolean {
    if (s1.courses.length !== s2.courses.length) {
        console.log(s1.id.toString(), s2.id.toString());
        return false;
    }
    const courseCheck = s1.courses.map((course: Course, idx: number): boolean =>
        courseEqual(course, s2.courses[idx])
    );
    if (!courseCheck.every((check: boolean): boolean => check)) {
        console.log(s1.id.toString(), s2.id.toString());
        return false;
    }
    if (s1.id === s2.id && s1.season === s2.season && s1.year === s2.year) {
        return true;
    } else {
        console.log(s1.id.toString(), s2.id.toString());
        return false;
    }
}

function courseEqual(c1: Course, c2: Course): boolean {
    if (c1.degreeRequirements.length !== c2.degreeRequirements.length) {
        console.log(c1.code + c2.code);
        return false;
    }
    const reqCheck = c1.degreeRequirements.map(
        (req: string, idx: number): boolean =>
            req === c2.degreeRequirements[idx]
    );

    if (!reqCheck.every((check: boolean): boolean => check)) {
        console.log(c1.code + c2.code);
        return false;
    }

    const preReqs1 = c1.preReqs.reduce(
        (reqs: string[], reqGroup: string[]) => [...reqs, ...reqGroup],
        []
    );

    const preReqs2 = c2.preReqs.reduce(
        (reqs: string[], reqGroup: string[]) => [...reqs, ...reqGroup],
        []
    );

    if (preReqs1.length !== preReqs2.length) {
        console.log(c1.code + c2.code);
        console.log(preReqs1.length.toString() + preReqs2.length.toString());
        return false;
    }

    const preReqCheck = preReqs1.map(
        (req: string, idx: number): boolean => req === preReqs2[idx]
    );

    if (!preReqCheck.every((check: boolean): boolean => check)) {
        console.log(c1.code + c2.code);
        return false;
    }

    if (
        c1.breadth.trim() === c2.breadth.trim() &&
        c1.code.trim() === c2.code.trim() &&
        c1.credits.trim() === c2.credits.trim() &&
        c1.name.trim() === c2.name.trim() &&
        c1.preReqDesc.trim() === c2.preReqDesc.trim() &&
        c1.restrict.trim() === c2.restrict.trim() &&
        c1.typ.trim() === c2.typ.trim() &&
        c1.descr.trim() === c2.descr.trim()
    )
        return true;
    else {
        console.log(c1.code + c2.code);
        return false;
    }
}

describe("CSV Export/Import Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Expect export button, import button, and import field to exist", () => {
        expect(screen.getByTestId("CSV-export-button")).toBeInTheDocument();
        expect(screen.getByTestId("CSV-import-button")).toBeInTheDocument();
        expect(screen.getByTestId("CSV-file-bar")).toBeInTheDocument();
    });
    test("Check that CSV utils correctly convert a DegreePlan to a string in CSV format", () => {
        const output = planToCSV(DEFAULT_PLANS[0]);
        const rawCSVText = fs
            .readFileSync("./src/tests/data/CSV_output.txt", "utf8")
            .replaceAll("\r", "");
        expect(output).toBe(rawCSVText);
    });
    test("Check that CSV utils correctly convert a CSV-formatted string to a DegreePlan", () => {
        const rawCSVText = fs
            .readFileSync("./src/tests/data/CSV_output.txt", "utf8")
            .replaceAll("\r", "");
        const originalPlan = DEFAULT_PLANS[0];
        const plan = CSVToPlan(rawCSVText, DEFAULT_PLANS);
        expect(plan.id).toBe(2);
        expect(plan.name).toBe("Example Degree Plan 1 (copy)");
        expect(plan.degree.name).toBe(
            "Computer Science BS - Bioinformatics Concentration"
        );
        expect(plan.degree.concentration).toBe("Bioinformatics Concentration");
        expect(plan.semesters.length).toBe(originalPlan.semesters.length);
        const semCheck = plan.semesters.map(
            (sem: Semester, idx: number): boolean =>
                semesterEqual(sem, originalPlan.semesters[idx])
        );

        expect(semCheck.every((check: boolean): boolean => check)).toBe(true);
    });
});
