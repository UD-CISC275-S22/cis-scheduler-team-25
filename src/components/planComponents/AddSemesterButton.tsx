import React from "react";
import { Button } from "react-bootstrap";
import "../components.css";

// Button for completely clearing a plan's existing semesters
export function AddSemesterButton({
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
                variant="success"
                onClick={() => setShowAdd(!showAdd)}
            >
                {showAdd ? "Cancel Add" : "Add Semester"}
            </Button>
        </div>
    );
}
