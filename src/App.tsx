import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { DegreePlanList } from "./components/DegreePlanList";
import "./App.css";

// default plans read in by degreeplans.json
const DEFAULT_PLANS: DegreePlan[] = [
    { id: 0, name: "Test", semesters: [], length: 0 },
    { id: 1, name: "Test2", semesters: [], length: 1 }
];

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
