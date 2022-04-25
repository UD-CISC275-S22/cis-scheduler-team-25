import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import "../components.css";

type CourseDropPoolProps = {
    courses: Course[];
    droppableId: string;
    setShowCourseEditor: (newVal: boolean) => void;
    setCurrentCourse: (newCourse: Course) => void;
};

function displayEditorDoubleClick(
    e: React.MouseEvent<Element, MouseEvent>,
    setShowCourseEditor: (newVal: boolean) => void
): void {
    // double click, hence 2
    if (e.detail == 2) {
        setShowCourseEditor(true);
    }
}

/*
Component for creating a droppable area for Courses using react-beautiful-dnd.
Takes in a list of courses and generates Draggable components based on Course
information.

Draggable components are ListGroupItems of a ListGroup to allow for clicking
of the Draggable courses
*/
export function CourseDropPool({
    courses,
    droppableId,
    setShowCourseEditor,
    setCurrentCourse
}: CourseDropPoolProps): JSX.Element {
    return (
        <div
            className="droppable-area"
            data-testid={"droppable-" + droppableId}
        >
            <Droppable droppableId={droppableId}>
                {(provided: DroppableProvided, snapshot) => (
                    <ListGroup
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            minHeight: "calc(210px + 20vmin)",
                            backgroundColor: snapshot.isDraggingOver
                                ? "rgb(127, 255, 163)"
                                : "rgb(224, 234, 253)"
                        }}
                    >
                        {courses.map((course: Course, index: number) => {
                            return (
                                <Draggable
                                    key={course.code}
                                    draggableId={course.code}
                                    index={index}
                                >
                                    {(provided) => (
                                        <ListGroupItem
                                            data-testid={
                                                "draggable-" + course.code
                                            }
                                            className="course-draggable"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps
                                                    .style,
                                                textAlign: "left"
                                            }}
                                            action={true}
                                            onClick={(e) => {
                                                displayEditorDoubleClick(
                                                    e,
                                                    setShowCourseEditor
                                                );
                                                setCurrentCourse(course);
                                            }}
                                            as="a"
                                        >
                                            {course.code} <br></br>
                                            {course.name}
                                        </ListGroupItem>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ListGroup>
                )}
            </Droppable>
        </div>
    );
}
