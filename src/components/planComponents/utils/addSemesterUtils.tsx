import { Semester } from "../../../interfaces/semester";

function semesterSort(sem1: Semester, sem2: Semester): number {
    if (sem1.id > sem2.id) {
        return 1;
    } else if (sem1.id < sem2.id) {
        return -1;
    }
    return 0;
}

function getSemesterId(season: string, year: number) {
    switch (season) {
        case "Winter":
            return year + 0.1;
        case "Spring":
            return year + 0.2;
        case "Summer":
            return year + 0.3;
        case "Fall":
            return year + 0.4;
        default:
            return NaN;
    }
}

export { semesterSort, getSemesterId };
