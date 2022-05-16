import React from "react";
import { Button } from "react-bootstrap";
import "../components.css";
import { usePlanContext } from "../context/PlanContext";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function EditPlanButton({
    showRemove,
    setShowRemove
}: {
    showRemove: boolean;
    setShowRemove: (value: boolean) => void;
}): JSX.Element {
    const { currentPlan } = usePlanContext();
    return (
        <div>
            <Button
                disabled={currentPlan.id === -1}
                data-testid="edit-plan-button"
                className="mode-button"
                onClick={() => setShowRemove(!showRemove)}
            >
<<<<<<< HEAD
                Edit Plan ✎
=======
                Edit Plan Name
>>>>>>> 57e70213fe14fca2b2cced41f8f26b4e140aa11f
            </Button>
        </div>
    );
}
