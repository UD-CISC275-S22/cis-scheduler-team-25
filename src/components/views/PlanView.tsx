import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { AddSemesterForm } from "../planComponents/AddSemesterForm";
import { SemesterScrollBox } from "../planComponents/SemesterScrollBox";
import { SetDegreeList } from "../planComponents/SetDegreeList";
import "../components.css";
import { ViewProgress } from "../progressChecker/ViewProgress";
import { RemoveCurrentSemestersButton } from "../planComponents/RemoveCurrentSemestersButton";
import { RemoveAllSemestersButton } from "../planComponents/RemoveAllSemestersButton";
import { AddSemesterButton } from "../planComponents/AddSemesterButton";

type PlanViewProps = {
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
};

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
}: PlanViewProps): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);

    return (
        <div>
            <h1>{currentPlan.name}</h1>
            <SemesterScrollBox
                plan={currentPlan}
                setCurrentSemester={setCurrentSemester}
            />
            <p>{currentPlan.semesters.length} Semesters Total</p>
            <SetDegreeList
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                setPlans={setPlans}
            />
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
            <ViewProgress currentPlan={currentPlan} />
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
