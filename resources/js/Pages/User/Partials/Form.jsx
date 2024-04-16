import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Dropdown from "@/Components/Dropdown";

const FormUser = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
}) => {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required={!isEdit}
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
                        required={!isEdit}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required={!isEdit}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="Role" />
                    <div className="w-fit">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-zinc-800 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {data.role}
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <ul>
                                    <li>
                                        <button
                                            onClick={() =>
                                                setData("role", "siswa")
                                            }
                                            type="button"
                                            className="w-full hover:bg-zinc-700 text-white"
                                        >
                                            Siswa
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                setData("role", "guru")
                                            }
                                            type="button"
                                            className="w-full hover:bg-zinc-700 text-white"
                                        >
                                            Guru
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                setData("role", "admin")
                                            }
                                            type="button"
                                            className="w-full hover:bg-zinc-700 text-white"
                                        >
                                            Admin
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown.Content>
                        </Dropdown>
                        <InputError className="mt-2" message={errors.role} />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {isEdit ? "SAVE" : "CREATE"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormUser;
