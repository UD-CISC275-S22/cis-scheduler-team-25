import { Course } from "../interfaces/course";
import catalogData from "../exampleData/catalog.json";

// read in catalog.json as a HashMap of Hashmaps to courses
const catalog = catalogData as Record<string, Record<string, Course>>;

// Grab department keys
const departments = Object.keys(catalog);

// Map list of department keys to the corresponding hashmap for the department
// Results in an array of array of courses
const courseMaps = departments.map((dept: string): Course[] =>
    Object.values(catalog[dept])
);

/* courseList[0] gives an array of courses
   courseList[0][0] // gives a course

   courseList is an array of array of courses, but we want just one single array
   of all the courses. To do this, we reduce over ALL of the course arrays by
   adding all elements of the currentList to an overarching fullList
*/
const courseList = courseMaps.reduce(
    (fullList: Course[], currentList: Course[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

// simple log to check work
console.log(courseList[0]);

export { courseList };
