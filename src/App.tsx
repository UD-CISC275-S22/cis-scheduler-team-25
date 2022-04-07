import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { Section } from "./interfaces/section";
import { DegreePlanList } from "./components/DegreePlanList";
import defaultPlans from "./exampleData/example_degree_plan.json";
import "./App.css";

// default plans read in by degreeplans.json
const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
    (plan): DegreePlan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester): Semester => ({
                ...semester,
                courses: semester.courses.map(
                    (course): Course => ({
                        ...course,
                        sections: course.sections.map(
                            (section): Section => ({ ...section })
                        )
                    })
                )
            })
        )
    })
);

// const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
//     (plan): DegreePlan => ({
//         ...plan,
//         semesters: plan.semesters.map()
//     })

function App(): JSX.Element {
    const [
        plans
        // setPlans
    ] = useState<DegreePlan[]>(DEFAULT_PLANS);
    const [currentPlan, setCurrentPlan] = useState<DegreePlan>(
        DEFAULT_PLANS[0]
    );

    return (
        <div className="App">
            <header className="App-header">UD-CIS-Scheduler</header>
            <p>Initial Webpage by:</p>
            <p>Brennan Gallamoza</p>
            <p>Faizel Quabili</p>
            <p>Chad Haiges</p>
            <DegreePlanList
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
            />
        </div>
    );
}

export default App;
