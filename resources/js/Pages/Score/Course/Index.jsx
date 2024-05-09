import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableQuizScores from "../Partials/Course/QuizTable";
import TableAssignmentScores from "../Partials/Course/AssignmentTable";

const ScoreByCourseId = ({
    auth,
    courseName,
    quizScores,
    assignmentScores,
}) => {
    console.log("Course", courseName);
    console.log("quizScores", quizScores);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Score for {courseName}
                </h2>
            }
        >
            <Head title="Student Score" />
            <TableAssignmentScores datas={assignmentScores} />
            <TableQuizScores datas={quizScores} />
            <div className="py-12 mx-auto space-y-6 text-white max-w-7xl sm:px-6 lg:px-8"></div>
        </AuthenticatedLayout>
    );
};

export default ScoreByCourseId;
