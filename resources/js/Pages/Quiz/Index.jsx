import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreateQuizzes from "./Partials/CreateQuizzes";

export default function Quiz({ quizzes, course_id, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12 space-y-6 text-white">
                <BasicContainer>
                    <CreateQuizzes />
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
}
