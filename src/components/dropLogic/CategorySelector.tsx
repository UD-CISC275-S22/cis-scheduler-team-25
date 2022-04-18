import React, { useState } from "react";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";
import { Form } from "react-bootstrap";
import "../components.css";
import degreeCategoriesData from "../../exampleData/degree_categories.json";
import { courseList } from "../ReadJSON";
import { GroupRadioButtons } from "./GroupRadioButtons";

const degreeCategories = degreeCategoriesData as Record<string, string[]>;

// dropdown list generated from a list of DegreePlan objects passed in
// Updates the selected currentPlan when clicked
export function CategorySelector({
    category,
    setCategory,
    setCoursePool,
    currentSemester
}: {
    category: string;
    setCategory: (newCat: string) => void;
    setCoursePool: (newPool: Course[]) => void;
    currentSemester: Semester;
}): JSX.Element {
    const [grouping, setGrouping] = useState<string>("General");

    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value);
        setCoursePool(
            courseList.filter(
                (course: Course): boolean =>
                    course.degreeCategory.includes(event.target.value) &&
                    !currentSemester.courses
                        .map((currCourse: Course): string => currCourse.code)
                        .includes(course.code)
            )
        );
    }

    return (
        <div className="DegreePlanList">
            <p>Please select a category</p>
            <GroupRadioButtons
                grouping={grouping}
                currentSemester={currentSemester}
                setGrouping={setGrouping}
                setCategory={setCategory}
                setCoursePool={setCoursePool}
            />
            <Form.Group className="dropdown-border" controlId="planList">
                <Form.Select
                    data-testid="plan-list"
                    value={category}
                    onChange={updateSelection}
                >
                    {degreeCategories[grouping].map(
                        (catOption: string): JSX.Element => (
                            <option
                                key={catOption}
                                value={catOption}
                                data-testid={`category-option-${catOption}`}
                            >
                                {catOption}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <br></br>
        </div>
    );
}
