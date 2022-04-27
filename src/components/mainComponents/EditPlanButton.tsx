import React from "react";
import { Button } from "react-bootstrap";
import "./components.css";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function EditPlanButton({
    showRemove,
    setShowRemove
}: {
    showRemove: boolean;
    setShowRemove: (value: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                data-testid="edit-plan-button"
                className="mode-button"
                onClick={() => setShowRemove(!showRemove)}
            >
                Edit Plan
            </Button>
        </div>
    );
}
