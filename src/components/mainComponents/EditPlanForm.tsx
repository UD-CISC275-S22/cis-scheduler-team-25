import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import INVALID_PLAN from "../../data/invalid_plan.json";
import "../components.css";
import { usePlanContext } from "../context/PlanContext";

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
    if (updatedPlans.length === 0) {
        setCurrentPlan({ ...INVALID_PLAN });
    } else {
        setCurrentPlan(updatedPlans[0]);
    }
}

//iterates through plans and updates the current selected plans name
function editPlanName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan,
    newName: string,
    setCurrentPlan: (currentPlan: DegreePlan) => void
): void {
    // create new plan based on new name
    const updatedPlan = { ...currentPlan, name: newName };

    // create new plan array with updated plan
    const newPlans = plans.map((currPlan: DegreePlan) =>
        currPlan.id === currentPlan.id ? updatedPlan : currPlan
    );

    // update states
    setCurrentPlan(updatedPlan);
    setPlans(newPlans);
}

//remove plan button, calls removePlanByName function
function RemovePlanButton({
    setShowRemove
}: {
    setShowRemove: (value: boolean) => void;
}): JSX.Element {
    const { plans, setPlans, currentPlan, setCurrentPlan } = usePlanContext();

    return (
        <Button
            variant="danger"
            data-testid="remove-plan-by-name-button"
            onClick={() => {
                removePlanByName(plans, setPlans, currentPlan, setCurrentPlan);
                setShowRemove(false);
            }}
        >
            Remove Plan ⌫
        </Button>
    );
}

//calls editPlanName function
function EditPlanNameButton({
    setShowRemove,
    newName
}: {
    setShowRemove: (value: boolean) => void;
    newName: string;
}): JSX.Element {
    const { plans, setPlans, currentPlan, setCurrentPlan } = usePlanContext();

    return (
        <Button
            data-testid="edit-plan-by-name-button"
            variant="success"
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
            Confirm Edit Name ↵
        </Button>
    );
}

//name state to pass through to edit name
export function EditPlanForm({
    setShowRemove
}: {
    setShowRemove: (value: boolean) => void;
}): JSX.Element {
    const [newName, setNewName] = useState<string>("");
    return (
        <div className="plan-form">
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            data-testid="edit-plan-name-text"
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
                setShowRemove={setShowRemove}
                newName={newName}
            ></EditPlanNameButton>
            <RemovePlanButton setShowRemove={setShowRemove}></RemovePlanButton>
        </div>
    );
}
