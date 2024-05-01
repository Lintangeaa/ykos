import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function Quiz({ quizzes, course_id, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    {auth.user.role != "siswa"
                        ? "Upload Quizzes For This Course"
                        : "Assignment"}
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12 space-y-6">
                <BasicContainer>
                    <Transition
                        show={true}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-r-lg w-fit">
                            Saved.
                        </div>
                    </Transition>
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
}
