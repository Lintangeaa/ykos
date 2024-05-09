import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableTeachers from "./Partials/TableTeachers";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AssignTeacher({ auth, teachers, course_id }) {
    const [allTeacher, setAllTeacher] = useState([]);
    useEffect(() => {
        fetch(route("teachers"))
            .then((res) => res.json())
            .then((res) => {
                const existsIds = teachers.map((item) => item.user.id);
                const filtered = res.filter(
                    (item) => !existsIds.includes(item.id)
                );
                setAllTeacher(filtered);
            });
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Assign Teacher
                </h2>
            }
        >
            <Head title="Teacher" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <SearchData data={allTeacher} course_id={course_id} />
                    <TableTeachers course_id={course_id} teachers={teachers} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const SearchData = ({ data, course_id }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Fungsi untuk memfilter hasil pencarian berdasarkan kata kunci
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const results = data.filter((teacher) =>
            teacher.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
    };

    // Fungsi untuk memilih guru dari dropdown
    const selectTeacher = (teacher) => {
        setSearchResults([]);
        setSearchTerm(teacher.name);
        setSelected(teacher);
    };

    const handleSubmit = async () => {
        if (selected == null) return;
        try {
            const formData = new FormData();
            formData.append("id", selected.id);
            const response = await fetch(route("teachers.assign", course_id), {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex w-full gap-3 relative">
            <TextInput
                className="w-full"
                type="text"
                placeholder="Search teacher to assign..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <PrimaryButton onClick={() => handleSubmit()}>assign</PrimaryButton>
            {searchTerm && (
                <div className="absolute bg-zinc-700 rounded-md mt-1 w-fit top-full text-black">
                    {searchResults.length == 0 && !selected && (
                        <p className="px-4 py-2">Teacher Not Found</p>
                    )}
                    {searchResults.map((teacher) => (
                        <div
                            key={teacher.id}
                            onClick={() => selectTeacher(teacher)}
                            className="p-2 hover:bg-zinc-800 cursor-pointer"
                        >
                            {teacher.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
