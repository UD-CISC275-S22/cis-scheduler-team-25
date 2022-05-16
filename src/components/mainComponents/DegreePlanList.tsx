import React from "react";
import "../components.css";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Form } from "react-bootstrap";
import INVALID_PLAN from "../../data/invalid_plan.json";
import { usePlanContext } from "../context/PlanContext";

export function DegreePlanList(): JSX.Element {
    const { plans, currentPlan, setCurrentPlan } = usePlanContext();

    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(event.target.value);

        // don't update if id is invalid
        if (isNaN(id) || id === -1) {
            return;
        }

        // get plan from plans using id
        const selectedPlan = plans.find(
            (plan: DegreePlan): boolean => plan.id === id
        );

        // set currentPlan to selectedPlan... INVALID_PLAN if can't be found
        setCurrentPlan(
            selectedPlan !== undefined ? selectedPlan : { ...INVALID_PLAN }
        );
    }

    return (
        <div className="DegreePlanList">
            <p>
                <b>Please choose a Degree Plan:</b>
            </p>
            <Form.Group className="dropdown-border" controlId="planList">
                <Form.Select
                    htmlSize={15}
                    data-testid="plan-list"
                    value={currentPlan !== undefined ? currentPlan.id : -1}
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
            <br></br>
            <p>
                {plans.length === 0
                    ? "There are currently no existing plans"
                    : currentPlan.semesters.length.toString() +
                      " Semesters Included"}
            </p>
            <br></br>
        </div>
    );
}
