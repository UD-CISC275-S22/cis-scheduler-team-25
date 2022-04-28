import React from "react";
import { Modal } from "react-bootstrap";

export function HelpMainView() {
    return (
        <Modal.Body>
            {" "}
            In the main menu, start by selecting an existing degree plan in the
            selection box. After a degree plan is selected, you can click on
            &quot;View Degree Plan&quot; to view that plan&apos;s semesters.
            <br></br>
            <br></br>
            You can also choose to edit the selected degree plan&apos;s name
            using the &quot;Edit Plan&quot; button. Clicking this button will
            show a textbox for renaming your new plan. You can also choose to
            delete the chosen plan using the &quot;Remove Plan&quot; button.
            <br></br>
            <br></br>
            Alternatively, you can also create a new, empty degree plan using
            the &quot;Add Plan&quot; button. Clicking this button will show a
            textbox for naming your new plan. Clicking the &quot;Confirm&quot;
            button will add your new degree plan.
        </Modal.Body>
    );
}
