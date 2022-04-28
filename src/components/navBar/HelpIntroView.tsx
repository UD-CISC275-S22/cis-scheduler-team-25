import React from "react";
import { Modal } from "react-bootstrap";

export function HelpIntroView() {
    return (
        <Modal.Body>
            {" "}
            Welcome to the UD CIS Course Scheduler!. This application allows you
            to create and edit degree plans for Computer Science BS majors.
            <br></br>
            If you need help using the site, please click &quot;How to Use the
            Scheduler&quot; in the navigation bar. Have fun!
        </Modal.Body>
    );
}
