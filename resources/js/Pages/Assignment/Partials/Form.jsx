import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FiArrowDownCircle, FiDownloadCloud } from "react-icons/fi";
import Title from "@/Components/Title";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes

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
    const [fileError, setFileError] = useState(""); // State for file validation error

    return (
        <form onSubmit={submit}>
            <Title>Assignment</Title>

            <div className="p-7 space-y-6">
                {user.role != "siswa" && (
                    <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required={!isEdit}
                                isFocused
                                readOnly={user.role == "siswa"}
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="file" value="File" />

                            <div className="flex items-center justify-between text-black">
                                <TextInput
                                    id="file"
                                    className={`mt-1 ${
                                        user.role != "siswa"
                                            ? "block"
                                            : "hidden"
                                    } w-full`}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && file.size > MAX_FILE_SIZE) {
                                            setFileError(
                                                "File size exceeds 20 MB. Please choose a smaller file."
                                            );
                                            return; // Prevent further processing if file is too large
                                        } else {
                                            setFileError(""); // Clear error if valid file is selected
                                        }
                                        setData("file", file);
                                    }}
                                    required={!isEdit}
                                    type={
                                        user.role != "siswa" ? "file" : "hidden"
                                    }
                                    accept=".pdf,.doc,.docx"
                                />
                                {assignment?.path ? (
                                    <a
                                        href={"/" + assignment.path}
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
                            <InputError
                                className="mt-2"
                                message={fileError || errors.file} // Display file-specific error or general error
                            />
                        </div>
                    </div>
                )}
                {user.role == "siswa" && assignment ? (
                    <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required={!isEdit}
                                isFocused
                                readOnly={user.role == "siswa"}
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="file" value="File" />

                            <div className="flex items-center justify-between text-black">
                                <TextInput
                                    id="file"
                                    className={`mt-1 ${
                                        user.role != "siswa"
                                            ? "block"
                                            : "hidden"
                                    } w-full`}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && file.size > MAX_FILE_SIZE) {
                                            setFileError(
                                                "File size exceeds 20 MB. Please choose a smaller file."
                                            );
                                            return; // Prevent further processing if file is too large
                                        }
                                        setData("file", file);
                                        setFileError(null); // Clear error if valid file is selected
                                    }}
                                    required={!isEdit}
                                    type={
                                        user.role != "siswa" ? "file" : "hidden"
                                    }
                                    accept=".pdf,.doc,.docx"
                                />
                                {assignment?.path ? (
                                    <a
                                        href={"/" + assignment.path}
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
                            <InputError
                                className="mt-2"
                                message={fileError || errors.file} // Display file-specific error or general error
                            />
                        </div>
                    </div>
                ) : user.role == "siswa" && !assignment ? (
                    <p>Not yet assignment in this course.</p>
                ) : null}

                {user.role != "siswa" && (
                    <div className="flex items-center gap-4">
                        <PrimaryButton
                            disabled={processing || fileError.length > 0}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </form>
    );
};

export default FormAssignment;
