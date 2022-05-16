import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { usePlanContext } from "../context/PlanContext";

// planview button to remove all existing semesters
export function RemoveAllSemestersButton(): JSX.Element {
    const { plans, setPlans, currentPlan, setCurrentPlan } = usePlanContext();
    return (
<<<<<<< HEAD
        <div>
            <Button
                data-testid="remove-all-semesters-button"
                className="mode-button"
                onClick={() => {
                    // create DegreePlan based on currentPlan, but with empty semesters
                    const clearedPlan = {
                        ...currentPlan,
                        semesters: [],
                        length: 0
                    };
                    // modify plans array so that the DegreePlan matching the
                    // current plan is switched with clearedPlan
                    const newPlans = plans.map(
                        (currPlan: DegreePlan): DegreePlan =>
                            currentPlan.id === currPlan.id
                                ? clearedPlan
                                : currPlan
                    );
                    // set plans to newPlans, and make currentPlan the new clearedPlan
                    setPlans(newPlans);
                    setCurrentPlan(clearedPlan);
                }}
            >
                Remove All Semesters ⌫
            </Button>
        </div>
=======
        <Button
            data-testid="remove-all-semesters-button"
            variant="danger"
            className="mode-button"
            onClick={() => {
                // create DegreePlan based on currentPlan, but with empty semesters
                const clearedPlan = {
                    ...currentPlan,
                    semesters: [],
                    length: 0
                };
                // modify plans array so that the DegreePlan matching the
                // current plan is switched with clearedPlan
                const newPlans = plans.map(
                    (currPlan: DegreePlan): DegreePlan =>
                        currentPlan.id === currPlan.id ? clearedPlan : currPlan
                );
                // set plans to newPlans, and make currentPlan the new clearedPlan
                setPlans(newPlans);
                setCurrentPlan(clearedPlan);
            }}
        >
            Remove All Semesters
        </Button>
>>>>>>> 57e70213fe14fca2b2cced41f8f26b4e140aa11f
    );
}
