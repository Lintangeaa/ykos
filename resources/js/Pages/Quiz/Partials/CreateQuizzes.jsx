import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

const CreateQuizzes = () => {
    const [quizzes, setQuizzes] = useState([
        {
            number: 1, // Properti untuk urutan soal
            question: "",
            options: [""],
            answer: 0,
        },
    ]);

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

    return (
        <div className="p-7 ">
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
                            <textarea
                                type="text"
                                placeholder="Question"
                                value={quiz.question}
                                className="w-full px-4 py-2 bg-zinc-800 border-none outline-none rounded-md focus:ring-white"
                                onChange={(e) => handleQuestionChange(index, e)}
                            />

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
        </div>
    );
};

export default CreateQuizzes;
