import React from "react";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { MainView } from "./MainView";
import { PlanView } from "./PlanView";
import { SemesterView } from "./SemesterView";

type CurrentViewProps = {
    mode: string;
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
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
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    currentSemester,
    setCurrentSemester,
    courseList,
    setCourseList
}: CurrentViewProps): JSX.Element {
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
            return (
                <MainView
                    setPlans={setPlans}
                    setMode={setMode}
                    plans={plans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    setCurrentSemester={setCurrentSemester}
                />
            );
    }
}
