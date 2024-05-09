import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreateQuizzes from "./Partials/CreateQuizzes";
import ListQuiz from "./Partials/ListQuiz";

export default function Quiz({ quizzes, course_id, auth, alreadyAnswer }) {
    console.log(quizzes);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12 space-y-6 text-black">
                <BasicContainer>
                    {auth.user.role != "siswa" ? (
                        <CreateQuizzes
                            course_id={course_id}
                            initQuizzes={quizzes}
                        />
                    ) : (
                        <ListQuiz
                            quiz={quizzes}
                            course_id={course_id}
                            alreadyAnswer={alreadyAnswer}
                        />
                    )}
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
}
