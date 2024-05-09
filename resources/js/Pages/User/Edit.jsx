import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormCreateUser from "./Partials/Form";

const EditUserPage = ({ auth, user }) => {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
        });
    console.log(user);
    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Edit Users
                </h2>
            }
        >
            <Head title="Edit New User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormCreateUser
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

export default EditUserPage;
