import React from "react";
import { Course } from "../../interfaces/course";
import { usePlanContext } from "../context/PlanContext";
import { MainView } from "./MainView";
import { PlanView } from "./PlanView";
import { SemesterView } from "./SemesterView";

type CurrentViewProps = {
    mode: string;
    setMode: (newMode: string) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

/*
View helper for handling switching between the main menu, the planner for a
specific degree plan, and the view for editing a specific semester within a plan
*/
export function CurrentView({
    mode,
    setMode,
    courseList,
    setCourseList
}: CurrentViewProps): JSX.Element {
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();

    switch (mode) {
        case "plan":
            return (
                <PlanView
                    plans={plans}
                    setPlans={setPlans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    currentSemester={currentSemester}
                    setCurrentSemester={setCurrentSemester}
                    setMode={setMode}
                />
            );
        case "semester":
            return (
                <SemesterView
                    setPlans={setPlans}
                    plans={plans}
                    setMode={setMode}
                    setCurrentSemester={setCurrentSemester}
                    currentSemester={currentSemester}
                    setCurrentPlan={setCurrentPlan}
                    currentPlan={currentPlan}
                    courseList={courseList}
                    setCourseList={setCourseList}
                />
            );
        default:
            return <MainView setMode={setMode} />;
    }
}
