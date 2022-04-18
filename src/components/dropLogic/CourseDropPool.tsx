import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { ListGroup, ListGroupItem } from "react-bootstrap";
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
        <div className="droppable-area">
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
                                            className="course-draggable"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps
                                                    .style,
                                                textAlign: "left"
                                            }}
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
