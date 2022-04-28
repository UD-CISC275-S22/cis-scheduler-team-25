import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { CurrentView } from "./components/views/CurrentView";
import defaultPlans from "./exampleData/example_degree_plan.json";
import invalidSemester from "./exampleData/invalid_semester.json";
import "./App.css";
import logo from "./ud-logo.png";
import { Course } from "./interfaces/course";
import { defaultCourseList } from "./components/ReadJSON";

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
                        preReqs: course.preReqs as string[][]
                    })
                )
            })
        )
    })
);

function App(): JSX.Element {
    const [plans, setPlans] = useState<DegreePlan[]>(DEFAULT_PLANS);
    const [mode, setMode] = useState<string>("main");
    const [currentPlan, setCurrentPlan] = useState<DegreePlan>(
        DEFAULT_PLANS[0]
    );
    const [currentSemester, setCurrentSemester] =
        useState<Semester>(invalidSemester);
    const [courseList, setCourseList] = useState<Course[]>(defaultCourseList);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-header-title">
                    <p>COMPUTER &</p>
                    <p>INFORMATION SCIENCES</p>
                </div>
                <div className="App-header-subtitle">
                    <img src={logo}></img>
                </div>
            </header>
            <h3 className="App-subheader">
                <strong>UD-CIS-Scheduler</strong>{" "}
            </h3>
            <div>
                Welcome to the UD CIS Course Scheduler. <br></br>Create and edit
                degree plans following courses and requirements.
            </div>
            <div>
                <CurrentView
                    mode={mode}
                    setMode={setMode}
                    plans={plans}
                    setPlans={setPlans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    currentSemester={currentSemester}
                    setCurrentSemester={setCurrentSemester}
                    courseList={courseList}
                    setCourseList={setCourseList}
                />
            </div>
            <div className="name-signatures">
                ( ͡° ͜ʖ ͡°) Created by Brennan 🇵🇭 Gallamoza, Faizel 🇧🇩 Quabili, and
                Chad 🇨🇦 Haiges ( ͡° ͜ʖ ͡°)
            </div>
        </div>
    );
}

export default App;
