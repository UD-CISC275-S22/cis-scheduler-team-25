import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { DegreePlanList } from "../mainComponents/DegreePlanList";
<<<<<<< HEAD
import invalidSemester from "../../exampleData/invalid_semester.json";
=======
import { CSVExport } from "../mainComponents/CSVExport";
import invalidSemester from "../../data/invalid_semester.json";
>>>>>>> 48eb974fb6803d9e450bd897c0fc7a4e592fbaa7
import { Semester } from "../../interfaces/semester";
import { AddPlanButton } from "../mainComponents/AddPlanButton";
import { EditPlanButton } from "../mainComponents/EditPlanButton";
import { EditRemovePlanForm } from "../mainComponents/EditPlanForm";
import { AddPlanForm } from "../planComponents/InsertPlanForm";
import { CSVExport } from "../mainComponents/CSVExport";

type MainViewProps = {
    setPlans: (newPlans: DegreePlan[]) => void;
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setCurrentSemester: (newSemester: Semester) => void;
};

// button for switching to the PlanView
function PlanViewButton({
    setMode,
    setCurrentSemester
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    return (
        <Button
            data-testid="main-plan-button"
            onClick={() => {
                setCurrentSemester(invalidSemester);
                setMode("plan");
            }}
        >
            View Degree Plan
        </Button>
    );
}

/*
View for the main menu, showing a list of degree plans you can select OR choose
to make a new one
*/
export function MainView({
    setMode,
    plans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setPlans
}: MainViewProps): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [showRemove, setShowRemove] = useState<boolean>(false);

    return (
        <div>
            <h1>Degree Plan Selector</h1>
            <DegreePlanList
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
            />
            <PlanViewButton
                setMode={setMode}
                setCurrentSemester={setCurrentSemester}
            />
            <AddPlanButton
                showAdd={showAdd}
                setShowAdd={setShowAdd}
            ></AddPlanButton>
            {showAdd && (
                <AddPlanForm
                    plans={plans}
                    setPlans={setPlans}
                    setShowAdd={setShowAdd}
                ></AddPlanForm>
            )}
            <EditPlanButton
                showRemove={showRemove}
                setShowRemove={setShowRemove}
            ></EditPlanButton>
            {showRemove && (
                <EditRemovePlanForm
                    plans={plans}
                    setPlans={setPlans}
                    currentPlan={currentPlan}
                    setShowRemove={setShowRemove}
                    setCurrentPlan={setCurrentPlan}
                ></EditRemovePlanForm>
            )}
            <CSVExport plans={plans}></CSVExport>
        </div>
    );
}
