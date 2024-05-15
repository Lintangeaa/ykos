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
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Create Materials
                </h2>
            }
        >
            <Head title="Create New Material" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm bg-zinc-900 sm:rounded-lg">
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
