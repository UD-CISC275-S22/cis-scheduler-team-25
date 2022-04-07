import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { DegreePlanList } from "./components/DegreePlanList";
import "./App.css";
import Background from "./computerScienceBackGround.jpeg";

// default plans read in by degreeplans.json
const DEFAULT_PLANS: DegreePlan[] = defaultPlans.map(
    (plan): DegreePlan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester): Semester => ({
                ...semester
            })
        )
    })
);

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
            <header
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundPosition: "center"
                }}
                className="App-header"
            ></header>
            <h3
                style={{
                    border: "3px solid #00539F",
                    padding: "3px",
                    backgroundColor: "#FFD200"
                }}
            >
                UD-CIS-Scheduler{" "}
                <span
                    style={{
                        fontSize: "50px",
                        color: "gold",
                        backgroundColor: "#00539F"
                    }}
                >
                    BUT BETTER
                </span>
            </h3>
            <span style={{ fontSize: "17px" }}>Brennan 🇵🇭 Gallamoza </span>
            <div></div>
            <span style={{ fontSize: "17px" }}>Faizel 🇧🇩 Quabili </span>
            <div></div>
            <span style={{ fontSize: "17px" }}>Chad 🇨🇦 Haiges </span>
            <DegreePlanList
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
            />
        </div>
    );
}

export default App;
