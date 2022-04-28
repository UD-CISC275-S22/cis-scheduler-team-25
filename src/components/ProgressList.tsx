import React from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import { PlanView } from "./views/PlanView";
import "./components.css";
import Collapsible from "react-collapsible";
import { Semester } from "../interfaces/semester";
import { MissingCourses } from "./MissingCourses";

export function ProgressList(): JSX.Element {
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
