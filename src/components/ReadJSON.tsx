import { Course } from "../interfaces/course";
import catalogData from "../exampleData/catalog.json";
import courseCategoriesData from "../exampleData/category_courses.json";

// initial interface for the information in catalog.json
interface CatalogCourse {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReqDesc: string;
    preReqs: string[][];
    restrict: string;
    breadth: string;
    typ: string;
}

// read in catalog.json as a Record of Records to CatalogCourses
const catalog = catalogData as Record<string, Record<string, CatalogCourse>>;

// import a record of courseCategoriesData, containing a record where keys
// represent degreeRequirements whose values are a list of course code strings
// for that category + requirement pair
const CISCCourses = courseCategoriesData as Record<
    string,
    Record<string, string[]>
>;

// Get array of degree requirement categories
const categories = Object.keys(CISCCourses);

// Get all the courses specified by a category + requirement pair and convert them
// into arrays of Course objects instead of strings, giving you an array of
// arrays of Courses
const courseArrList = categories.map((category: string): Course[][] =>
    Object.keys(CISCCourses[category]).map((requirement: string): Course[] =>
        CISCCourses[category][requirement].map(
            (code: string): Course => ({
                ...catalog[code.slice(0, 4)][code],
                credits: catalog[code.slice(0, 4)][code].credits.trim(),
                degreeRequirements: [category + "-" + requirement]
            })
        )
    )
);

// Turn array of array of Courses into a single of array of Courses
const unfilteredCourseList = courseArrList.reduce(
    (fullList: Course[], currentLists: Course[][]) => [
        ...fullList,
        ...currentLists.reduce(
            (concList: Course[], reqList: Course[]) => [
                ...concList,
                ...reqList
            ],
            []
        )
    ],
    []
);

// unfilteredCourseList has duplicate course codes because a single course
// can be in multiple degreeRequirementss, so we first get all unique course codes
const uniqueCourseCodes = Array.from(
    new Set(unfilteredCourseList.map((course: Course): string => course.code))
);

// combine all duplicates into a single Course by merging all of the
// degreeCategories into a single list
const defaultCourseList = uniqueCourseCodes.map(
    (code: string): Course =>
        unfilteredCourseList
            .filter((course: Course): boolean => course.code === code)
            .reduce((mergedCourse: Course, currentCourse: Course) => ({
                ...currentCourse,
                degreeRequirements: [
                    ...mergedCourse.degreeRequirements,
                    ...currentCourse.degreeRequirements
                ]
            }))
);

// simple log to check work
// console.log(courseList);
export { defaultCourseList, categories, catalog };
export type { CatalogCourse };
