import React from "react";
import { Course } from "../../interfaces/course";
import { Form } from "react-bootstrap";
import "../components.css";
import degreeCategoriesData from "../../exampleData/degree_categories.json";
import { courseList } from "../ReadJSON";
import { Semester } from "../../interfaces/semester";

type GroupRadioButtonsProps = {
    grouping: string;
    currentSemester: Semester;
    setGrouping: (newGroup: string) => void;
    setCategory: (newCategory: string) => void;
    setCoursePool: (newPool: Course[]) => void;
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;
const GROUPS = Object.keys(degreeCategoriesData);

export function GroupRadioButtons({
    grouping,
    currentSemester,
    setGrouping,
    setCategory,
    setCoursePool
}: GroupRadioButtonsProps): JSX.Element {
    function updateGrouping(event: React.ChangeEvent<HTMLInputElement>) {
        const newGrouping = event.target.value;
        const newCategory = degreeCategories[newGrouping][0];

        setGrouping(newGrouping);
        setCategory(newCategory);
        setCoursePool(
            courseList.filter(
                (course: Course): boolean =>
                    course.degreeCategory.includes(newCategory) &&
                    !currentSemester.courses
                        .map((currCourse: Course): string => currCourse.code)
                        .includes(course.code)
            )
        );
    }

    return (
        <div>
            <Form.Group>
                {GROUPS.map(
                    (group: string): JSX.Element => (
                        <Form.Check
                            inline
                            key={group}
                            type="radio"
                            name="response"
                            onChange={updateGrouping}
                            id={group}
                            label={group}
                            value={group}
                            checked={grouping === group}
                        />
                    )
                )}
            </Form.Group>
        </div>
    );
}
