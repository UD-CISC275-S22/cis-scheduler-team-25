import React from "react";
import { Course } from "../../interfaces/course";
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
    switch (mode) {
        case "plan":
            return <PlanView setMode={setMode} />;
        case "semester":
            return (
                <SemesterView
                    setMode={setMode}
                    courseList={courseList}
                    setCourseList={setCourseList}
                />
            );
        default:
            return <MainView setMode={setMode} />;
    }
}
