import React from "react";
import { Modal } from "react-bootstrap";

export function HelpPlanView() {
    return (
        <Modal.Body>
            After selecting a degree plan, you will be brought to your Plan
            Viewer, where you can see all the current semesters in your plan.
            The courses in each semester will also be displayed, including each
            courses&apos; code and formal name. You can also view your degree
            progress from this screen!
            <br></br>
            <br></br>
            <p>
                <strong>Editing Your Semester</strong>
            </p>
            From this view, you can click on existing semesters, enabling you to
            <b> view/delete a semester.</b> Choosing to edit a semester will
            bring you to an editing menu for choosing your courses in your
            selected semester (please see{" "}
            <i>Editing Semesters with Course Drag and Drop</i> for more
            information). You may also add a new, empty semester with the{" "}
            <b>Add Semester</b> button.
            <br></br>
            <br></br>
            Alternatively, you can remove ALL semesters by clicking the
            <b> Remove All Semesters</b> button, or return back to the main menu
            with the <b>Return to Main Menu</b> button to select a new degree
            plan.
            <br></br>
            <br></br>
            <p>
                <strong>Choosing a Concentration</strong>
            </p>
            Different degree concentrations require different courses to be
            completed. You can select different <b>degree concentrations</b> for
            your Computer Science BS through a dropdown selector on the top
            right of your screen. This concentration affects two things:
            <ul>
                <li>
                    The courses you can choose from when editing a semester.
                </li>
                <li>The status of your degree completion.</li>
            </ul>
            Please check the <b>UD CISC Undergraduate Programs</b> button in the
            navigation bar to learn more about the different concentrations!
        </Modal.Body>
    );
}
