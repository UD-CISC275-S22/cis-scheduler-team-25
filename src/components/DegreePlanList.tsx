import React, { useState } from "react";
import "./components.css";
import { AddPlanForm } from "./InsertPlanForm";
import { AddPlanButton } from "./AddPlanButton";
import { DegreePlan } from "../interfaces/degreeplan";
import { Form } from "react-bootstrap";

export function DegreePlanList({
    plans,
    currentPlan,
    setCurrentPlan,
    setPlans
}: {
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setPlans: (newPlans: DegreePlan[]) => void;
}): JSX.Element {
    const [showAdd, setShowAdd] = useState<boolean>(false);
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
            <p>{currentPlan.length} Semesters Included</p>
            <br></br>
            <AddPlanButton
                showAdd={showAdd}
                setShowAdd={setShowAdd}
            ></AddPlanButton>
            {showAdd && (
                <AddPlanForm
                    plans={plans}
                    setPlans={setPlans}
                    setShowAdd={setShowAdd}
                ></AddPlanForm>
            )}
        </div>
    );
}
