import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { AddSemesterForm } from "./AddSemesterForm";
import { SemesterScrollBox } from "./SemesterScrollBox";
import invalidSemester from "../exampleData/invalid_semester.json";
import { ViewProgress } from "./ViewProgress";
import "./components.css";

// Button for switching to the SemesterView after selecting a semester
function SemesterViewButton({
    setMode,
    currentSemester
}: {
    setMode: (newMode: string) => void;
    currentSemester: Semester;
}): JSX.Element {
    return (
        <Button
            disabled={currentSemester.id === -1}
            data-testid="plan-semester-button"
            className="mode-button"
            onClick={() => setMode("semester")}
        >
            {currentSemester.id !== -1
                ? "View " +
                  currentSemester.season +
                  "-" +
                  currentSemester.year.toString()
                : "Pick a Semester!"}
        </Button>
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
                data-testid="add-semester-button"
                className="mode-button"
                onClick={() => setShowAdd(!showAdd)}
            >
                Add Semester
            </Button>
        </div>
    );
}

function RemoveCurrentSemestersButton({
    currentPlan,
    setCurrentPlan,
    currentSemester,
    setCurrentSemester,
    setPlans,
    plans
}: {
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    setPlans: (newPlans: DegreePlan[]) => void;
    plans: DegreePlan[];
}): JSX.Element {
    return (
        <Button
            disabled={currentSemester.id === -1}
            data-testid="remove-current-semester-button"
            className="mode-button"
            onClick={() => {
                // create DegreePlan based on currentPlan, but with empty semesters
                const rmvSemesterPlan = {
                    ...currentPlan,
                    semesters: currentPlan.semesters.filter(
                        (semester: Semester): boolean =>
                            semester.id !== currentSemester.id
                    ),
                    length: 0
                };
                // modify plans array so that the DegreePlan matching the
                // current plan is switched with clearedPlan
                const newPlans = plans.map(
                    (currPlan: DegreePlan): DegreePlan =>
                        currentPlan.id === currPlan.id
                            ? rmvSemesterPlan
                            : currPlan
                );
                // set plans to newPlans, and make currentPlan the new clearedPlan
                setPlans(newPlans);
                setCurrentPlan(rmvSemesterPlan);
                setCurrentSemester(invalidSemester);
            }}
        >
            {currentSemester.id !== -1
                ? "Delete " +
                  currentSemester.season +
                  "-" +
                  currentSemester.year.toString()
                : "Pick a Semester!"}
        </Button>
    );
}

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
                    const clearedPlan = {
                        ...currentPlan,
                        semesters: [],
                        length: 0
                    };
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
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    currentSemester,
    setCurrentSemester
}: {
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);

    return (
        <div>
            <h1>{currentPlan.name}</h1>
            <SemesterScrollBox
                plan={currentPlan}
                setCurrentSemester={setCurrentSemester}
            />
            <p>{currentPlan.length} Semesters Total</p>
            <div>
                <SemesterViewButton
                    setMode={setMode}
                    currentSemester={currentSemester}
                />
                <RemoveCurrentSemestersButton
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    setPlans={setPlans}
                    plans={plans}
                    currentSemester={currentSemester}
                    setCurrentSemester={setCurrentSemester}
                />
            </div>
            <ViewProgress />
            <AddSemesterButton showAdd={showAdd} setShowAdd={setShowAdd} />
            {showAdd && (
                <AddSemesterForm
                    plans={plans}
                    setPlans={setPlans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    setShowAdd={setShowAdd}
                />
            )}
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
