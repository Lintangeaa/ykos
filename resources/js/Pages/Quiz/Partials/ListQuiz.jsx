import PrimaryButton from "@/Components/PrimaryButton";
import Title from "@/Components/Title";
import { Link } from "@inertiajs/react";
import React from "react";

const ListQuiz = ({ alreadyAnswer, quiz, course_id }) => {
    if (!quiz)
        return (
            <div>
                <Title>Quiz</Title>
                <div className="p-7">
                    <p>Quiz not yet prepared</p>
                </div>
            </div>
        );
    const quiz_id = quiz.id;
    return (
        <div>
            <Title>Quiz</Title>
            <div className="p-7">
                {alreadyAnswer ? (
                    <div></div>
                ) : (
                    <div>
                        <p>Are you ready to work on this quiz?</p>
                        <Link
                            href={route("quizzes.exec", [course_id, quiz_id])}
                        >
                            <PrimaryButton className="mt-3">
                                START
                            </PrimaryButton>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListQuiz;
