import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head } from "@inertiajs/react";
import TableAssignmentScores from "./Partials/AssignmentTable";
import TableQuizScores from "./Partials/QuizTable";

const ScoreUser = ({ auth, quizScores, assignmentScores }) => {
    console.log(quizScores, assignmentScores);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Student Score
                </h2>
            }
        >
            <Head title="Student Score" />

            <div className="py-12 space-y-6 text-black max-w-7xl mx-auto sm:px-6 lg:px-8">
                <TableAssignmentScores datas={assignmentScores} />
                <TableQuizScores datas={quizScores} />
            </div>
        </AuthenticatedLayout>
    );
};

export default ScoreUser;
