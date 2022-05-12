import React from "react";
import { Modal } from "react-bootstrap";

export function HelpIntroView() {
    return (
        <Modal.Body data-testid="HelpIntroView">
            {" "}
            Welcome to the UD CIS Course Scheduler! This application allows you
            to create and edit degree plans for Computer Science BS majors. You
            can begin by selecting a pre-made example plan or creating your own!
            <br></br>
            <br></br>
            If you need help using the site, please click{" "}
            <b>How to Use the Scheduler</b> in the navigation bar. Have fun!
        </Modal.Body>
    );
}
