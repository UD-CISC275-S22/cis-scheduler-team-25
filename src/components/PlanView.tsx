import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { AddSemesterForm } from "./AddSemesterForm";
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

// Button for completely clearing a plan's existing semesters
function AddSemesterButton({
    showAdd,
    setShowAdd
}: {
    showAdd: boolean;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                data-testtd="add-semester-button"
                className="mode-button"
                onClick={() => setShowAdd(!showAdd)}
            >
                Add Semester
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
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester
}: {
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);

    return (
        <div>
            <h1>{currentPlan.name}</h1>
            <SemesterScrollBox
                plan={currentPlan}
                setMode={setMode}
                setCurrentSemester={setCurrentSemester}
            />
            <p>{currentPlan.length} Semesters Total</p>
            <AddSemesterButton showAdd={showAdd} setShowAdd={setShowAdd} />
            {showAdd && (
                <AddSemesterForm
                    plans={plans}
                    setPlans={setPlans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                />
            )}
            <SemesterViewButton setMode={setMode} />
            <MainViewButton setMode={setMode} />
        </div>
    );
}
