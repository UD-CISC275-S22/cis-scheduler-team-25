import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { HelpModal } from "./HelpModal";

const GUIDES = [
    "Introduction",
    "Managing Your Degree Plans",
    "Selecting Semesters in a Plan",
    "Editing Semesters with Course Drag and Drop"
];

export function HelpBar(): JSX.Element {
    const [helpMode, setHelpMode] = useState<string>("Introduction");
    const [showModal, setShowModal] = useState<boolean>(true);

    return (
        <>
            <HelpModal
                helpMode={helpMode}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <strong>UD-CIS-Scheduler</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown
                                title="How to Use the Scheduler"
                                id="basic-nav-dropdown"
                            >
                                {GUIDES.map(
                                    (guide: string): JSX.Element => (
                                        <NavDropdown.Item
                                            key={"nav-drop-" + guide}
                                            onClick={() => {
                                                setHelpMode(guide);
                                                setShowModal(true);
                                            }}
                                        >
                                            {guide}
                                        </NavDropdown.Item>
                                    )
                                )}
                            </NavDropdown>
                            <Nav.Link href="https://www.cis.udel.edu/academics/undergraduate-programs/">
                                UD CISC Undergraduate Programs
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
