import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

const CreateQuizzes = ({ course_id, initQuizzes }) => {
    const [quizzes, setQuizzes] = useState(
        initQuizzes ?? [
            {
                number: 1, // Properti untuk urutan soal
                question: "",
                options: [""],
                answer: 0,
                images: [],
            },
        ]
    );
    const [isSaved, setIsSaved] = useState(false);

    const updateQuestionNumbers = () => {
        setQuizzes((prevQuizzes) =>
            prevQuizzes.map((quiz, index) => ({ ...quiz, number: index + 1 }))
        );
    };

    const addQuestion = () => {
        const newQuestionNumber = quizzes.length + 1;
        setQuizzes([
            ...quizzes,
            {
                number: newQuestionNumber,
                question: "",
                options: [""],
                answer: 0,
                images: [],
            },
        ]);
    };

    const deleteQuestion = (index) => {
        const updatedQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(updatedQuizzes);
        updateQuestionNumbers();
    };

    const addOption = (index) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].options.push("");
        setQuizzes(updatedQuizzes);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[questionIndex].options.splice(optionIndex, 1);
        setQuizzes(updatedQuizzes);
    };

    const handleQuestionChange = (index, e) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].question = e.target.value;
        setQuizzes(updatedQuizzes);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[questionIndex].options[optionIndex] = e.target.value;
        setQuizzes(updatedQuizzes);
    };

    const handleAnswerChange = (index, e) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].answer = parseInt(e.target.value);
        setQuizzes(updatedQuizzes);
    };

    useEffect(() => {
        console.log(quizzes);
    }, [quizzes]);

    const handleImageUpload = async (questionIndex, e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(route("upload.file"), {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                const data = await response.json();
                console.log(data);

                // Update quizzes state with the new image path
                const updatedQuizzes = [...quizzes];
                updatedQuizzes[questionIndex].images.push(data.path);
                setQuizzes(updatedQuizzes);

                // Update question numbers
                updateQuestionNumbers();
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = async (questionIndex, imageIndex, path) => {
        try {
            const response = await fetch(route("delete.file"), {
                method: "POST",
                body: JSON.stringify({
                    path,
                }),
                headers: {
                    "Content-Type": "application/json", // Perbaiki tipe konten di sini
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete file");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[questionIndex].images.splice(imageIndex, 1);
        setQuizzes(updatedQuizzes);
    };

    const saveQuizzes = async () => {
        const questionWithoutAnswer = quizzes.map(
            ({ answer, ...rest }) => rest
        );
        const answers = quizzes.map(({ answer }) => answer);
        try {
            const response = await fetch(route("quiz.store", course_id), {
                method: "POST",
                body: JSON.stringify({
                    answers,
                    questions: questionWithoutAnswer,
                }),
                headers: {
                    "Content-Type": "application/json", // Perbaiki tipe konten di sini
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete file");
            }

            const data = await response.json();
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <div className="p-7">
            <div className="grid grid-cols-2 gap-3">
                {quizzes.map((quiz, index) => (
                    <div key={index} className="mb-4 bg-zinc-900">
                        <div className="flex gap-2 mb-2">
                            <span>Question {quiz.number}:</span>

                            <button
                                onClick={() => deleteQuestion(index)}
                                className="bg-red-500/10 text-red-500 p-2 rounded-md"
                            >
                                <FiTrash size={15} />
                            </button>
                        </div>
                        <div className="flex gap-2 items-start justify-center">
                            <div>
                                <textarea
                                    type="text"
                                    placeholder="Question"
                                    value={quiz.question}
                                    className="w-full px-4 py-2 bg-zinc-800 border-none outline-none rounded-md focus:ring-white"
                                    onChange={(e) =>
                                        handleQuestionChange(index, e)
                                    }
                                />
                                <div className="flex gap-2 mt-2 overflow-x-auto">
                                    {quiz.images.map((image, imageIndex) => (
                                        <>
                                            <img
                                                key={imageIndex}
                                                src={image}
                                                alt={`Question ${
                                                    quiz.number
                                                } image ${imageIndex + 1}`}
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                            <button
                                                key={imageIndex}
                                                onClick={() =>
                                                    handleRemoveImage(
                                                        index,
                                                        imageIndex,
                                                        image
                                                    )
                                                }
                                                className="w-fit h-fit bg-red-500/10 text-red-500 p-1 rounded-md"
                                            >
                                                <FiTrash size={15} />
                                            </button>
                                        </>
                                    ))}
                                    <label className="p-2 bg-blue-500/10 text-blue-500 rounded-md cursor-pointer w-fit h-fit">
                                        <FiPlus size={15} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                handleImageUpload(index, e)
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative inline-block">
                                    <select
                                        value={quiz.answer}
                                        onChange={(e) =>
                                            handleAnswerChange(index, e)
                                        }
                                        className="w-28 px-4 py-2 bg-zinc-800 border-none outline-none rounded-md focus:ring-white"
                                    >
                                        {quiz.options.map(
                                            (option, optionIndex) => (
                                                <option
                                                    key={optionIndex}
                                                    value={optionIndex}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                {quiz.options.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className="flex gap-1"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Option"
                                            value={option}
                                            className="w-full px-4 py-2 bg-zinc-800 border-none outline-none rounded-md focus:ring-white"
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    optionIndex,
                                                    e
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                deleteOption(index, optionIndex)
                                            }
                                            className="bg-red-500/10 text-red-500 p-1 rounded-md"
                                        >
                                            <FiTrash size={15} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addOption(index)}
                                    className="p-2 bg-green-500/10 text-green-500 rounded-full"
                                >
                                    <FiPlus size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {quizzes.length < 10 && (
                    <button
                        onClick={addQuestion}
                        className="p-2 bg-green-500/10 text-green-500 rounded-full w-fit h-fit"
                    >
                        <FiPlus size={20} />
                    </button>
                )}
            </div>
            <div className="flex gap-3">
                <PrimaryButton className="mt-3" onClick={() => saveQuizzes()}>
                    Save
                </PrimaryButton>
                <Transition
                    show={isSaved}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="fixed bottom-6 right-6 px-4 py-2 z-50 bg-green-500/20 text-green-500 rounded-lg w-fit">
                        Saved.
                    </div>
                </Transition>
            </div>
        </div>
    );
};

export default CreateQuizzes;
