import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../../interfaces/course";
import "../components.css";

type CourseDropPoolProps = {
    courses: Course[];
    droppableId: string;
};

export function CourseDropPool({
    courses,
    droppableId
}: CourseDropPoolProps): JSX.Element {
    return (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {courses.map((course: Course, index: number) => {
                        return (
                            <Draggable
                                key={course.code}
                                draggableId={course.code}
                                index={index}
                            >
                                {(provided) => (
                                    <li
                                        className="course-draggable"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <p>{course.code}</p>
                                    </li>
                                )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
