import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Form } from "react-bootstrap";
import "./components.css";
import { AddPlanForm } from "./InsertPlanForm";

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
function AddPlanButton({
    showAdd,
    setShowAdd
}: {
    showAdd: boolean;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                data-testid="add-plan-button"
                className="mode-button"
                onClick={() => setShowAdd(!showAdd)}
            >
                Add Plan
            </Button>
        </div>
    );
}
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
            <Form.Group
                style={{ border: "3px solid #00539F" }}
                controlId="planList"
            >
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
