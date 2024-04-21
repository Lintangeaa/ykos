import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormCourse from "./Partials/Form";

const CreateCoursePage = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("courses.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Create Courses
                </h2>
            }
        >
            <Head title="Create New Course" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <FormCourse
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateCoursePage;
