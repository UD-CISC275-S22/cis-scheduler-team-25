import React from "react";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";
import { Form } from "react-bootstrap";
import "../components.css";
import degreeCategoriesData from "../../exampleData/degree_categories.json";
import { CategoryRadioButtons } from "./CategoryRadioButtons";
import { DegreePlan } from "../../interfaces/degreeplan";

type RequirementSelectorProps = {
    category: string;
    setCategory: (newCat: string) => void;
    currentPlan: DegreePlan;
    requirement: string;
    setRequirement: (newReq: string) => void;
    setCoursePool: (newPool: Course[]) => void;
    currentSemester: Semester;
    courseList: Course[];
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function RequirementSelector({
    category,
    setCategory,
    currentPlan,
    requirement,
    setRequirement,
    setCoursePool,
    currentSemester,
    courseList
}: RequirementSelectorProps): JSX.Element {
    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const requirementOption = event.target.value;
        const requirementFilter = category + "-";

        setRequirement(requirementOption);
        setCoursePool(
            courseList.filter(
                (course: Course): boolean =>
                    course.degreeRequirement.includes(
                        requirementFilter + requirementOption
                    ) &&
                    !currentSemester.courses
                        .map((currCourse: Course): string => currCourse.code)
                        .includes(course.code)
            )
        );
    }

    return (
        <div className="DegreePlanList">
            <p>Please select a requirement</p>
            <CategoryRadioButtons
                currentPlan={currentPlan}
                category={category}
                currentSemester={currentSemester}
                setCategory={setCategory}
                setRequirement={setRequirement}
                setCoursePool={setCoursePool}
                courseList={courseList}
            />
            <Form.Group className="dropdown-border" controlId="planList">
                <Form.Select
                    data-testid="requirement-list"
                    value={requirement}
                    onChange={updateSelection}
                >
                    {degreeCategories[category].map(
                        (reqOption: string): JSX.Element => (
                            <option
                                key={reqOption}
                                value={reqOption}
                                data-testid={`requirement-option-${reqOption}`}
                            >
                                {reqOption}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <br></br>
        </div>
    );
}
