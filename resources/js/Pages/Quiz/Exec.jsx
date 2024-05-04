import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function QuizExec({
    auth,
    questions,
    currentNumber,
    totalQuestion,
    answerIndex,
    course_id,
    quiz_id,
    isSubmitted,
}) {
    console.log(isSubmitted);
    const [selectedAnswer, setSelectedAnswer] = useState(answerIndex);
    const handleSave = () => {
        if (currentNumber != totalQuestion - 1) {
            router.post(
                route("quizzes.temp", [
                    course_id,
                    quiz_id,
                    {
                        answer: selectedAnswer,
                        questionNum: currentNumber,
                    },
                ])
            );
        } else {
            router.post(
                route("quizzes.temp", [
                    course_id,
                    quiz_id,
                    {
                        answer: selectedAnswer,
                        questionNum: currentNumber,
                        isSubmit: true,
                    },
                ])
            );
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12 space-y-6 text-white">
                <BasicContainer>
                    <div className="p-7 space-y-6">
                        {isSubmitted ? (
                            <div className="flex gap-3 items-center justify-center">
                                <p>You've been submitted this quiz</p>
                                <FiCheckCircle
                                    size={20}
                                    className="text-green-500"
                                />
                            </div>
                        ) : (
                            <Questions
                                course_id={course_id}
                                quiz_id={quiz_id}
                                totalQuestion={totalQuestion}
                                currentNumber={currentNumber}
                                questions={questions}
                                handleSave={handleSave}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                            />
                        )}
                    </div>
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
}

const Questions = ({
    course_id,
    quiz_id,
    totalQuestion,
    currentNumber,
    questions,
    handleSave,
    setSelectedAnswer,
    selectedAnswer,
}) => {
    return (
        <>
            <Pagination
                course_id={course_id}
                quiz_id={quiz_id}
                totalQuestion={totalQuestion}
                currentNumber={currentNumber}
            />
            <div className="max-w-xl mx-auto">
                <div className="flex items-start justify-center w-full gap-3">
                    <p className="text-xl">{currentNumber + 1}.</p>
                    <div className="space-y-3">
                        {questions?.images.map((item, idx) => (
                            <a target="_blank" key={idx} href={item}>
                                <img src={item} className="rounded-md" />
                            </a>
                        ))}
                        <p className="text-lg">{questions.question}</p>
                        <div className="space-y-1">
                            {questions.options.map((option, optionIdx) => (
                                <div key={optionIdx}>
                                    <input
                                        type="radio"
                                        id={`option-${optionIdx}`}
                                        name="answer"
                                        value={option}
                                        checked={selectedAnswer == optionIdx}
                                        onChange={(e) =>
                                            setSelectedAnswer(optionIdx)
                                        }
                                    />
                                    <label
                                        className="ml-2"
                                        htmlFor={`option-${optionIdx}`}
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <PrimaryButton onClick={handleSave}>
                            {currentNumber == totalQuestion - 1
                                ? "SUBMIT"
                                : "SAVE"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};
const Pagination = ({ totalQuestion, currentNumber, course_id, quiz_id }) => {
    return (
        <div className="flex justify-center space-x-2">
            {Array.from({ length: totalQuestion }).map((_, index) => {
                return (
                    <Link
                        href={route("quizzes.exec", [
                            course_id,
                            quiz_id,
                            {
                                questionNum: index,
                            },
                        ])}
                        key={index}
                    >
                        {currentNumber === index ? (
                            <PrimaryButton>{index + 1}</PrimaryButton>
                        ) : (
                            <button className="px-4 py-2 text-xs rounded-md bg-zinc-800">
                                {index + 1}
                            </button>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};
