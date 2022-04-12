import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import "./components.css";
import { SemesterScrollBox } from "./SemesterScrollBox";

// Button for switching to the SemesterView after selecting a semester
function SemesterViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                data-testid="plan-semester-button"
                className="mode-button"
                onClick={() => setMode("semester")}
            >
                View Semester
            </Button>
        </div>
    );
}

// Button for switching back to the main menu
function MainViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                data-testid="plan-main-button"
                className="mode-button"
                onClick={() => setMode("main")}
            >
                Return to Main Menu
            </Button>
        </div>
    );
}

/*
View for seeing the semesters of a plan laid out, also showing information about
how the current plan compares to the necessary requirements for a specified major
*/
export function PlanView({
    setMode,
    setCurrentSemester,
    currentPlan
}: {
    currentPlan: DegreePlan;
    setCurrentSemester: (newSemester: Semester) => void;
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <h1>{currentPlan.name}</h1>
            <SemesterScrollBox
                plan={currentPlan}
                setMode={setMode}
                setCurrentSemester={setCurrentSemester}
            />
            <p>{currentPlan.length} Semesters Total</p>
            <SemesterViewButton setMode={setMode} />
            <MainViewButton setMode={setMode} />
        </div>
    );
}
