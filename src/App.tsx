import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { CurrentView } from "./components/CurrentView";
import defaultPlans from "./exampleData/example_degree_plan.json";
import "./App.css";
import Background from "./computerScienceBackGround.jpeg";
import { catalog } from "./components/ReadJSON";
import { Course } from "./interfaces/course";

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
    const [mode, setMode] = useState<string>("main");
    const [currentPlan, setCurrentPlan] = useState<DegreePlan>(
        DEFAULT_PLANS[0]
    );
    const [currentSemester, setCurrentSemester] = useState<Semester>({
        courses: [],
        season: "INVALID",
        year: -1
    });
    const [courses, setCourses] =
        useState<Record<string, Record<string, Course>>>(catalog);

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
                    BUT BETTER ( ͡° ͜ʖ ͡°)
                </span>
            </h3>
            <span style={{ fontSize: "17px" }}>Brennan 🇵🇭 Gallamoza </span>
            <div></div>
            <span style={{ fontSize: "17px" }}>Faizel 🇧🇩 Quabili </span>
            <div></div>
            <span style={{ fontSize: "17px" }}>Chad 🇨🇦 Haiges </span>
            <div>
                Welcome to the UD CIS Course Scheduler. <br></br>Create and edit
                degree plans following courses and requirements.
            </div>
            <CurrentView
                mode={mode}
                setMode={setMode}
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                currentSemester={currentSemester}
                setCurrentSemester={setCurrentSemester}
            />
        </div>
    );
}

export default App;
