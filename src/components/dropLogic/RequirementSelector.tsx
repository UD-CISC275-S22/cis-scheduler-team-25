import React from "react";
import { Course } from "../../interfaces/course";
import { Form } from "react-bootstrap";
import "../components.css";
import degreeCategoriesData from "../../data/degree_categories.json";
import { CategoryRadioButtons } from "./CategoryRadioButtons";
import { getUnusedCourses } from "./utils/dragUtils";
import { usePlanContext } from "../context/PlanContext";

type RequirementSelectorProps = {
    category: string;
    setCategory: (newCat: string) => void;
    requirement: string;
    setRequirement: (newReq: string) => void;
    setCoursePool: (newPool: Course[]) => void;
    courseList: Course[];
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function RequirementSelector({
    category,
    setCategory,
    requirement,
    setRequirement,
    setCoursePool,
    courseList
}: RequirementSelectorProps): JSX.Element {
    const { currentPlan, currentSemester } = usePlanContext();

    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const requirementOption = event.target.value;
        const requirementFilter = category + "-";

        setRequirement(requirementOption);
        setCoursePool(
            getUnusedCourses(
                currentPlan,
                currentSemester,
                courseList,
                requirementFilter + requirementOption
            )
        );
    }

    return (
        <div className="DegreePlanList">
            <p>Please select a requirement</p>
            <CategoryRadioButtons
                category={category}
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
