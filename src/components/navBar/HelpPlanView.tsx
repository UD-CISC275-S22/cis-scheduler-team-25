import React from "react";
import { Modal } from "react-bootstrap";

export function HelpPlanView() {
    return (
        <Modal.Body>
            {" "}
            After selecting a degree plan, you will be brought to your Plan
            Viewer, where you can see all the current semesters in your plan.
            From here, you can select on existing semesters, add/remove a
            semester, and change your concentration.
        </Modal.Body>
    );
}
