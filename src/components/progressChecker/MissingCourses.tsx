import React from "react";
import "../components.css";
import { Course } from "../../interfaces/course";
import Collapsible from "react-collapsible";
import { DegreePlan } from "../../interfaces/degreeplan";
import { getUnusedCourses } from "../dropLogic/utils/dragUtils";
import { Semester } from "../../interfaces/semester";
import RequirementCreditCounts from "../../data/requirement_credit_counts.json";

// specifies how many credits are needed for a category + requirement pair
const requirementCreditCounts = RequirementCreditCounts as Record<
    string,
    Record<string, number>
>;

type MissingCoursesProps = {
    requiredCourses: Course[];
    currentPlan: DegreePlan;
    category: string;
    requirement: string;
};

// check if taken credits meet the amount needed for that category/requirement pair
function checkCredits(
    creditTotal: number,
    category: string,
    requirement: string
): boolean {
    return creditTotal >= requirementCreditCounts[category][requirement];
}

// display collapsible information depending on value of checkCredits()
function showStatus(
    missingCourses: Course[],
    creditTotal: number,
    category: string,
    requirement: string
): JSX.Element {
    if (checkCredits(creditTotal, category, requirement)) {
        return <p>This requirement is completed!</p>;
    } else {
        return (
            <>
                <p>
                    Requirement not met; can choose from the following courses:
                </p>
                <ul>
                    {missingCourses.map(
                        (course: Course): JSX.Element => (
                            <li key={course.code}>{course.code}</li>
                        )
                    )}
                </ul>
            </>
        );
    }
}

export function MissingCourses({
    requiredCourses,
    currentPlan,
    category,
    requirement
}: MissingCoursesProps): JSX.Element {
    let missingCourses: Course[];

    if (currentPlan.semesters.length !== 0) {
        // get last semester to feed into getUnusedCourses()
        const lastSemester =
            currentPlan.semesters[currentPlan.semesters.length - 1];

        // get all courses not taken for a particular category + requirement
        missingCourses = getUnusedCourses(
            currentPlan,
            lastSemester,
            requiredCourses,
            category + "-" + requirement
        );
    } else {
        missingCourses = [...requiredCourses];
    }

    // sum all the credits taken for a particular category + requirement
    const creditTotal = currentPlan.semesters.reduce(
        (total: number, semester: Semester) =>
            total +
            semester.courses
                .filter((course: Course): boolean =>
                    course.degreeRequirements.includes(
                        category + "-" + requirement
                    )
                )
                .reduce(
                    (semTotal: number, course: Course) =>
                        semTotal + parseInt(course.credits),
                    0
                ),
        0
    );

    const collapseName =
        "View " +
        requirement +
        " Progress " +
        (checkCredits(creditTotal, category, requirement) ? "✔️" : "❌") +
        "(" +
        creditTotal +
        "/" +
        requirementCreditCounts[category][requirement] +
        ") Credits";

    return (
        <div data-testid={"collapsible-" + category + "-" + requirement}>
            <Collapsible
                className="collapsible"
                openedClassName="collapsible"
                trigger={collapseName}
            >
                {showStatus(missingCourses, creditTotal, category, requirement)}
            </Collapsible>
        </div>
    );
}
