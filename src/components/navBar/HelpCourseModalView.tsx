import React from "react";
import { Modal } from "react-bootstrap";

export function HelpCourseModalView() {
    return (
        <Modal.Body>
            {" "}
            When viewing a semester, you can click on a draggable course card to
            view/edit a course&apos; information. This is achieved by double
            clicking the course card instead of dragging it.
            <br></br>
            <br></br>
            <p>
                <strong>Editing Course Information</strong>
            </p>
            Editing a course is achieved by clicking on the{" "}
            <b>Edit Information</b> button in the course information popup.
            Several textboxes will appear for editing a course&apos; name,
            description, credits, and prerequsisites. Checkboxes are used to
            select what requirements your course should meet. The{" "}
            <b>Save Changes</b> will only be enabled if your edits are valid!
            <br></br>
            <br></br>
            <b>
                The &quot;Course Prerequisites&quot; textbox requires a special
                format to be used.
            </b>
            <br></br>
            <br></br>
            Warning! This change will globally modify that course for all degree
            plans. plans.
            <br></br>
            <br></br>
            <p>
                <strong>Transferring Courses Between Semesters</strong>
            </p>
            You can also transfer a course from one semester to another by
            pressing the <b>Transfer Course to Other Semester</b> button. This
            button is only enabled if its from your Semester Pool. Pressing this
            button will bring you to a dropdown to select what semester you want
            to transfer your course to.
            <br></br>
            <br></br>
            When transferring a course, you must not have any prerequisite
            conflicts. For example, CISC 181 depends on CISC 108. If you are
            taking CISC 108 in Fall 2023 and CISC 181 in Fall 2024, you can move
            CISC 108 into Spring 2024, but NOT Fall 2024. So and and so forth.
        </Modal.Body>
    );
}
