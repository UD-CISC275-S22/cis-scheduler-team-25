import React from "react";
import { Modal } from "react-bootstrap";

export function HelpSemesterView() {
    return (
        <Modal.Body>
            {" "}
            When a semester is selected and viewed, you will be brought to a
            Course Drag and Drop for your selected semester. Here, you will see
            two blue droppable areas that courses can be dragged in/out of
            (referred to as <i>Droppables</i>). The leftmost Droppable (the{" "}
            <b>&quot;Semester Pool&quot;</b>) represents the courses in your
            selected semester. The rightmost Droppable (the{" "}
            <b>&quot;Course Pool&quot;</b>) is a pool of courses that can
            contribute to finishing your degree and concentration.
            <br></br>
            <br></br>
            <p>
                <strong>Dragging Courses Between Droppables</strong>
            </p>
            Courses are represented by draggable &quot;cards&quot; containing a
            course code and name. Drag course cards from the Course Pool to your
            Semester Pool to add it to your currently selected semester. You can
            also rearrange the courses that are currently within your Semester
            Pool, but you <i>cannot</i> rearrange courses within the Course
            Pool. You may also remove courses from your Semester Pool by
            dragging them back into the Course Pool (the course will
            automatically go back to where you found it, no matter where you put
            it!)
            <br></br>
            <br></br>
            Be wary that some courses have prerequsities that must be met before
            adding them to your semester. For example, CISC 181 requires CISC
            108 to have already been taken. So, if you took CISC 108 in the
            Fall-2023, you can add <i>only</i> CISC 181 in Spring-2023 (the
            following semester) and later.
            <br></br>
            <br></br>
            <p>
                <strong>How are Courses in the Course Pool Chosen?</strong>
            </p>
            Degree requirements are split into two categories, represented by
            radio buttons:
            <ul>
                <li>
                    <i>General</i>
                    <ul>
                        <li>
                            Courses needed for all types of Computer Science BS
                            majors, including Universiy Requirements
                        </li>
                    </ul>
                </li>
                <li>
                    <i>Concentration</i>:
                    <ul>
                        <li>Courses needed for your selected concentration</li>
                    </ul>
                </li>
            </ul>
            Within each category, specific courses are further defined by what
            specific requirement they fulfill, and are selectable by a dropdown
            menu. For example, CISC 108 is required as a &quot;CISC Core&quot;
            course, and therefore shows up under the &quot;General&quot; radio
            button, and &quot;CISC Core&quot; dropdown.
            <br></br>
            <br></br>
            <p>
                <strong>Added Non-Required Courses</strong>
            </p>
            If you want to arbitrarily add other courses not required for your
            major, there is a searchable bar below the Course Pool for adding
            courses. For example, if you wanted to add MMSC200 (not required for
            any current CISC concentration), you can search for MMSC200 in the
            search bar, and it will add it to your current Course Pool category
            requirement. New courses not present in any of the General or
            Concentration categories will be automatically added to your
            &quot;Custom Category - User Selected Courses!&quot;
        </Modal.Body>
    );
}
