import React from "react";
import { Modal } from "react-bootstrap";

export function HelpSaveView() {
    return (
        <Modal.Body data-testid="HelpIntroView">
            {" "}
            If you want to save your edited degree plans in between sessions,
            you can click the <b>Save Changes</b> button in the top left of the
            navigation bar at any time. This will maintain your changes after
            you close your tab or browser, and you can pick up where you left
            off when you return.
        </Modal.Body>
    );
}
