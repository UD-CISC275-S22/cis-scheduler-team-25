import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import invalidSemester from "../../data/invalid_semester.json";
import "../components.css";
import { usePlanContext } from "../context/PlanContext";

// planView button to remove the currently selected semester
export function RemoveCurrentSemestersButton(): JSX.Element {
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();

    return (
        <Button
            disabled={currentSemester.id === -1}
            data-testid="remove-current-semester-button"
            variant="danger"
            className="mode-button"
            onClick={() => {
                // create DegreePlan based on currentPlan, but with empty semesters
                const rmvSemesterPlan = {
                    ...currentPlan,
                    semesters: currentPlan.semesters.filter(
                        (semester: Semester): boolean =>
                            semester.id !== currentSemester.id
                    ),
                    length: 0
                };
                // modify plans array so that the DegreePlan matching the
                // current plan is switched with clearedPlan
                const newPlans = plans.map(
                    (currPlan: DegreePlan): DegreePlan =>
                        currentPlan.id === currPlan.id
                            ? rmvSemesterPlan
                            : currPlan
                );
                // set plans to newPlans, and make currentPlan the new clearedPlan
                setPlans(newPlans);
                setCurrentPlan(rmvSemesterPlan);
                setCurrentSemester(invalidSemester);
            }}
        >
            {currentSemester.id !== -1
                ? "Delete " +
                  currentSemester.season +
                  "-" +
<<<<<<< HEAD
                  currentSemester.year.toString() +
                  " ⌫"
                : "Pick a Semester!"}
=======
                  currentSemester.year.toString()
                : "Delete Semester"}
>>>>>>> 57e70213fe14fca2b2cced41f8f26b4e140aa11f
        </Button>
    );
}
