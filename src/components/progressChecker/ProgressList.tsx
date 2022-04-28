import React from "react";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import { PlanView } from "../views/PlanView";
import "../components.css";
import Collapsible from "react-collapsible";
import { Semester } from "../../interfaces/semester";
import { MissingCourses } from "./MissingCourses";
import { categories } from "../ReadJSON";
import DegreeCategories from "../../exampleData/degree_categories.json";
import CategoryCourses from "../../exampleData/category_courses.json";

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
            <Collapsible
                className="collapsible"
                trigger="View CISC Core Requirements"
            >
                <p>missing the following courses:</p>
            </Collapsible>
            <Collapsible
                className="collapsible"
                trigger="View Breadth Requirements"
            >
                <p>missing the following courses:</p>
            </Collapsible>
            <Collapsible
                className="collapsible"
                trigger="View Concentration Requirements"
            >
                <p>missing the following courses:</p>
            </Collapsible>
        </div>
    );
}
