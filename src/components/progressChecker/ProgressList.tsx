import React from "react";
import { DegreePlan } from "../../interfaces/degreeplan";
import "../components.css";
import { MissingCourses } from "./MissingCourses";
import DegreeCategories from "../../exampleData/degree_categories.json";
import CategoryCourses from "../../exampleData/category_courses.json";
import INVALID_COURSE from "../../exampleData/invalid_course.json";
import { Course } from "../../interfaces/course";

const degreeCategories = DegreeCategories as Record<string, string[]>;
const categoryCourses = CategoryCourses as Record<
    string,
    Record<string, string[]>
>;

type ProgressListProps = {
    currentPlan: DegreePlan;
};

export function ProgressList({ currentPlan }: ProgressListProps): JSX.Element {
    const generalReqs = degreeCategories["General"];
    const concReqs = degreeCategories[currentPlan.degree.concentration];

    return (
        <div>
            <p>
                <strong>General Requirements</strong>
            </p>
            {generalReqs.map(
                (req: string): JSX.Element => (
                    <MissingCourses
                        key={"General-" + req}
                        requiredCourses={categoryCourses["General"][req].map(
                            (code: string): Course => ({
                                ...INVALID_COURSE,
                                code: code,
                                degreeRequirements: ["General-" + req]
                            })
                        )}
                        currentPlan={currentPlan}
                        category="General"
                        requirement={req}
                    />
                )
            )}
            <br></br>
            <p>
                <strong>{currentPlan.degree.concentration} Requirements</strong>
            </p>
            {concReqs.map(
                (req: string): JSX.Element => (
                    <MissingCourses
                        key={currentPlan.degree.concentration + "-" + req}
                        requiredCourses={categoryCourses[
                            currentPlan.degree.concentration
                        ][req].map(
                            (code: string): Course => ({
                                ...INVALID_COURSE,
                                code: code,
                                degreeRequirements: [
                                    currentPlan.degree.concentration + "-" + req
                                ]
                            })
                        )}
                        currentPlan={currentPlan}
                        category={currentPlan.degree.concentration}
                        requirement={req}
                    />
                )
            )}
        </div>
    );
}
