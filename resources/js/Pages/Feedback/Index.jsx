import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BasicContainer from "@/Components/BasicContainer";
import { Head, Link, useForm } from "@inertiajs/react";
import InputFeedback from "./Partial/InputFeedback";
import ListFeedback from "./Partial/ListFeedback";
const Feedbacks = ({ auth, quiz, feedbacks, course_id }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Feedbacks
                </h2>
            }
        >
            <Head title="Feedbacks" />

            <div className="py-12 space-y-6 text-white">
                <BasicContainer>
                    <div className="p-7 space-y-6">
                        <ListFeedback
                            feedbacks={feedbacks ?? []}
                            user={auth.user}
                        />
                        <InputFeedback
                            course_id={course_id}
                            user_id={auth.user.id}
                        />
                    </div>
                </BasicContainer>
            </div>
        </AuthenticatedLayout>
    );
};

export default Feedbacks;
