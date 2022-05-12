import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import "../components.css";
import { usePlanContext } from "../context/PlanContext";
import { makeNewPlan } from "./utils/insertPlanUtils";

function ConfirmNewPlan({
    plans,
    setPlans,
    name,
    setShowAdd,
    setCurrentPlan
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    name: string;
    setShowAdd: (value: boolean) => void;
    setCurrentPlan: (newPlan: DegreePlan) => void;
}): JSX.Element {
    const valid = plans.every(
        (plan: DegreePlan): boolean => name !== plan.name && name !== ""
    );
    return (
        <Button
            disabled={!valid}
            data-testid="insert-plan-confirm-button"
            variant="success"
            onClick={() => {
                makeNewPlan(plans, setPlans, name, setCurrentPlan);
                setShowAdd(false);
            }}
        >
            Confirm
        </Button>
    );
}
export function AddPlanForm({
    setShowAdd
}: {
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    const { plans, setPlans, setCurrentPlan } = usePlanContext();
    const [name, setName] = useState<string>("");
    return (
        <div className="plan-form">
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            data-testid="insert-plan-add-name"
                            placeholder="Add Plan Name"
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setName(event.target.value)}
                        ></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <ConfirmNewPlan
                setShowAdd={setShowAdd}
                plans={plans}
                setPlans={setPlans}
                name={name}
                setCurrentPlan={setCurrentPlan}
            ></ConfirmNewPlan>
        </div>
    );
}
