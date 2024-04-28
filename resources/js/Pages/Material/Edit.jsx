import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormCreateMaterial from "./Partials/Form";

const EditMaterialPage = ({ auth, material, course_id }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: material.name,
            file: null,
            course_id,
        });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("materials.update", [course_id, material.id]));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Edit Materials
                </h2>
            }
        >
            <Head title="Edit Material" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <FormCreateMaterial
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

export default EditMaterialPage;
