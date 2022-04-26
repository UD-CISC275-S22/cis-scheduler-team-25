import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { verticalDrag } from "react-beautiful-dnd-tester";

describe("CourseDragDrop Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("Expect two droppable areas to exist", () => {
        screen.getByTestId("droppable-semesterPool");
        screen.getByTestId("droppable-coursePool");
    });
    test("Expect default semesterCourses and coursePoolCourses to appear", () => {
        const semesterPool = screen.getByTestId("droppable-semesterPool");
        const coursePool = screen.getByTestId("droppable-coursePool");

        // Semester should have CISC 108 and MATH 241
        expect(
            within(semesterPool).queryAllByTestId(/draggable-/i)
        ).toHaveLength(2);

        // coursePool should have CISC Core, with:
        // CISC 181/210/220/260/275/303/320 and MATH 210
        expect(within(coursePool).queryAllByTestId(/draggable-/i)).toHaveLength(
            8
        );
    });
    test("Test that dragging semester courses will reorder them", () => {
        const select = screen.getByTestId("requirement-list");
        const semesterPool = screen.getByTestId("droppable-semesterPool");

        userEvent.selectOptions(select, "Lab Requirements");
        const CISC108 = screen.getByTestId("draggable-CISC 108");
        const MATH241 = screen.getByTestId("draggable-MATH 241");

        verticalDrag(MATH241).inFrontOf(CISC108);
        const semesterCourses =
            within(semesterPool).queryAllByTestId(/draggable-/i);

        expect(semesterCourses[0]).toHaveTextContent("MATH 241");
    });
    test("Test that dragging coursePool courses will NOT reorder them", () => {
        const coursePool = screen.getByTestId("droppable-coursePool");

        const CISC181 = screen.getByTestId("draggable-CISC 181");
        const CISC210 = screen.getByTestId("draggable-CISC 210");

        const coursePoolCourses1 =
            within(coursePool).queryAllByTestId(/draggable-/i);

        expect(coursePoolCourses1[0]).toHaveTextContent("CISC 181");

        verticalDrag(CISC210).inFrontOf(CISC181);

        // expect the drag to not do anything
        const coursePoolCourses2 =
            within(coursePool).queryAllByTestId(/draggable-/i);

        expect(coursePoolCourses2[0]).toHaveTextContent("CISC 181");
    });
});
