import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FiSend } from "react-icons/fi";

const InputFeedback = ({ course_id, user_id }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            text: "",
            course_id,
            user_id,
            feedback_id: null,
        });

    const submit = (e) => {
        e.preventDefault();
        // console.log(course_id, user_id);
        setData({ text: "" });
        post(route("feedbacks.store", course_id));
    };
    return (
        <form
            onSubmit={submit}
            className="w-full gap-3 flex items-center justify-center"
        >
            <div className="w-full">
                <TextInput
                    id="text"
                    placeholder="Type feedback here.."
                    className="mt-1 block w-full"
                    value={data.text}
                    onChange={(e) => setData("text", e.target.value)}
                    required
                    isFocused
                    autoComplete="text"
                />

                <InputError className="mt-2" message={errors.text} />
            </div>
            <PrimaryButton type="submit">
                <FiSend size={20} />
            </PrimaryButton>
        </form>
    );
};
export default InputFeedback;
