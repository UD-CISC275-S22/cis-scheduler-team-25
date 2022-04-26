import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import "./components.css";

function removePlanByName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan
    // setCurrentPlan: (currentPlan: DegreePlan) => void
): void {
    const updatedPlans = plans.filter(
        (currPlan: DegreePlan): boolean => currPlan.id === currentPlan.id
    );
    setPlans(updatedPlans);
    // setCurrentPlan();
}

function editPlanName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan,
    newName: string
): void {
    const updatedPlans = plans.map((currPlan: DegreePlan) =>
        currPlan.name === currentPlan.name
            ? { ...currPlan, name: newName, semesters: [...currPlan.semesters] }
            : currPlan
    );
    setPlans(updatedPlans);
}

export function RemovePlanButton({
    plans,
    setPlans,
    currentPlan,
    setShowRemove
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setShowRemove: (value: boolean) => void;
}): JSX.Element {
    return (
        <Button
            data-testid="remove-plan-by-name-button"
            onClick={() => {
                removePlanByName(plans, setPlans, currentPlan);
                setShowRemove(false);
            }}
        >
            Remove Plan
        </Button>
    );
}

function EditPlanNameButton({
    plans,
    setPlans,
    currentPlan,
    setShowRemove,
    newName
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setShowRemove: (value: boolean) => void;
    newName: string;
}): JSX.Element {
    return (
        <Button
            data-testid="edit-plan-by-name-button"
            onClick={() => {
                editPlanName(plans, setPlans, currentPlan, newName);
                setShowRemove(false);
            }}
        >
            Edit Plan Name
        </Button>
    );
}

export function EditRemovePlanForm({
    plans,
    setPlans,
    setShowRemove,
    currentPlan
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setShowRemove: (value: boolean) => void;
    currentPlan: DegreePlan;
}): JSX.Element {
    const [newName, setNewName] = useState<string>("");
    return (
        <div className="edit-plan-form">
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            data-testid="edit-plan-name"
                            placeholder="Edit Plan Name"
                            value={newName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setNewName(event.target.value)}
                        ></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <EditPlanNameButton
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                setShowRemove={setShowRemove}
                newName={newName}
            ></EditPlanNameButton>
            <RemovePlanButton
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                setShowRemove={setShowRemove}
            ></RemovePlanButton>
        </div>
    );
}
