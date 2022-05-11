import React, { useState } from "react";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { CurrentView } from "./components/views/CurrentView";
import defaultPlans from "./data/example_degree_plan.json";
import invalidSemester from "./data/invalid_semester.json";
import "./App.css";
import logo from "./ud-logo.png";
import { Course } from "./interfaces/course";
import { defaultCourseList } from "./components/ReadJSON";
import { HelpBar } from "./components/navBar/HelpBar";
import { PlanContext } from "./components/context/PlanContext";

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
            <div className="App-subheader">
                <HelpBar />
            </div>
            <div className="current-view">
                <PlanContext.Provider
                    value={{
                        plans,
                        setPlans,
                        currentPlan,
                        setCurrentPlan,
                        currentSemester,
                        setCurrentSemester
                    }}
                >
                    <CurrentView
                        mode={mode}
                        setMode={setMode}
                        courseList={courseList}
                        setCourseList={setCourseList}
                    />
                </PlanContext.Provider>

                <div className="name-signatures">
                    ( ͡° ͜ʖ ͡°) Created by Brennan 🇵🇭 Gallamoza, Faizel 🇧🇩 Quabili,
                    and Chad 🇨🇦 Haiges ( ͡° ͜ʖ ͡°)
                </div>
            </div>
        </div>
    );
}

export default App;
