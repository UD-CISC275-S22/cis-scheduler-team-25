import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { usePlanContext } from "../context/PlanContext";
import { categories } from "../ReadJSON";

// concentrations are all category_courses.json keys except
// for the "General" categories
const CONCENTRATIONS = categories.filter(
    (category: string): boolean =>
        category !== "General" && category !== "Custom Category"
);

/*
Dropdown select in the PlanView for selecting what degree concentration
a DegreePlan is using. This directly affects what courses are displayed
in the coursePool in the Course Drag/Drop, and what requirements are
met in the ProgressList
*/
export function SetDegreeList(): JSX.Element {
    const { plans, setPlans, currentPlan, setCurrentPlan } = usePlanContext();
    const [concentration, setConcentration] = useState<string>(
        currentPlan.degree.concentration
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
        <div
            className="SetDegreeList"
            style={{ paddingBottom: "calc(10px + 2vmin)" }}
        >
            <Form.Group
                className="dropdown-border"
                controlId="concentrationList"
            >
                <Form.Select
                    data-testid="concentration-list"
                    value={concentration}
                    onChange={updateSelection}
                >
                    {CONCENTRATIONS.map(
                        (concOption: string): JSX.Element => (
                            <option
                                key={concOption}
                                value={concOption}
                                data-testid={`conc-option-${concOption}`}
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
