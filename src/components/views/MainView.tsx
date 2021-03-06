import React, { useState } from "react";
import { DegreePlan } from "../../interfaces/degreeplan";
import { DegreePlanList } from "../mainComponents/DegreePlanList";
import { CSVExport } from "../mainComponents/CSVExport";
import invalidSemester from "../../data/invalid_semester.json";
import { Semester } from "../../interfaces/semester";
import { AddPlanButton } from "../mainComponents/AddPlanButton";
import { EditPlanButton } from "../mainComponents/EditPlanButton";
import { EditPlanForm } from "../mainComponents/EditPlanForm";
import { AddPlanForm } from "../mainComponents/InsertPlanForm";
import { CSVImport } from "../mainComponents/CSVImport";
import { usePlanContext } from "../context/PlanContext";
import { Button, Col, Container, Row } from "react-bootstrap";

type MainViewProps = {
    setMode: (newMode: string) => void;
};

// button for switching to the PlanView
function PlanViewButton({
    setMode,
    setCurrentSemester,
    currentPlan
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (newSemester: Semester) => void;
    currentPlan: DegreePlan;
}): JSX.Element {
    return (
        <Button
            disabled={currentPlan.id === -1}
            data-testid="main-plan-button"
            onClick={() => {
                setCurrentSemester(invalidSemester);
                setMode("plan");
            }}
        >
            View Degree Plan
        </Button>
    );
}

/*
View for the main menu, showing a list of degree plans you can select OR choose
to make a new one
*/
export function MainView({ setMode }: MainViewProps): JSX.Element {
    const { currentPlan, setCurrentSemester } = usePlanContext();
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [showRemove, setShowRemove] = useState<boolean>(false);

    return (
        <div>
            <br></br>
            <h1>Degree Plan Selector</h1>
            <Container>
                <Row>
                    <Col xs={7}>
                        <DegreePlanList />
                    </Col>
                    <Col>
                        <br></br>
                        <div className="plan-view-section">
                            <p>
                                <b>Create a New Plan</b>
                            </p>
                            <AddPlanButton
                                showAdd={showAdd}
                                setShowAdd={setShowAdd}
                            ></AddPlanButton>
                            {showAdd && (
                                <AddPlanForm
                                    setShowAdd={setShowAdd}
                                ></AddPlanForm>
                            )}
                        </div>
                        <div className="plan-view-section-mid">
                            <p>
                                <b>Modify Selection ???</b>
                            </p>
                            <EditPlanButton
                                showRemove={showRemove}
                                setShowRemove={setShowRemove}
                            ></EditPlanButton>
                            {showRemove && (
                                <EditPlanForm
                                    setShowRemove={setShowRemove}
                                ></EditPlanForm>
                            )}
                        </div>
                        <div className="plan-view-section">
                            <p>
                                <b>Upload/Download Plans</b>
                            </p>
                            <CSVImport />
                            <CSVExport></CSVExport>
                        </div>
                    </Col>
                </Row>
                <PlanViewButton
                    setMode={setMode}
                    setCurrentSemester={setCurrentSemester}
                    currentPlan={currentPlan}
                />
            </Container>
        </div>
    );
}
