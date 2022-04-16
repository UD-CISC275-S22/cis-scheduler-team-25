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

// // Grab department keys
// const departments = Object.keys(catalog);

// // Map list of department keys to the corresponding hashmap for the department
// // Results in an array of array of courses
// const courseMaps = departments.map((dept: string): CatalogCourse[] =>
//     Object.values(catalog[dept])
// );

/* courseList[0] gives an array of courses
   courseList[0][0] // gives a course

   courseList is an array of array of courses, but we want just one single array
   of all the courses. To do this, we reduce over ALL of the course arrays by
   adding all elements of the currentList to an overarching fullList
*/
// const courseList = courseMaps.reduce(
//     (fullList: Course[], currentList: CatalogCourse[]) => [
//         ...fullList,
//         ...currentList.map(
//             (catalogCourse: CatalogCourse): Course => ({
//                 ...catalogCourse,
//                 degreeCategory: []
//             })
//         )
//     ],
//     []
// );

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

const courseList = courseArrList.reduce(
    (fullList: Course[], currentList: Course[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

// const singleInstanceCourses = courseList.;

// const multiInstanceCourses = courseList.filter(
//     (course: Course): boolean => course.degreeCategory.length !== 1
// );

// simple log to check work
console.log(courseList[0]);

export { courseList };
