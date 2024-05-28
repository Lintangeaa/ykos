import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 20 MB in bytes

const FormMaterial = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
}) => {
    const [error, setError] = useState("");
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
                    <InputLabel htmlFor="file" value="File" />
                    <TextInput
                        id="file"
                        className="mt-1 block w-full"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            console.log(file.size);
                            if (file && file.size > MAX_FILE_SIZE) {
                                // Display error message
                                setError(
                                    "File size exceeds 20 MB. Please choose a smaller file."
                                );
                                return;
                            } else {
                                setError("");
                            }
                            setData("file", file);
                        }}
                        required={!isEdit}
                        type="file"
                        accept=".pdf,.doc,.docx"
                    />
                    <InputError className="mt-2" message={error} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing || error.length > 0}>
                    {isEdit ? "SAVE" : "CREATE"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormMaterial;
