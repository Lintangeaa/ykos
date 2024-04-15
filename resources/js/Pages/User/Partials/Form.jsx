import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const FormCreateUser = ({ data, setData, submit, errors, processing }) => {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6 grid-cols-2 grid">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    className="mt-1 block w-full"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.password} />
            </div>

            <div>
                <InputLabel htmlFor="role" value="Role" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
        </form>
    );
};

export default FormCreateUser;
