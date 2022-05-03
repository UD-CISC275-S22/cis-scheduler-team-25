import React from "react";
import { Modal } from "react-bootstrap";

export function HelpMainView() {
    return (
        <Modal.Body>
            {" "}
            In the main menu, start by selecting an existing degree plan in the
            selection box. After a degree plan is selected, you can click on
            <b> View Degree Plan</b> to view that plan&apos;s semesters.
            <br></br>
            <br></br>
            You can also choose to edit the selected degree plan&apos;s name
            using the <b>Edit Plan</b> button (please see{" "}
            <i>Selecting Semesters in a Plan</i> for more information). Clicking
            this button will show a textbox for renaming your new plan. You can
            also choose to delete the chosen plan using the <b>Remove Plan</b>{" "}
            button.
            <br></br>
            <br></br>
            Alternatively, you can also create a new, empty degree plan using
            the <b>Add Plan</b> button. Clicking this button will show a textbox
            for naming your new plan. Clicking the
            <b> Confirm</b> button will add your new degree plan.
        </Modal.Body>
    );
}
