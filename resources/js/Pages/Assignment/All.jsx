import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import FormAssignment from "./Partials/Form";
import { Transition } from "@headlessui/react";

export default function GetAllAssignments({ auth, assignment, course_id }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            file: null,
            name: assignment.data.name,
            course_id,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("assignments.store", course_id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Upload Assignments For This Course
                </h2>
            }
        >
            <Head title="Assignments" />

            <div className="py-12">
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
                        assignment={assignment.data}
                    />
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
}
