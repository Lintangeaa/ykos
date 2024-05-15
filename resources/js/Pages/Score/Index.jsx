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
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Nilai Siswa
                </h2>
            }
        >
            <Head title="Student Score" />

            <div className="py-12 mx-auto space-y-6 text-black max-w-7xl sm:px-6 lg:px-8">
                <TableAssignmentScores datas={assignmentScores} />
                <TableQuizScores datas={quizScores} />
            </div>
        </AuthenticatedLayout>
    );
};

export default ScoreUser;
