import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FiArrowDownCircle, FiDownloadCloud } from "react-icons/fi";
import Title from "@/Components/Title";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes

const FormAssignmentSiswa = ({
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

    if (user.role != "siswa") return <></>;

    return (
        <form onSubmit={submit}>
            <Title>SUBMIT ASSIGNMENT</Title>
            <div className=" space-y-6 p-7">
                <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                    <div>
                        <InputLabel htmlFor="file" value="File" />

                        <div className="flex items-center justify-between">
                            <TextInput
                                id="file"
                                className={`mt-1 block w-full`}
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
                                type="file"
                                accept=".pdf,.doc,.docx"
                            />
                        </div>
                        <InputError
                            className="mt-2"
                            message={fileError || errors.file} // Display file-specific error or general error
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing || fileError.length > 0}
                    >
                        SUBMIT
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
};

export default FormAssignmentSiswa;
