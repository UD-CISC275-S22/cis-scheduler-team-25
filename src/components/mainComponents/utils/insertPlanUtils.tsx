import { DegreePlan } from "../../../interfaces/degreeplan";

// increments the maximum ID present by one
function getNextId(plans: DegreePlan[]): number {
    return Math.max(...plans.map((plan: DegreePlan): number => plan.id)) + 1;
}

function makeNewPlan(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    name: string,
    setCurrentPlan: (newPlan: DegreePlan) => void
): void {
    const valid = plans.every(
        (plan: DegreePlan): boolean => name !== plan.name
    );
    if (valid) {
        const newPlan = {
            id: getNextId(plans),
            name: name,
            semesters: [],
            length: 0,
            degree: {
                name: "Computer Science BS - Artificial Intelligence & Robotics Concentration",
                concentration:
                    "Artificial Intelligence & Robotics Concentration"
            }
        };

        const newPlans = [...plans, newPlan];
        if (plans.length === 0) {
            setCurrentPlan(newPlan);
        }
        setPlans(newPlans);
    }
}

export { makeNewPlan, getNextId };
