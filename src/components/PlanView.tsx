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

// Button for completely clearing a plan's existing semesters
function RemoveAllSemestersButton({
    currentPlan,
    setCurrentPlan,
    setPlans,
    plans
}: {
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setPlans: (newPlans: DegreePlan[]) => void;
    plans: DegreePlan[];
}): JSX.Element {
    return (
        <div>
            <Button
                data-testid="remove-all-semesters-button"
                className="mode-button"
                onClick={() => {
                    // create DegreePlan based on currentPlan, but with empty semesters
                    const clearedPlan = { ...currentPlan, semesters: [] };
                    // modify plans array so that the DegreePlan matching the
                    // current plan is switched with clearedPlan
                    const newPlans = plans.map(
                        (currPlan: DegreePlan): DegreePlan =>
                            currentPlan.id === currPlan.id
                                ? clearedPlan
                                : currPlan
                    );
                    // set plans to newPlans, and make currentPlan the new clearedPlan
                    setPlans(newPlans);
                    setCurrentPlan(clearedPlan);
                }}
            >
                Remove All Semesters
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
    currentPlan,
    setCurrentPlan,
    setPlans,
    plans
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (newSemester: Semester) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPLan: DegreePlan) => void;
    setPlans: (newPlans: DegreePlan[]) => void;
    plans: DegreePlan[];
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
            <RemoveAllSemestersButton
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                setPlans={setPlans}
                plans={plans}
            />
            <MainViewButton setMode={setMode} />
        </div>
    );
}
