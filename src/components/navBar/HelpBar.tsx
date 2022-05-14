import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { usePlanContext } from "../context/PlanContext";
import { HelpModal } from "./HelpModal";
import { SaveModal } from "./SaveModal";

const saveDataKey = "CIS-PLANNER-TEAM-25-DATA";
const GUIDES = [
    "Introduction",
    "Managing Your Degree Plans",
    "Selecting Semesters in a Plan",
    "Editing Semesters with Course Drag and Drop",
    "Using the Course Viewer, Editor, and Transfer"
];

function savePlans(
    plans: DegreePlan[],
    setShowSaveModal: (s: boolean) => void
) {
    localStorage.setItem(saveDataKey, JSON.stringify(plans));
    setShowSaveModal(true);
}

export function HelpBar(): JSX.Element {
    const [helpMode, setHelpMode] = useState<string>("Introduction");
    const [showHelpModal, setShowHelpModal] = useState<boolean>(true);
    const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
    const { plans } = usePlanContext();

    return (
        <>
            <HelpModal
                helpMode={helpMode}
                showModal={showHelpModal}
                setShowModal={setShowHelpModal}
            />
            <SaveModal
                showModal={showSaveModal}
                setShowModal={setShowSaveModal}
            />
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <strong>UD-CIS-Scheduler</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                onClick={() =>
                                    savePlans(plans, setShowSaveModal)
                                }
                            >
                                💾 Save Current Changes
                            </Nav.Link>
                            <NavDropdown
                                title="How to Use the Scheduler"
                                data-testid="nav-drop-How to Use the Scheduler"
                            >
                                {GUIDES.map(
                                    (guide: string): JSX.Element => (
                                        <div
                                            key={"nav-drop-" + guide}
                                            data-testid={"nav-drop-" + guide}
                                        >
                                            <NavDropdown.Item
                                                onClick={() => {
                                                    setHelpMode(guide);
                                                    setShowHelpModal(true);
                                                }}
                                            >
                                                {guide}
                                            </NavDropdown.Item>
                                        </div>
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
