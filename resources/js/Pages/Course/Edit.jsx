import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormCreateCourse from "./Partials/Form";

const EditCoursePage = ({ auth, course }) => {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: course.name,
        });
    console.log(course);
    const submit = (e) => {
        e.preventDefault();
        put(route("courses.update", course.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Courses
                </h2>
            }
        >
            <Head title="Edit New Course" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <FormCreateCourse
                            isEdit
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

export default EditCoursePage;
