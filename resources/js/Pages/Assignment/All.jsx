import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import FormAssignment from "./Partials/Form";
import { Transition } from "@headlessui/react";
import FormAssignmentSiswa from "./Partials/FormSiswa";
import TableAssignmentAns from "./Partials/AnswerTable";

export default function GetAllAssignments({
    auth,
    assignment,
    assignments,
    course_id,
    siswa_submitted,
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            file: null,
            name: assignment?.data?.name,
            course_id,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("assignments.store", course_id));
    };
    const {
        data: dataS,
        setData: setDataS,
        post: Post,
        errors: errorsS,
        processing: processingS,
        recentlySuccessful: recentlySuccessfulS,
    } = useForm({
        file: null,
    });
    const submitS = (e) => {
        e.preventDefault();
        Post(route("assignmentsans.store", [course_id, assignment?.data?.id]));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    {auth.user.role != "siswa"
                        ? "Upload Assignments For This Course"
                        : "Assignment"}
                </h2>
            }
        >
            <Head title="Assignments" />

            <div className="py-12 space-y-6">
                <BasicContainer>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-r-lg w-fit">
                            Saved.
                        </div>
                    </Transition>
                    <FormAssignment
                        setData={setData}
                        data={data}
                        errors={errors}
                        processing={processing}
                        submit={submit}
                        assignment={assignment?.data}
                        user={auth.user}
                    />
                </BasicContainer>
                {assignment?.data && (
                    <BasicContainer>
                        <FormAssignmentSiswa
                            setData={setDataS}
                            data={dataS}
                            errors={errorsS}
                            processing={processingS}
                            submit={submitS}
                            assignment={assignment?.data}
                            user={auth.user}
                        />
                        <Transition
                            show={siswa_submitted ?? false}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg w-fit">
                                You have already submitted.
                            </div>
                        </Transition>
                    </BasicContainer>
                )}
                {auth.user.role != "siswa" && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                            <TableAssignmentAns
                                answers={assignments ?? []}
                                course_id={course_id}
                                assignment_id={assignment?.data?.id}
                            />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
