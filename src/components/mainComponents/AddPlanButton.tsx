import React from "react";
import { Button } from "react-bootstrap";
import "../components.css";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function AddPlanButton({
    showAdd,
    setShowAdd
}: {
    showAdd: boolean;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                variant={showAdd ? "danger" : "success"}
                data-testid="add-plan-button"
                className="mode-button"
                onClick={() => setShowAdd(!showAdd)}
            >
                {showAdd ? "Cancel Add ⌫" : "Add Plan ＋"}
            </Button>
        </div>
    );
}
