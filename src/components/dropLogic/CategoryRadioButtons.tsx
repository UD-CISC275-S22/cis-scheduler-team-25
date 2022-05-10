import React from "react";
import { Course } from "../../interfaces/course";
import { Form } from "react-bootstrap";
import "../components.css";
import degreeCategoriesData from "../../data/degree_categories.json";
import { getUnusedCourses } from "./utils/dragUtils";
import { usePlanContext } from "../context/PlanContext";

type GroupRadioButtonsProps = {
    category: string;
    setRequirement: (newGroup: string) => void;
    setCategory: (newCategory: string) => void;
    setCoursePool: (newPool: Course[]) => void;
    courseList: Course[];
};

// read in degreeCategories JSON, where keys are groupings of degreeCategories
// and the values are the degreeCategories associated with that category
const degreeCategories = degreeCategoriesData as Record<string, string[]>;

/*
Component for radio buttons for selecting a "grouping" of degreeCategories,
being "General" and "Concentration" requirements. This make the dropdown
for selecting a degreeCategory be from a specific subset for more easily
choosing what courses you want the coursePool to show
*/
export function CategoryRadioButtons({
    category,
    setRequirement,
    setCategory,
    setCoursePool,
    courseList
}: GroupRadioButtonsProps): JSX.Element {
    const { currentPlan, currentSemester } = usePlanContext();
    const CATEGORIES = [
        "General",
        currentPlan.degree.concentration,
        "Custom Category"
    ];

    function updateCategory(event: React.ChangeEvent<HTMLInputElement>) {
        const newCategory = event.target.value;
        const newRequirement = degreeCategories[newCategory][0];

        setCategory(newCategory);
        setRequirement(newRequirement);
        setCoursePool(
            getUnusedCourses(
                currentPlan,
                currentSemester,
                courseList,
                newCategory + "-" + newRequirement
            )
        );
    }

    return (
        <div>
            <Form.Group>
                {CATEGORIES.map(
                    (catOption: string): JSX.Element => (
                        <Form.Check
                            inline
                            data-testid={"radio-" + catOption}
                            key={catOption}
                            type="radio"
                            name={"radio-" + catOption}
                            onChange={updateCategory}
                            id={catOption}
                            label={catOption}
                            value={catOption}
                            checked={category === catOption}
                        />
                    )
                )}
            </Form.Group>
        </div>
    );
}
