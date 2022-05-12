import { DegreePlan } from "../../../interfaces/degreeplan";
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

function getMaxSemesterId(currentPlan: DegreePlan): number {
    return Math.max(
        ...currentPlan.semesters.map(
            (semester: Semester): number => semester.id
        )
    );
}

function getNextSeason(currentPlan: DegreePlan): string {
    if (currentPlan.semesters.length === 0) {
        return "Fall";
    }

    const maxId = getMaxSemesterId(currentPlan);
    const seasonId = Math.round((maxId % 1) * 10) / 10;
    if (seasonId === 0.4 || seasonId === 0.1) {
        // If Fall or Winter is the most recent semester, default to spring
        return "Spring";
    } else if (seasonId === 0.2 || seasonId === 0.3) {
        // If Spring or Summer is the most recent semester, default to fall
        return "Fall";
    }

    return ""; // invalid
}

function getNextYear(currentPlan: DegreePlan): number {
    if (currentPlan.semesters.length === 0) {
        return 2022;
    }

    const maxId = getMaxSemesterId(currentPlan);
    const seasonId = Math.round((maxId % 1) * 10) / 10;
    if (seasonId === 0.4) {
        // If Fall is the most recent semester, increment year
        return Math.floor(maxId) + 1;
    } else if (seasonId === 0.1 || seasonId === 0.2 || seasonId === 0.3) {
        // If Summer or Spring is the most recent semester, default to current year
        return Math.floor(maxId);
    }

    return NaN; // invalid
}

export { semesterSort, getSemesterId, getNextSeason, getNextYear };
