import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import "./components.css";

//filters through plans and removes the current plan selected and updates setPlan
function removePlanByName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan,
    setCurrentPlan: (currentPlan: DegreePlan) => void
): void {
    const updatedPlans = plans.filter(
        (currPlan: DegreePlan): boolean => currPlan.id !== currentPlan.id
    );
    setPlans(updatedPlans);
    setCurrentPlan(plans[0]);
}

//iterates through plans and updates the current selected plans name
function editPlanName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan,
    newName: string,
    setCurrentPlan: (currentPlan: DegreePlan) => void
): void {
    const updatedPlans = plans.map((currPlan: DegreePlan) =>
        currPlan.id === currentPlan.id
            ? { ...currPlan, name: newName, semesters: [...currPlan.semesters] }
            : currPlan
    );
    setPlans(updatedPlans);
    setCurrentPlan(plans[0]);
}

//remove plan button, calls removePlanByName function
function RemovePlanButton({
    plans,
    setPlans,
    currentPlan,
    setShowRemove,
    setCurrentPlan
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setShowRemove: (value: boolean) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
}): JSX.Element {
    return (
        <Button
            data-testid="remove-plan-by-name-button"
            onClick={() => {
                removePlanByName(plans, setPlans, currentPlan, setCurrentPlan);
                setShowRemove(false);
            }}
        >
            Remove Plan
        </Button>
    );
}

//calls editPlanName function
function EditPlanNameButton({
    plans,
    setPlans,
    currentPlan,
    setShowRemove,
    newName,
    setCurrentPlan
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setShowRemove: (value: boolean) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
    newName: string;
}): JSX.Element {
    return (
        <Button
            data-testid="edit-plan-by-name-button"
            onClick={() => {
                editPlanName(
                    plans,
                    setPlans,
                    currentPlan,
                    newName,
                    setCurrentPlan
                );
                setShowRemove(false);
            }}
        >
            Confirm Edit Name
        </Button>
    );
}

//name state to pass through to edit name
export function EditRemovePlanForm({
    plans,
    setPlans,
    setShowRemove,
    currentPlan,
    setCurrentPlan
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setShowRemove: (value: boolean) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
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
                setCurrentPlan={setCurrentPlan}
            ></EditPlanNameButton>
            <RemovePlanButton
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                setShowRemove={setShowRemove}
                setCurrentPlan={setCurrentPlan}
            ></RemovePlanButton>
        </div>
    );
}
