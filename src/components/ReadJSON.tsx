import { Course } from "../interfaces/course";
import catalogData from "../exampleData/catalog.json";
import courseCategoriesData from "../exampleData/category_courses.json";

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

const courseCategories = courseCategoriesData as Record<string, string[]>;

const categories = Object.keys(courseCategories);

const courseArrList = categories.map((category: string): Course[] =>
    courseCategories[category].map(
        (code: string): Course => ({
            ...catalog[code.slice(0, 4)][code],
            degreeCategory: [category]
        })
    )
);

const unfilteredCourseList = courseArrList.reduce(
    (fullList: Course[], currentList: Course[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

const uniqueCourseCodes = Array.from(
    new Set(unfilteredCourseList.map((course: Course): string => course.code))
);

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
console.log(courseList);

export { courseList };
