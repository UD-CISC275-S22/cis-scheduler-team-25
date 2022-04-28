import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";

type RemoveAllCoursesButtonProps = {
    setCurrentSemester: (currentSemester: Semester) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
    setPlans: (plans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    plans: DegreePlan[];
    currentSemester: Semester;
    courseList: Course[];
    setCoursePool: (newPool: Course[]) => void;
    requirement: string;
    category: string;
};

export function RemoveAllCoursesButton({
    setCurrentSemester,
    setCurrentPlan,
    setPlans,
    currentPlan,
    plans,
    currentSemester,
    courseList,
    setCoursePool,
    requirement,
    category
}: RemoveAllCoursesButtonProps): JSX.Element {
    return (
        <Button
            data-testid="remove-all-courses-from-semester"
            className="mode-button"
            onClick={() => {
                const newSemester = { ...currentSemester, courses: [] };
                const updateSemesters = currentPlan.semesters.map(
                    (checkSemester: Semester): Semester =>
                        checkSemester.id === newSemester.id
                            ? newSemester
                            : checkSemester
                );
                const newDegreePlan = {
                    ...currentPlan,
                    semesters: updateSemesters
                };

                const newPlans = plans.map(
                    (plan: DegreePlan): DegreePlan =>
                        plan.id === currentPlan.id ? newDegreePlan : plan
                );
                setCurrentSemester(newSemester);
                setCurrentPlan(newDegreePlan);
                setPlans(newPlans);
                setCoursePool(
                    courseList.filter(
                        (course: Course): boolean =>
                            !newSemester.courses
                                .map(
                                    (currCourse: Course): string =>
                                        currCourse.code
                                )
                                .includes(course.code) &&
                            course.degreeRequirement.includes(
                                category + "-" + requirement
                            )
                    )
                );
            }}
        >
            Remove All Courses
        </Button>
    );
}
