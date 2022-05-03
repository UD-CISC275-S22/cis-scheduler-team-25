import React from "react";
import "../components.css";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Form } from "react-bootstrap";

export function DegreePlanList({
    plans,
    currentPlan,
    setCurrentPlan
}: {
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
}): JSX.Element {
    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(event.target.value);
        setCurrentPlan(plans[id]);
    }

    return (
        <div className="DegreePlanList">
            <p>Please choose a Degree Plan:</p>
            <Form.Group className="dropdown-border" controlId="planList">
                <Form.Select
                    htmlSize={5}
                    data-testid="plan-list"
                    value={currentPlan.id}
                    onChange={updateSelection}
                >
                    {plans.map(
                        (plan: DegreePlan): JSX.Element => (
                            <option
                                key={plan.id}
                                value={plan.id}
                                data-testid={`plan-option-${plan.id}`}
                            >
                                {plan.name}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p>{currentPlan.semesters.length} Semesters Included</p>
            <br></br>
        </div>
    );
}
