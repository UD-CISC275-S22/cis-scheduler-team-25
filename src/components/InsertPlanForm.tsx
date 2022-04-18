import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import "./components.css";
import defaultPlans from "../exampleData/example_degree_plan.json";

const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
    (plan): DegreePlan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester): Semester => ({
                ...semester
            })
        )
    })
);

function makeNewPlan(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    name: string
): void {
    const valid = plans.every(
        (plan: DegreePlan): boolean => name !== plan.name
    );
    if (valid) {
        const newPlan = {
            id: plans.length,
            name: name,
            semesters: [],
            length: 0
        };

        const newPlans = { ...plans, newPlan };
        setPlans(newPlans);
    }
}

function ConfirmNewPlan({
    plans,
    setPlans,
    name,
    setShowAdd
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    name: string;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    const valid = plans.every(
        (plan: DegreePlan): boolean => name !== plan.name
    );
    return (
        <Button
            disabled={!valid}
            data-testid="insert-plan-confirm-button"
            onClick={() => {
                makeNewPlan(plans, setPlans, name);
                setShowAdd(false);
            }}
        >
            Confirm
        </Button>
    );
}
export function AddPlanForm({
    plans,
    setPlans,
    setShowAdd
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    const [name, setName] = useState<string>("");
    return (
        <div className="add-plan-form">
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
                plans={plans}
                setPlans={setPlans}
                name={name}
                setShowAdd={setShowAdd}
            ></ConfirmNewPlan>
        </div>
    );
}
