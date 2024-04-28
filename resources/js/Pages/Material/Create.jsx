import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormMaterial from "./Partials/Form";

const CreateMaterialPage = ({ auth, course_id }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            file: null,
            course_id,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("materials.store", course_id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Create Materials
                </h2>
            }
        >
            <Head title="Create New Material" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <FormMaterial
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

export default CreateMaterialPage;
