import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import "./components.css";

function removePlanByName(
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan) => void,
    currentPlan: DegreePlan
): void {
    const removedPlans = plans.filter(
        (currPlan: DegreePlan): boolean => currPlan.id === currentPlan.id
    );

    setPlans(removedPlans);
}
