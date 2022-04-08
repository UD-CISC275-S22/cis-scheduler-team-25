import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import "./components.css";

function SemesterViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <Button className="mode-button" onClick={() => setMode("semester")}>
                View Semester
            </Button>
        </div>
    );
}

function MainViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <Button className="mode-button" onClick={() => setMode("main")}>
                Return to Main Menu
            </Button>
        </div>
    );
}

export function PlanView({
    setMode,
    currentPlan
}: {
    currentPlan: DegreePlan;
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <h1>{currentPlan.name}</h1>
            <p>{currentPlan.length} Semesters Total</p>
            <SemesterViewButton setMode={setMode} />
            <MainViewButton setMode={setMode} />
        </div>
    );
}
