import { createContext, useContext } from "react";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import invalidSemester from "../../data/invalid_semester.json";
import invalidPlan from "../../data/invalid_plan.json";

export type PlanContent = {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSem: Semester) => void;
};

export const PlanContext = createContext<PlanContent>({
    plans: [],
    setPlans: (newPlans: DegreePlan[]) => {
        console.log(newPlans);
    },
    currentPlan: invalidPlan,
    setCurrentPlan: (newPlan: DegreePlan) => {
        console.log(newPlan);
    },
    currentSemester: invalidSemester,
    setCurrentSemester: (newSem: Semester) => {
        console.log(newSem);
    }
});

export const usePlanContext = () => useContext(PlanContext);
