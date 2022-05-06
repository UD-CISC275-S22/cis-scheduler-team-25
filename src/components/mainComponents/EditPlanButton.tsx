import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import "../components.css";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function EditPlanButton({
    showRemove,
    setShowRemove,
    currentPlan
}: {
    showRemove: boolean;
    setShowRemove: (value: boolean) => void;
    currentPlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
            <Button
                disabled={currentPlan.id === -1}
                data-testid="edit-plan-button"
                className="mode-button"
                onClick={() => setShowRemove(!showRemove)}
            >
                Edit Plan
            </Button>
        </div>
    );
}
