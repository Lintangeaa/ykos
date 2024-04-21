import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Dropdown from "@/Components/Dropdown";

const FormCourse = ({
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
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {isEdit ? "SAVE" : "CREATE"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormCourse;
