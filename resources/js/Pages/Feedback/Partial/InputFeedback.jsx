import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
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
        console.log(user_id, data);
        e.preventDefault();
        setData({ text: "", course_id, user_id });
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
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg w-fit">
                    Sent.
                </div>
            </Transition>
            <Transition
                show={!recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <PrimaryButton type="submit">
                    <FiSend size={20} />
                </PrimaryButton>
            </Transition>
        </form>
    );
};
export default InputFeedback;
