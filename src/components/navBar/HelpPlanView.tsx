import React from "react";
import { Modal } from "react-bootstrap";

export function HelpPlanView() {
    return (
        <Modal.Body>
            {" "}
            After selecting a degree plan, you will be brought to your Plan
            Viewer, where you can see all the current semesters in your plan.
            The courses in each semester will also be displayed, including each
            courses&apos; code and formal name.
            <br></br>
            <br></br>
            From here, you can click on existing semesters, enabling you to
            <b> view/delete a semester.</b> Viewing a semester will bring you to
            an editing menu for choosing your courses in your selected semester
            (please see <i>Editing Semesters with Course Drag and Drop</i> for
            more information). You may also add a new, empty semester with the{" "}
            <b>Add Semester</b> button.
            <br></br>
            <br></br>
            When you view a semester, the courses you are able to choose from
            are affected by your <b>degree concentration.</b> You can select a
            concentration for your Computer Science BS through the dropdown
            selector.
            <br></br>
            <br></br>
            Alternatively, you can remove ALL semesters by clicking the
            <b> Remove All Semesters</b> button, or return back to the main menu
            with the <b>Return to Main Menu</b> button to select a new degree
            plan.
        </Modal.Body>
    );
}
