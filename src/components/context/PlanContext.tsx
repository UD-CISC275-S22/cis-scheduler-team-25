import { createContext, useContext } from "react";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import defaultPlans from "../../data/example_degree_plan.json";
import invalidSemester from "../../data/invalid_semester.json";
import { Course } from "../../interfaces/course";

const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
    (plan): DegreePlan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester): Semester => ({
                ...semester,
                courses: semester.courses.map(
                    (course): Course => ({
                        ...course,
                        preReqs: course.preReqs as string[][]
                    })
                )
            })
        )
    })
);

export type PlanContent = {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSem: Semester) => void;
};

export const PlanContext = createContext<PlanContent>({
    plans: DEFAULT_PLANS,
    setPlans: (newPlans: DegreePlan[]) => {
        console.log(newPlans);
    },
    currentPlan: DEFAULT_PLANS[0],
    setCurrentPlan: (newPlan: DegreePlan) => {
        console.log(newPlan);
    },
    currentSemester: invalidSemester,
    setCurrentSemester: (newSem: Semester) => {
        console.log(newSem);
    }
});

export const usePlanContext = () => useContext(PlanContext);
