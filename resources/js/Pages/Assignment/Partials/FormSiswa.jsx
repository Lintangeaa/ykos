import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FiArrowDownCircle, FiDownloadCloud } from "react-icons/fi";
import Title from "@/Components/Title";

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
    if (user.role != "siswa") return <></>;
    return (
        <form onSubmit={submit} className=" space-y-6 p-7">
            <Title>SUBMIT ASSIGNMENT</Title>
            <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                <div>
                    <InputLabel htmlFor="file" value="File" />

                    <div className="flex items-center justify-between">
                        <TextInput
                            id="file"
                            className={`mt-1 block w-full`}
                            onChange={(e) => setData("file", e.target.files[0])}
                            required={!isEdit}
                            type="file"
                            accept=".pdf,.doc,.docx"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.file} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>SUBMIT</PrimaryButton>
            </div>
        </form>
    );
};

export default FormAssignmentSiswa;
