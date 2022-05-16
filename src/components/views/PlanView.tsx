import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";
import { AddSemesterForm } from "../planComponents/AddSemesterForm";
import { SemesterScrollBox } from "../planComponents/SemesterScrollBox";
import { SetDegreeList } from "../planComponents/SetDegreeList";
import "../components.css";
import { ViewProgress } from "../progressChecker/ViewProgress";
import { RemoveCurrentSemestersButton } from "../planComponents/RemoveCurrentSemestersButton";
import { RemoveAllSemestersButton } from "../planComponents/RemoveAllSemestersButton";
import { AddSemesterButton } from "../planComponents/AddSemesterButton";
import { usePlanContext } from "../context/PlanContext";

type PlanViewProps = {
    setMode: (newMode: string) => void;
};

// Button for switching to the SemesterView after selecting a semester
function SemesterViewButton({
    setMode,
    currentSemester
}: {
    setMode: (newMode: string) => void;
    currentSemester: Semester;
}): JSX.Element {
    return (
        <Button
            disabled={currentSemester.id === -1}
            data-testid="plan-semester-button"
            className="mode-button"
            onClick={() => setMode("semester")}
        >
            {currentSemester.id !== -1
                ? "Edit " +
                  currentSemester.season +
                  "-" +
                  currentSemester.year.toString() +
                  " Courses"
                : "Edit Semester Courses"}
        </Button>
    );
}

// Button for switching back to the main menu
function MainViewButton({ setMode }: PlanViewProps): JSX.Element {
    return (
        <div>
            <Button
                data-testid="plan-main-button"
                className="mode-button"
                onClick={() => setMode("main")}
            >
                Return to Main Menu
            </Button>
        </div>
    );
}

/*
View for seeing the semesters of a plan laid out, also showing information about
how the current plan compares to the necessary requirements for a specified major
*/
export function PlanView({ setMode }: PlanViewProps): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const { currentPlan, currentSemester } = usePlanContext();

    return (
        <div>
            <br></br>
            <h1>{currentPlan.name}</h1>
            <br></br>
            <Container>
                <Row>
                    <Col xs={7}>
                        <SemesterScrollBox />
                    </Col>
                    <Col>
                        <div className="plan-view-section">
                            <p>
                                <b>Change your Degree Concentration:</b>
                            </p>
                            <SetDegreeList />
                        </div>
                        <div className="plan-view-section-mid">
                            <p>
                                <b>Edit Plan Contents ✎</b>
                            </p>
                            <AddSemesterButton
                                showAdd={showAdd}
                                setShowAdd={setShowAdd}
                            />
                            {showAdd && (
                                <AddSemesterForm setShowAdd={setShowAdd} />
                            )}
                            <br></br>
                            <RemoveCurrentSemestersButton />
                            <RemoveAllSemestersButton />
                        </div>
                        <div className="plan-view-section">
                            <p>
                                <b>Degree Completion Status</b>
                            </p>
                            <ViewProgress />
                        </div>
                    </Col>
                </Row>
            </Container>
            <div>
                <SemesterViewButton
                    setMode={setMode}
                    currentSemester={currentSemester}
                />
            </div>
            <MainViewButton setMode={setMode} />
        </div>
    );
}
