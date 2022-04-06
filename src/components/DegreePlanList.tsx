import React from "react";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Form } from "react-bootstrap";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
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
        <div>
            <Form.Group controlId="planList">
                <Form.Select
                    data-testid="plan-list"
                    value={currentPlan.id}
                    onChange={updateSelection}
                >
                    {plans.map(
                        (plan: DegreePlan): JSX.Element => (
                            <option
                                key={plan.id}
                                value={plan.id}
                                data-testid={`quiz-option-${plan.id}`}
                            >
                                {plan.name}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p>{currentPlan.length} Questions</p>
            <br></br>
        </div>
    );
}
