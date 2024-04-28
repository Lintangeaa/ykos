import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FiArrowDownCircle, FiDownloadCloud } from "react-icons/fi";

const FormAssignment = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
    assignment,
}) => {
    console.log(assignment);
    return (
        <form onSubmit={submit} className=" space-y-6 p-7">
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
                <div className="flex items-center justify-between">
                    <div>
                        <InputLabel htmlFor="file" value="File" />
                        <TextInput
                            id="file"
                            className="mt-1 block w-full"
                            onChange={(e) => setData("file", e.target.files[0])}
                            required={!isEdit}
                            type="file"
                            accept=".pdf,.doc,.docx"
                        />
                        <InputError className="mt-2" message={errors.file} />
                    </div>
                    {assignment?.path && (
                        <a
                            href={assignment.path}
                            download={true}
                            className="p-2 rounded-full bg-blue-500/10 text-blue-500"
                        >
                            <FiDownloadCloud size={20} />
                        </a>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
        </form>
    );
};

export default FormAssignment;
