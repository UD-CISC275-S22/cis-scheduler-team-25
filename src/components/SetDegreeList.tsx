import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { categories } from "./ReadJSON";

const CONCENTRATIONS = categories.filter(
    (category: string): boolean => category !== "General"
);

export function SetDegreeList({
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
    const [concentration, setConcentration] = useState<string>(
        "Artificial Intelligence & Robotics Concentration"
    );

    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const newConcentration = event.target.value;

        const newPlan = {
            ...currentPlan,
            degree: {
                name: "Computer Science BS - " + newConcentration,
                concentration: newConcentration
            }
        };

        const newPlans = plans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === currentPlan.id ? newPlan : plan
        );

        setConcentration(newConcentration);
        setCurrentPlan(newPlan);
        setPlans(newPlans);
    }

    return (
        <div className="DegreePlanList">
            <p>Please choose a Degree Concentration:</p>
            <Form.Group
                className="dropdown-border"
                controlId="concentrationList"
            >
                <Form.Select
                    htmlSize={5}
                    data-testid="concentration-list"
                    value={concentration}
                    onChange={updateSelection}
                >
                    {CONCENTRATIONS.map(
                        (concOption: string): JSX.Element => (
                            <option
                                key={concOption}
                                value={concOption}
                                data-testid={`degree-option-${concOption}`}
                            >
                                {concOption}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
