import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FiArrowDownCircle, FiDownloadCloud } from "react-icons/fi";
import Title from "@/Components/Title";

const FormAssignment = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
    assignment,
    user,
}) => {
    return (
        <form onSubmit={submit}>
            <Title>Assignment</Title>
            <div className="p-7 space-y-6">
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
                            readOnly={user.role == "siswa"}
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <InputLabel htmlFor="file" value="File" />

                        <div className="flex items-center justify-between text-black">
                            <TextInput
                                id="file"
                                className={`mt-1 ${
                                    user.role != "siswa" ? "block" : "hidden"
                                } w-full`}
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                required={!isEdit}
                                type={user.role != "siswa" ? "file" : "hidden"}
                                accept=".pdf,.doc,.docx"
                            />
                            {assignment?.path ? (
                                <a
                                    href={assignment.path}
                                    download={true}
                                    className="p-2 mt-1 rounded-full bg-blue-500/10 text-blue-500"
                                >
                                    <FiDownloadCloud
                                        title="Download File"
                                        size={15}
                                    />
                                </a>
                            ) : (
                                <p>File not yet uploaded</p>
                            )}
                        </div>
                        <InputError className="mt-2" message={errors.file} />
                    </div>
                </div>

                {user.role != "siswa" && (
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </form>
    );
};

export default FormAssignment;
