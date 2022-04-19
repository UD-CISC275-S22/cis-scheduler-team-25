import { Course } from "../interfaces/course";
import catalogData from "../exampleData/catalog.json";
import courseCategoriesData from "../exampleData/category_courses.json";

// initial interface for the information in catalog.json
export interface CatalogCourse {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReq: string;
    restrict: string;
    breadth: string;
    typ: string;
}

// read in catalog.json as a HashMap of Hashmaps to courses
const catalog = catalogData as Record<string, Record<string, CatalogCourse>>;

// import a record of courseCategoriesData, containing a record where keys
// represent degreeRequirements whose values are a list of course code strings
const courseCategories = courseCategoriesData as Record<string, string[]>;

// Get array of degree requirement categories
const categories = Object.keys(courseCategories);

// map each degree category to a list of Course objects based on the course codes.
// Course codes are used to obtain the Course objects in the catalog
const courseArrList = categories.map((category: string): Course[] =>
    courseCategories[category].map(
        (code: string): Course => ({
            ...catalog[code.slice(0, 4)][code],
            degreeCategory: [category]
        })
    )
);

// Turn array of array of Courses into a single of array of Courses
const unfilteredCourseList = courseArrList.reduce(
    (fullList: Course[], currentList: Course[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

// unfilteredCourseList has duplicate course codes because a single course
// can be in multiple degreeRequirements, so we first get all unique course codes
const uniqueCourseCodes = Array.from(
    new Set(unfilteredCourseList.map((course: Course): string => course.code))
);

// combine all duplicates into a single Course by merging all of the
// degreeCategories into a single list
const courseList = uniqueCourseCodes.map(
    (code: string): Course =>
        unfilteredCourseList
            .filter((course: Course): boolean => course.code === code)
            .reduce((mergedCourse: Course, currentCourse: Course) => ({
                ...currentCourse,
                degreeCategory: [
                    ...mergedCourse.degreeCategory,
                    ...currentCourse.degreeCategory
                ]
            }))
);

// simple log to check work
// console.log(courseList);

export { courseList };
