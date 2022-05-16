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
import invalidPlan from "./data/invalid_plan.json";

let loadedPlans: DegreePlan[];
const saveDataKey = "CIS-PLANNER-TEAM-25-DATA";
const previousData = localStorage.getItem(saveDataKey);
if (previousData !== null) {
    loadedPlans = JSON.parse(previousData);
} else {
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

    loadedPlans = DEFAULT_PLANS;
}

function App(): JSX.Element {
    const [plans, setPlans] = useState<DegreePlan[]>(loadedPlans);
    const [mode, setMode] = useState<string>("main");
    const [currentPlan, setCurrentPlan] = useState<DegreePlan>(
        loadedPlans.length > 0 ? loadedPlans[0] : invalidPlan
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
                <div className="App-subheader">
                    <HelpBar />
                </div>
                <div className="current-view">
                    <CurrentView
                        mode={mode}
                        setMode={setMode}
                        courseList={courseList}
                        setCourseList={setCourseList}
                    />

                    <div className="name-signatures">
                        ( ͡° ͜ʖ ͡°) Created by Brennan 🇵🇭 Gallamoza, Faizel 🇧🇩
                        Quabili, and Chad 🇨🇦 Haiges ( ͡° ͜ʖ ͡°)
                    </div>
                </div>
            </PlanContext.Provider>
        </div>
    );
}

export default App;
