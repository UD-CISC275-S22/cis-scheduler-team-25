import { Course } from "../../../interfaces/course";

function saveChanges(
    name: string,
    descr: string,
    credits: string,
    preReqs: string,
    degreeRequirement: string[],
    currentCourse: Course,
    courseList: Course[],
    setCourseList: (newCourses: Course[]) => void
) {
    const editedPreReqs = preReqs
        .split("\n")
        .map((preReqGroup: string): string[] => preReqGroup.split(","));

    const editedCourse = {
        ...currentCourse,
        name: name,
        descr: descr,
        credits: credits,
        preReqs: editedPreReqs,
        degreeRequirement: degreeRequirement
    };

    const newCourseList = courseList.map(
        (course: Course): Course =>
            course.code === currentCourse.code ? editedCourse : course
    );
    setCourseList(newCourseList);
}

// name: string,
// descr: string,
// credits: string,
// preReqs: string,
// degreeRequirement: string
function checkValidFields(): boolean {
    return true;
}

export { saveChanges, checkValidFields };
