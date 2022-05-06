import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import "../components.css";

function semesterSort(sem1: Semester, sem2: Semester): number {
    if (sem1.id > sem2.id) {
        return 1;
    } else if (sem1.id < sem2.id) {
        return -1;
    }
    return 0;
}

function makeNewSemester(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    currentPlan: DegreePlan,
    setCurrentPlan: (newPlan: DegreePlan) => void,
    season: string,
    year: number
): void {
    let id: number;
    switch (season) {
        case "Winter":
            id = year + 0.1;
            break;
        case "Spring":
            id = year + 0.2;
            break;
        case "Summer":
            id = year + 0.3;
            break;
        case "Fall":
            id = year + 0.4;
            break;
        default:
            id = NaN;
            break;
    }

    if (!isNaN(id) && season !== "") {
        const newSemester = {
            id: id,
            season: season,
            year: year,
            courses: []
        };

        const newPlan = {
            ...currentPlan,
            semesters: [...currentPlan.semesters, newSemester].sort(
                semesterSort
            )
        };

        const newPlans = plans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === currentPlan.id ? newPlan : plan
        );

        setCurrentPlan(newPlan);
        setPlans(newPlans);
    }
}

function ConfirmButton({
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    season,
    year,
    setShowAdd
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    season: string;
    year: number;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    const existingYears = currentPlan.semesters.filter(
        (semester: Semester): boolean =>
            semester.season === season && semester.year === year
    ).length;

    /** Allow button to be enabled when:
     * There are no semesters with that existing season-year combo
     * When the year is an actual number
     * When the 1900 < year < 2200 (allows for some hypothetical years or
     * displaying plans of older people)
     */
    return (
        <Button
            disabled={
                existingYears > 0 || isNaN(year) || year < 1900 || year > 2200
            }
            data-testid="semester-add-confirm-button"
            onClick={() => {
                makeNewSemester(
                    plans,
                    setPlans,
                    currentPlan,
                    setCurrentPlan,
                    season,
                    year
                );
                setShowAdd(false);
            }}
        >
            Confirm
        </Button>
    );
}

export function AddSemesterForm({
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setShowAdd
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setShowAdd: (value: boolean) => void;
}): JSX.Element {
    const [season, setSeason] = useState<string>("Fall");
    const [year, setYear] = useState<number>(NaN);

    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setSeason(event.target.value);
    }

    return (
        <div className="semester-add-form">
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Select
                            data-testid="semester-add-season"
                            value={season}
                            onChange={updateSeason}
                        >
                            <option
                                key="Fall"
                                value="Fall"
                                data-testid="semester-season-option-fall"
                            >
                                Fall
                            </option>
                            <option
                                key="Winter"
                                value="Winter"
                                data-testid="semester-season-option-winter"
                            >
                                Winter
                            </option>
                            <option
                                key="Spring"
                                value="Spring"
                                data-testid="semester-season-option-spring"
                            >
                                Spring
                            </option>
                            <option
                                key="Summer"
                                value="Summer"
                                data-testid="semester-season-option-summer"
                            >
                                Summer
                            </option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            data-testid="semester-add-year"
                            placeholder="Year"
                            value={year.toString()}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setYear(parseInt(event.target.value))}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <ConfirmButton
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                year={year}
                season={season}
                setShowAdd={setShowAdd}
            />
        </div>
    );
}
